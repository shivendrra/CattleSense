from flask import Blueprint, request, jsonify, g
from extensions import db
from models.livestock import Livestock
from models.requests import TraceabilityLog
from middlewares.auth import verify_firebase_token, require_role, require_profile_complete
from datetime import datetime
import hashlib, json

livestock_bp = Blueprint('livestock', __name__, url_prefix='/api/livestock')

def generate_hash(data_dict):
  data_string = json.dumps(data_dict, sort_keys=True)
  return hashlib.sha256(data_string.encode()).hexdigest()

def create_traceability_log(livestock_id, event_type, event_data):
  last_log = TraceabilityLog.query.filter_by(livestock_id=livestock_id).order_by(TraceabilityLog.timestamp.desc()).first()
  previous_hash = last_log.hash_value if last_log else "0"

  hash_data = {
    'livestock_id': livestock_id,
    'event_type': event_type,
    'event_data': event_data,
    'timestamp': datetime.utcnow().isoformat(),
    'previous_hash': previous_hash
  }
  current_hash = generate_hash(hash_data)

  log = TraceabilityLog(
    livestock_id=livestock_id,
    event_type=event_type,
    event_data=event_data,
    performed_by=g.current_user.id,
    hash_value=current_hash,
    previous_hash=previous_hash,
    ip_address=request.remote_addr
  )
  db.session.add(log)

@livestock_bp.route('/add', methods=['POST'])
@verify_firebase_token
@require_role('farmer')
@require_profile_complete
def add_livestock():
  if not g.current_user.farmer: return jsonify({'error': 'Farmer profile not found'}), 400
  data = request.get_json()

  if not data.get('rfid_tag') or not data.get('species'): return jsonify({'error': 'RFID tag and species are required'}), 400
  existing = Livestock.query.filter_by(rfid_tag=data.get('rfid_tag')).first()
  if existing: return jsonify({'error': 'RFID tag already exists'}), 400

  livestock = Livestock(
    rfid_tag=data.get('rfid_tag'),
    farmer_id=g.current_user.farmer.id,
    species=data.get('species'),
    breed=data.get('breed'),
    name=data.get('name'),
    gender=data.get('gender'),
    date_of_birth=datetime.strptime(data.get('date_of_birth'), '%Y-%m-%d').date() if data.get('date_of_birth') else None,
    age_months=data.get('age_months'),
    parent_id=data.get('parent_id'),
    health_status=data.get('health_status', 'healthy'),
    current_stage=data.get('current_stage'),
    weight_kg=data.get('weight_kg'),
    production_type=data.get('production_type'),
    milk_production_liters_daily=data.get('milk_production_liters_daily'),
    egg_production_daily=data.get('egg_production_daily'),
    image_url=data.get('image_url')
  )  
  db.session.add(livestock)
  db.session.flush()

  create_traceability_log(livestock.id, 'livestock_registered', {
    'rfid_tag': livestock.rfid_tag,
    'species': livestock.species,
    'breed': livestock.breed
  })
  db.session.commit()  
  return jsonify({
    'message': 'Livestock added successfully',
    'livestock_id': livestock.id,
    'rfid_tag': livestock.rfid_tag
  }), 201

