from flask import Blueprint, request, jsonify, g
from extensions import db
from models.livestock import Livestock
from models.amu import AntimicrobialRecord, Prescription, WithdrawalPeriod
from models.requests import Alert, TraceabilityLog
from models.user import Farmer
from middlewares.auth import verify_firebase_token, require_role, require_profile_complete
from datetime import datetime, timedelta, timezone
from sqlalchemy import func, and_
import hashlib, json

amu_bp = Blueprint('amu', __name__, url_prefix='/api/amu')

def calculate_withdrawal_end_date(drug_name, species, start_date, duration_days):
  withdrawal_period = WithdrawalPeriod.query.filter_by(drug_name=drug_name, species=species).first()
  if withdrawal_period:
    end_date = start_date + timedelta(days=duration_days)
    withdrawal_end = end_date + timedelta(days=withdrawal_period.withdrawal_period_days)
    return withdrawal_end, withdrawal_period.withdrawal_period_days
  return None, None

def check_excessive_usage(livestock_id, drug_name):
  thirty_days_ago = datetime.now(timezone.utc) - timedelta(days=30)
  usage_count = AntimicrobialRecord.query.filter(
    AntimicrobialRecord.livestock_id == livestock_id,
    AntimicrobialRecord.drug_name == drug_name,
    AntimicrobialRecord.created_at >= thirty_days_ago
  ).count()
  return usage_count >= 3

def create_traceability_log(livestock_id, event_type, event_data):
  last_log = TraceabilityLog.query.filter_by(livestock_id=livestock_id).order_by(TraceabilityLog.timestamp.desc()).first()
  previous_hash = last_log.hash_value if last_log else "0"
  hash_data = {'livestock_id': livestock_id, 'event_type': event_type, 'event_data': event_data, 'timestamp': datetime.now(timezone.utc).isoformat(), 'previous_hash': previous_hash}
  current_hash = hashlib.sha256(json.dumps(hash_data, sort_keys=True).encode()).hexdigest()
  log = TraceabilityLog(livestock_id=livestock_id, event_type=event_type, event_data=event_data, performed_by=g.current_user.id, hash_value=current_hash, previous_hash=previous_hash, ip_address=request.remote_addr)
  db.session.add(log)

@amu_bp.route('/record', methods=['POST'])
@verify_firebase_token
@require_role('farmer', 'veterinary')
@require_profile_complete
def record_amu():
  data = request.get_json()
  livestock_id = data.get('livestock_id')
  livestock = Livestock.query.get_or_404(livestock_id)
  if g.current_user.role == 'farmer':
    if not g.current_user.farmer or livestock.farmer_id != g.current_user.farmer.id: return jsonify({'error': 'Unauthorized access'}), 403

  if not data.get('drug_name') or not data.get('dosage') or not data.get('unit'): return jsonify({'error': 'Drug name, dosage, and unit are required'}), 400
  start_date = datetime.strptime(data.get('start_date'), '%Y-%m-%d').date() if data.get('start_date') else datetime.now(timezone.utc).date()
  duration_days = data.get('duration_days', 1)
  withdrawal_end, withdrawal_days = calculate_withdrawal_end_date(data.get('drug_name'), livestock.species, start_date, duration_days)
  amu_record = AntimicrobialRecord(
    livestock_id=livestock_id,
    prescription_id=data.get('prescription_id'),
    drug_name=data.get('drug_name'),
    drug_category=data.get('drug_category'),
    active_ingredient=data.get('active_ingredient'),
    dosage=data.get('dosage'),
    unit=data.get('unit'),
    administration_route=data.get('administration_route'),
    start_date=start_date,
    end_date=datetime.strptime(data.get('end_date'), '%Y-%m-%d').date() if data.get('end_date') else None,
    frequency=data.get('frequency'),
    duration_days=duration_days,
    reason=data.get('reason'),
    prescribed_by=data.get('prescribed_by'),
    recorded_by=g.current_user.id,
    withdrawal_end_date=withdrawal_end
  )
  db.session.add(amu_record)
  db.session.flush()
  if check_excessive_usage(livestock_id, data.get('drug_name')):
    alert = Alert(livestock_id=livestock_id, farmer_id=livestock.farmer_id, alert_type='excessive_use', severity='high', title=f'Excessive use of {data.get("drug_name")}', message=f'The drug {data.get("drug_name")} has been used 3 or more times in the last 30 days for livestock {livestock.rfid_tag}')
    db.session.add(alert)
  if withdrawal_end:
    alert = Alert(livestock_id=livestock_id, farmer_id=livestock.farmer_id, alert_type='withdrawal_period', severity='medium', title=f'Withdrawal period for {data.get("drug_name")}', message=f'Withdrawal period ends on {withdrawal_end.strftime("%Y-%m-%d")}. Do not sell products until then.', metadata={'withdrawal_end_date': withdrawal_end.isoformat(), 'withdrawal_days': withdrawal_days})
    db.session.add(alert)
  create_traceability_log(livestock_id, 'amu_recorded', {'drug_name': data.get('drug_name'), 'dosage': data.get('dosage'), 'unit': data.get('unit'), 'start_date': start_date.isoformat()})
  db.session.commit()  
  return jsonify({'message': 'AMU record created successfully', 'record_id': amu_record.id, 'withdrawal_end_date': withdrawal_end.isoformat() if withdrawal_end else None}), 201

