from flask import Blueprint, request, jsonify, g
from extensions import db
from models.livestock import Livestock
from models.amu import AntimicrobialRecord, Prescription
from models.requests import Alert, TraceabilityLog
from models.user import Farmer
from middlewares.auth import verify_firebase_token, require_role, require_profile_complete
from datetime import datetime, timezone
import random, string, hashlib, json

prescription_bp = Blueprint('prescription', __name__, url_prefix='/api/prescription')

def generate_prescription_number():
  prefix = 'RX'
  timestamp = datetime.now(timezone.utc).strftime('%Y%m%d')
  random_suffix = ''.join(random.choices(string.digits, k=6))
  return f"{prefix}{timestamp}{random_suffix}"

def create_traceability_log(livestock_id, event_type, event_data):
  last_log = TraceabilityLog.query.filter_by(livestock_id=livestock_id).order_by(TraceabilityLog.timestamp.desc()).first()
  previous_hash = last_log.hash_value if last_log else "0"
  hash_data = {'livestock_id': livestock_id, 'event_type': event_type, 'event_data': event_data, 'timestamp': datetime.now(timezone.utc).isoformat(), 'previous_hash': previous_hash}
  current_hash = hashlib.sha256(json.dumps(hash_data, sort_keys=True).encode()).hexdigest()
  log = TraceabilityLog(livestock_id=livestock_id, event_type=event_type, event_data=event_data, performed_by=g.current_user.id, hash_value=current_hash, previous_hash=previous_hash, ip_address=request.remote_addr)
  db.session.add(log)

@prescription_bp.route('/create', methods=['POST'])
@verify_firebase_token
@require_role('veterinary')
@require_profile_complete
def create_prescription():
  vet = g.current_user.veterinarian
  if not vet: return jsonify({'error': 'Veterinary profile not found'}), 400

  data = request.get_json()
  livestock_id = data.get('livestock_id')  
  livestock = Livestock.query.get_or_404(livestock_id)
  farmer = Farmer.query.get(livestock.farmer_id)

  if not data.get('diagnosis') or not data.get('drugs_prescribed'): return jsonify({'error': 'Diagnosis and drugs are required'}), 400
  prescription_number = generate_prescription_number()

  prescription = Prescription(
    veterinarian_id=vet.id,
    farmer_id=farmer.id,
    livestock_id=livestock_id,
    prescription_number=prescription_number,
    prescription_date=datetime.strptime(data.get('prescription_date'), '%Y-%m-%d').date() if data.get('prescription_date') else datetime.now(timezone.utc).date(),
    diagnosis=data.get('diagnosis'),
    drugs_prescribed=data.get('drugs_prescribed'),
    notes=data.get('notes'),
    follow_up_date=datetime.strptime(data.get('follow_up_date'), '%Y-%m-%d').date() if data.get('follow_up_date') else None,
    verified_at=datetime.now(timezone.utc)
  )

  db.session.add(prescription)
  db.session.flush()  
  create_traceability_log(livestock_id, 'prescription_created', {'prescription_number': prescription_number, 'diagnosis': data.get('diagnosis'), 'veterinarian_id': vet.id})  
  alert = Alert(livestock_id=livestock_id, farmer_id=farmer.id, veterinarian_id=vet.id, alert_type='prescription_expired', severity='low', title='New Prescription Created', message=f'Prescription {prescription_number} created by Dr. {g.current_user.name}', metadata={'prescription_id': prescription.id})
  db.session.add(alert)
  db.session.commit()

  return jsonify({'message': 'Prescription created successfully', 'prescription_id': prescription.id, 'prescription_number': prescription_number}), 201

@prescription_bp.route('/<int:prescription_id>', methods=['GET'])
@verify_firebase_token
@require_profile_complete
def get_prescription(prescription_id):
  prescription = Prescription.query.get_or_404(prescription_id)

  if g.current_user.role == 'farmer':
    if not g.current_user.farmer or prescription.farmer_id != g.current_user.farmer.id: return jsonify({'error': 'Unauthorized access'}), 403
  elif g.current_user.role == 'veterinary':
    if not g.current_user.veterinarian or prescription.veterinarian_id != g.current_user.veterinarian.id: return jsonify({'error': 'Unauthorized access'}), 403
  livestock = Livestock.query.get(prescription.livestock_id)
  
  return jsonify({
    'id': prescription.id,
    'prescription_number': prescription.prescription_number,
    'prescription_date': prescription.prescription_date.isoformat(),
    'livestock': {'id': livestock.id, 'rfid_tag': livestock.rfid_tag, 'species': livestock.species, 'name': livestock.name},
    'diagnosis': prescription.diagnosis,
    'drugs_prescribed': prescription.drugs_prescribed,
    'notes': prescription.notes,
    'follow_up_date': prescription.follow_up_date.isoformat() if prescription.follow_up_date else None,
    'status': prescription.status,
    'created_at': prescription.created_at.isoformat()
  }), 200