@livestock_bp.route('/list', methods=['GET'])
@verify_firebase_token
@require_profile_complete
def list_livestock():
  if g.current_user.role == 'farmer':
    if not g.current_user.farmer: return jsonify({'error': 'Farmer profile not found'}), 400
    livestock_query = Livestock.query.filter_by(farmer_id=g.current_user.farmer.id, is_active=True)

  elif g.current_user.role == 'veterinary':
    farmer_id = request.args.get('farmer_id')
    if not farmer_id: return jsonify({'error': 'Farmer ID required for veterinary access'}), 400
    livestock_query = Livestock.query.filter_by(farmer_id=farmer_id, is_active=True)
  elif g.current_user.role == 'government': livestock_query = Livestock.query.filter_by(is_active=True)

  else: return jsonify({'error': 'Unauthorized access'}), 403
  page = request.args.get('page', 1, type=int)
  per_page = request.args.get('per_page', 20, type=int)
  pagination = livestock_query.paginate(page=page, per_page=per_page, error_out=False)

  livestock_list = [{
    'id': l.id,
    'rfid_tag': l.rfid_tag,
    'species': l.species,
    'breed': l.breed,
    'name': l.name,
    'gender': l.gender,
    'age_months': l.age_months,
    'health_status': l.health_status,
    'weight_kg': l.weight_kg,
    'production_type': l.production_type,
    'milk_production_liters_daily': l.milk_production_liters_daily,
    'image_url': l.image_url
  } for l in pagination.items]

  return jsonify({
    'livestock': livestock_list,
    'total': pagination.total,
    'page': pagination.page,
    'pages': pagination.pages
  }), 200

@livestock_bp.route('/<int:livestock_id>', methods=['GET'])
@verify_firebase_token
@require_profile_complete
def get_livestock_details(livestock_id):
  livestock = Livestock.query.get_or_404(livestock_id)

  if g.current_user.role == 'farmer':
    if not g.current_user.farmer or livestock.farmer_id != g.current_user.farmer.id: return jsonify({'error': 'Unauthorized access'}), 403
  return jsonify({
    'id': livestock.id,
    'rfid_tag': livestock.rfid_tag,
    'species': livestock.species,
    'breed': livestock.breed,
    'name': livestock.name,
    'gender': livestock.gender,
    'date_of_birth': livestock.date_of_birth.isoformat() if livestock.date_of_birth else None,
    'age_months': livestock.age_months,
    'parent_id': livestock.parent_id,
    'health_status': livestock.health_status,
    'current_stage': livestock.current_stage,
    'weight_kg': livestock.weight_kg,
    'production_type': livestock.production_type,
    'milk_production_liters_daily': livestock.milk_production_liters_daily,
    'egg_production_daily': livestock.egg_production_daily,
    'image_url': livestock.image_url,
    'created_at': livestock.created_at.isoformat()
  }), 200

@livestock_bp.route('/<int:livestock_id>/update', methods=['PUT'])
@verify_firebase_token
@require_role('farmer', 'veterinary')
@require_profile_complete
def update_livestock(livestock_id):
  livestock = Livestock.query.get_or_404(livestock_id)

  if g.current_user.role == 'farmer':
    if not g.current_user.farmer or livestock.farmer_id != g.current_user.farmer.id: return jsonify({'error': 'Unauthorized access'}), 403
  
  data = request.get_json()
  changes = {}

  updatable_fields = ['breed', 'name', 'health_status', 'current_stage', 'weight_kg', 'milk_production_liters_daily', 'egg_production_daily', 'image_url']
  for field in updatable_fields:
    if field in data and data[field] is not None:
      old_value = getattr(livestock, field)
      new_value = data[field]
      if old_value != new_value:
        setattr(livestock, field, new_value)
        changes[field] = {'old': old_value, 'new': new_value}
  
  if changes:
    create_traceability_log(livestock.id, 'livestock_updated', changes)
    db.session.commit()
    return jsonify({'message': 'Livestock updated successfully', 'changes': changes}), 200
  return jsonify({'message': 'No changes detected'}), 200

@livestock_bp.route('/<int:livestock_id>/trace', methods=['GET'])
@verify_firebase_token
def trace_livestock(livestock_id):
  livestock = Livestock.query.get_or_404(livestock_id)
  logs = TraceabilityLog.query.filter_by(livestock_id=livestock_id).order_by(TraceabilityLog.timestamp.desc()).all()  
  trace_data = [{
    'id': log.id,
    'event_type': log.event_type,
    'event_data': log.event_data,
    'timestamp': log.timestamp.isoformat(),
    'hash': log.hash_value
  } for log in logs]

  return jsonify({
    'livestock_id': livestock.id,
    'rfid_tag': livestock.rfid_tag,
    'species': livestock.species,
    'trace_log': trace_data
  }), 200