@amu_bp.route('/livestock/<int:livestock_id>', methods=['GET'])
@verify_firebase_token
@require_profile_complete
def get_livestock_amu_history(livestock_id):
  livestock = Livestock.query.get_or_404(livestock_id)

  if g.current_user.role == 'farmer':
    if not g.current_user.farmer or livestock.farmer_id != g.current_user.farmer.id: return jsonify({'error': 'Unauthorized access'}), 403
  page = request.args.get('page', 1, type=int)
  per_page = request.args.get('per_page', 20, type=int)  
  amu_query = AntimicrobialRecord.query.filter_by(livestock_id=livestock_id).order_by(AntimicrobialRecord.start_date.desc())
  pagination = amu_query.paginate(page=page, per_page=per_page, error_out=False)

  records = [{
    'id': r.id,
    'drug_name': r.drug_name,
    'drug_category': r.drug_category,
    'dosage': r.dosage,
    'unit': r.unit,
    'administration_route': r.administration_route,
    'start_date': r.start_date.isoformat(),
    'end_date': r.end_date.isoformat() if r.end_date else None,
    'frequency': r.frequency,
    'duration_days': r.duration_days,
    'reason': r.reason,
    'is_verified': r.is_verified,
    'withdrawal_end_date': r.withdrawal_end_date.isoformat() if r.withdrawal_end_date else None,
    'created_at': r.created_at.isoformat()
  } for r in pagination.items]  
  return jsonify({'livestock_id': livestock_id, 'rfid_tag': livestock.rfid_tag, 'amu_records': records, 'total': pagination.total, 'page': pagination.page, 'pages': pagination.pages}), 200

@amu_bp.route('/verify/<int:record_id>', methods=['PUT'])
@verify_firebase_token
@require_role('veterinary')
@require_profile_complete
def verify_amu_record(record_id):
  amu_record = AntimicrobialRecord.query.get_or_404(record_id)

  if amu_record.prescribed_by != g.current_user.veterinarian.id: return jsonify({'error': 'Only the prescribing veterinarian can verify this record'}), 403
  amu_record.is_verified = True
  amu_record.verified_at = datetime.now(timezone.utc)
  db.session.commit()

  return jsonify({'message': 'AMU record verified successfully', 'verified_at': amu_record.verified_at.isoformat()}), 200