@prescription_bp.route('/list', methods=['GET'])
@verify_firebase_token
@require_profile_complete
def list_prescriptions():
  page = request.args.get('page', 1, type=int)
  per_page = request.args.get('per_page', 20, type=int)
  status = request.args.get('status')

  if g.current_user.role == 'farmer':
    if not g.current_user.farmer: return jsonify({'error': 'Farmer profile not found'}), 400
    query = Prescription.query.filter_by(farmer_id=g.current_user.farmer.id)
  elif g.current_user.role == 'veterinary':
    if not g.current_user.veterinarian: return jsonify({'error': 'Veterinary profile not found'}), 400
    query = Prescription.query.filter_by(veterinarian_id=g.current_user.veterinarian.id)
  else: return jsonify({'error': 'Unauthorized access'}), 403
  if status: query = query.filter_by(status=status)
  query = query.order_by(Prescription.prescription_date.desc())
  pagination = query.paginate(page=page, per_page=per_page, error_out=False)

  prescriptions = [{
    'id': p.id,
    'prescription_number': p.prescription_number,
    'prescription_date': p.prescription_date.isoformat(),
    'livestock_id': p.livestock_id,
    'diagnosis': p.diagnosis,
    'status': p.status,
    'follow_up_date': p.follow_up_date.isoformat() if p.follow_up_date else None
  } for p in pagination.items]

  return jsonify({'prescriptions': prescriptions, 'total': pagination.total, 'page': pagination.page, 'pages': pagination.pages}), 200

@prescription_bp.route('/<int:prescription_id>/update-status', methods=['PUT'])
@verify_firebase_token
@require_role('veterinary')
@require_profile_complete
def update_prescription_status(prescription_id):
  prescription = Prescription.query.get_or_404(prescription_id)

  if prescription.veterinarian_id != g.current_user.veterinarian.id: return jsonify({'error': 'Unauthorized access'}), 403  
  data = request.get_json()
  new_status = data.get('status')

  if new_status not in ['active', 'completed', 'cancelled']: return jsonify({'error': 'Invalid status'}), 400  
  prescription.status = new_status
  db.session.commit()
  return jsonify({'message': 'Prescription status updated', 'status': prescription.status}), 200

@prescription_bp.route('/<int:prescription_id>/amu-records', methods=['GET'])
@verify_firebase_token
@require_profile_complete
def get_prescription_amu_records(prescription_id):
  prescription = Prescription.query.get_or_404(prescription_id)

  if g.current_user.role == 'farmer':
    if not g.current_user.farmer or prescription.farmer_id != g.current_user.farmer.id: return jsonify({'error': 'Unauthorized access'}), 403
  elif g.current_user.role == 'veterinary':
    if not g.current_user.veterinarian or prescription.veterinarian_id != g.current_user.veterinarian.id: return jsonify({'error': 'Unauthorized access'}), 403

  amu_records = AntimicrobialRecord.query.filter_by(prescription_id=prescription_id).order_by(AntimicrobialRecord.start_date.desc()).all()  
  records = [{
    'id': r.id,
    'drug_name': r.drug_name,
    'dosage': r.dosage,
    'unit': r.unit,
    'start_date': r.start_date.isoformat(),
    'duration_days': r.duration_days,
    'is_verified': r.is_verified
  } for r in amu_records]
  return jsonify({'prescription_id': prescription_id, 'amu_records': records, 'total': len(records)}), 200

@prescription_bp.route('/livestock/<int:livestock_id>', methods=['GET'])
@verify_firebase_token
@require_profile_complete
def get_livestock_prescriptions(livestock_id):
  livestock = Livestock.query.get_or_404(livestock_id)

  if g.current_user.role == 'farmer':
    if not g.current_user.farmer or livestock.farmer_id != g.current_user.farmer.id: return jsonify({'error': 'Unauthorized access'}), 403  
  prescriptions = Prescription.query.filter_by(livestock_id=livestock_id).order_by(Prescription.prescription_date.desc()).all()
  prescription_list = [{
    'id': p.id,
    'prescription_number': p.prescription_number,
    'prescription_date': p.prescription_date.isoformat(),
    'diagnosis': p.diagnosis,
    'status': p.status,
    'drugs_count': len(p.drugs_prescribed) if isinstance(p.drugs_prescribed, list) else 0
  } for p in prescriptions]

  return jsonify({'livestock_id': livestock_id, 'rfid_tag': livestock.rfid_tag, 'prescriptions': prescription_list, 'total': len(prescription_list)}), 200