@amu_bp.route('/analytics/farmer', methods=['GET'])
@verify_firebase_token
@require_role('farmer')
@require_profile_complete
def farmer_amu_analytics():
  farmer = g.current_user.farmer
  if not farmer: return jsonify({'error': 'Farmer profile not found'}), 400
  thirty_days_ago = datetime.now(timezone.utc) - timedelta(days=30)
  ninety_days_ago = datetime.now(timezone.utc) - timedelta(days=90)
  total_amu_records = db.session.query(func.count(AntimicrobialRecord.id)).join(Livestock).filter(Livestock.farmer_id == farmer.id).scalar()
  recent_amu = db.session.query(func.count(AntimicrobialRecord.id)).join(Livestock).filter(Livestock.farmer_id == farmer.id, AntimicrobialRecord.created_at >= thirty_days_ago).scalar()  
  drug_usage = db.session.query(AntimicrobialRecord.drug_name, func.count(AntimicrobialRecord.id)).join(Livestock).filter(Livestock.farmer_id == farmer.id, AntimicrobialRecord.created_at >= ninety_days_ago).group_by(AntimicrobialRecord.drug_name).order_by(func.count(AntimicrobialRecord.id).desc()).limit(10).all()
  active_withdrawal_periods = db.session.query(func.count(AntimicrobialRecord.id)).join(Livestock).filter(Livestock.farmer_id == farmer.id, AntimicrobialRecord.withdrawal_end_date >= datetime.now(timezone.utc).date()).scalar()

  return jsonify({
    'total_amu_records': total_amu_records,
    'recent_amu_30_days': recent_amu,
    'active_withdrawal_periods': active_withdrawal_periods,
    'top_drugs_used': [{'drug_name': drug, 'count': count} for drug, count in drug_usage]
  }), 200

@amu_bp.route('/analytics/regional', methods=['GET'])
@verify_firebase_token
@require_role('government')
@require_profile_complete
def regional_amu_analytics():
  gov_official = g.current_user.government_official
  if not gov_official: return jsonify({'error': 'Government official profile not found'}), 400
  
  district = request.args.get('district', gov_official.jurisdiction_district)
  state = request.args.get('state', gov_official.jurisdiction_state)
  days = request.args.get('days', 90, type=int)
  date_threshold = datetime.now(timezone.utc) - timedelta(days=days)  
  query = db.session.query(func.count(AntimicrobialRecord.id)).join(Livestock).join(Farmer)

  if district: query = query.filter(Farmer.district == district)
  elif state: query = query.filter(Farmer.state == state)
  total_amu = query.filter(AntimicrobialRecord.created_at >= date_threshold).scalar()  
  drug_distribution = db.session.query(AntimicrobialRecord.drug_category, func.count(AntimicrobialRecord.id)).join(Livestock).join(Farmer)

  if district: drug_distribution = drug_distribution.filter(Farmer.district == district)
  elif state: drug_distribution = drug_distribution.filter(Farmer.state == state)

  drug_distribution = drug_distribution.filter(AntimicrobialRecord.created_at >= date_threshold).group_by(AntimicrobialRecord.drug_category).all()
  species_amu = db.session.query(Livestock.species, func.count(AntimicrobialRecord.id)).join(AntimicrobialRecord).join(Farmer)
  if district: species_amu = species_amu.filter(Farmer.district == district)
  elif state: species_amu = species_amu.filter(Farmer.state == state)

  species_amu = species_amu.filter(AntimicrobialRecord.created_at >= date_threshold).group_by(Livestock.species).all()
  return jsonify({
    'region': district or state or 'All',
    'period_days': days,
    'total_amu_records': total_amu,
    'drug_category_distribution': [{'category': cat or 'uncategorized', 'count': count} for cat, count in drug_distribution],
    'species_distribution': [{'species': sp, 'count': count} for sp, count in species_amu]
  }), 200

@amu_bp.route('/withdrawal/active', methods=['GET'])
@verify_firebase_token
@require_role('farmer')
@require_profile_complete
def active_withdrawal_periods():
  farmer = g.current_user.farmer
  if not farmer: return jsonify({'error': 'Farmer profile not found'}), 400  
  active_withdrawals = db.session.query(AntimicrobialRecord, Livestock).join(Livestock).filter(
    Livestock.farmer_id == farmer.id,
    AntimicrobialRecord.withdrawal_end_date >= datetime.now(timezone.utc).date()
  ).order_by(AntimicrobialRecord.withdrawal_end_date.asc()).all()

  withdrawals_list = [{
    'livestock_id': livestock.id,
    'rfid_tag': livestock.rfid_tag,
    'species': livestock.species,
    'drug_name': record.drug_name,
    'start_date': record.start_date.isoformat(),
    'withdrawal_end_date': record.withdrawal_end_date.isoformat(),
    'days_remaining': (record.withdrawal_end_date - datetime.now(timezone.utc).date()).days
  } for record, livestock in active_withdrawals]
  return jsonify({'active_withdrawal_periods': withdrawals_list, 'total': len(withdrawals_list)}), 200