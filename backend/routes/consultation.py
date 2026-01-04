from flask import Blueprint, request, jsonify, g
from extensions import db
from models.livestock import Livestock
from models.user import Veterinarian, Farmer
from models.requests import Alert, ConsultationRequest
from middlewares.auth import verify_firebase_token, require_role, require_profile_complete
from datetime import datetime, timezone

consultation_bp = Blueprint('consultation', __name__, url_prefix='/api/consultation')

@consultation_bp.route('/request', methods=['POST'])
@verify_firebase_token
@require_role('farmer')
@require_profile_complete
def create_consultation_request():
  farmer = g.current_user.farmer
  if not farmer: return jsonify({'error': 'Farmer profile not found'}), 400

  data = request.get_json()
  veterinarian_id = data.get('veterinarian_id')
  livestock_id = data.get('livestock_id')
  if veterinarian_id:
    vet = Veterinarian.query.get(veterinarian_id)
    if not vet: return jsonify({'error': 'Veterinarian not found'}), 404
  
  if livestock_id:
    livestock = Livestock.query.get(livestock_id)
    if not livestock or livestock.farmer_id != farmer.id: return jsonify({'error': 'Livestock not found or unauthorized'}), 404
  
  consultation = ConsultationRequest(
    farmer_id=farmer.id,
    veterinarian_id=veterinarian_id,
    livestock_id=livestock_id,
    request_type=data.get('request_type', 'other'),
    description=data.get('description'),
    preferred_date=datetime.strptime(data.get('preferred_date'), '%Y-%m-%d').date() if data.get('preferred_date') else None
  )
  db.session.add(consultation)
  db.session.flush()
  if veterinarian_id:
    alert = Alert(farmer_id=farmer.id, veterinarian_id=veterinarian_id, livestock_id=livestock_id, alert_type='consultation_request', severity='medium', title='New Consultation Request', message=f'Farmer {g.current_user.name} has requested a consultation')
    db.session.add(alert)
  db.session.commit()
  return jsonify({'message': 'Consultation request created', 'request_id': consultation.id}), 201

@consultation_bp.route('/list', methods=['GET'])
@verify_firebase_token
@require_profile_complete
def list_consultations():
  page = request.args.get('page', 1, type=int)
  per_page = request.args.get('per_page', 20, type=int)
  status = request.args.get('status')

  if g.current_user.role == 'farmer':
    if not g.current_user.farmer: return jsonify({'error': 'Farmer profile not found'}), 400
    query = ConsultationRequest.query.filter_by(farmer_id=g.current_user.farmer.id)
  elif g.current_user.role == 'veterinary':
    if not g.current_user.veterinarian: return jsonify({'error': 'Veterinary profile not found'}), 400
    query = ConsultationRequest.query.filter_by(veterinarian_id=g.current_user.veterinarian.id)
  else: return jsonify({'error': 'Unauthorized access'}), 403
  
  if status: query = query.filter_by(status=status)
  query = query.order_by(ConsultationRequest.created_at.desc())
  pagination = query.paginate(page=page, per_page=per_page, error_out=False)

  consultations = [{
    'id': c.id,
    'request_type': c.request_type,
    'description': c.description,
    'preferred_date': c.preferred_date.isoformat() if c.preferred_date else None,
    'status': c.status,
    'livestock_id': c.livestock_id,
    'created_at': c.created_at.isoformat()
  } for c in pagination.items]  
  return jsonify({'consultations': consultations, 'total': pagination.total, 'page': pagination.page, 'pages': pagination.pages}), 200

@consultation_bp.route('/<int:consultation_id>', methods=['GET'])
@verify_firebase_token
@require_profile_complete
def get_consultation(consultation_id):
  consultation = ConsultationRequest.query.get_or_404(consultation_id)

  if g.current_user.role == 'farmer':
    if not g.current_user.farmer or consultation.farmer_id != g.current_user.farmer.id: return jsonify({'error': 'Unauthorized access'}), 403
  elif g.current_user.role == 'veterinary':
    if not g.current_user.veterinarian or consultation.veterinarian_id != g.current_user.veterinarian.id: return jsonify({'error': 'Unauthorized access'}), 403
  farmer = Farmer.query.get(consultation.farmer_id)
  livestock_info = None
  if consultation.livestock_id:
    livestock = Livestock.query.get(consultation.livestock_id)
    if livestock: livestock_info = {'id': livestock.id, 'rfid_tag': livestock.rfid_tag, 'species': livestock.species, 'name': livestock.name, 'health_status': livestock.health_status}

  return jsonify({
    'id': consultation.id,
    'farmer': {'id': farmer.id, 'name': farmer.user.name, 'farm_name': farmer.farm_name, 'phone': farmer.user.phone},
    'livestock': livestock_info,
    'request_type': consultation.request_type,
    'description': consultation.description,
    'preferred_date': consultation.preferred_date.isoformat() if consultation.preferred_date else None,
    'status': consultation.status,
    'response_notes': consultation.response_notes,
    'created_at': consultation.created_at.isoformat(),
    'updated_at': consultation.updated_at.isoformat()
  }), 200

@consultation_bp.route('/<int:consultation_id>/accept', methods=['PUT'])
@verify_firebase_token
@require_role('veterinary')
@require_profile_complete
def accept_consultation(consultation_id):
  consultation = ConsultationRequest.query.get_or_404(consultation_id)
  if consultation.veterinarian_id != g.current_user.veterinarian.id: return jsonify({'error': 'Unauthorized access'}), 403
  if consultation.status != 'pending': return jsonify({'error': 'Consultation already processed'}), 400
  data = request.get_json()
  consultation.status = 'accepted'
  consultation.response_notes = data.get('response_notes')
  consultation.updated_at = datetime.now(timezone.utc)
  db.session.commit()
  return jsonify({'message': 'Consultation request accepted'}), 200

@consultation_bp.route('/<int:consultation_id>/complete', methods=['PUT'])
@verify_firebase_token
@require_role('veterinary')
@require_profile_complete
def complete_consultation(consultation_id):
  consultation = ConsultationRequest.query.get_or_404(consultation_id)
  if consultation.veterinarian_id != g.current_user.veterinarian.id: return jsonify({'error': 'Unauthorized access'}), 403
  data = request.get_json()
  consultation.status = 'completed'
  consultation.response_notes = data.get('response_notes', consultation.response_notes)
  consultation.updated_at = datetime.now(timezone.utc)
  db.session.commit()
  return jsonify({'message': 'Consultation marked as completed'}), 200

@consultation_bp.route('/<int:consultation_id>/cancel', methods=['PUT'])
@verify_firebase_token
@require_profile_complete
def cancel_consultation(consultation_id):
  consultation = ConsultationRequest.query.get_or_404(consultation_id)
  if g.current_user.role == 'farmer':
    if not g.current_user.farmer or consultation.farmer_id != g.current_user.farmer.id: return jsonify({'error': 'Unauthorized access'}), 403
  elif g.current_user.role == 'veterinary':
    if not g.current_user.veterinarian or consultation.veterinarian_id != g.current_user.veterinarian.id: return jsonify({'error': 'Unauthorized access'}), 403
  consultation.status = 'cancelled'
  consultation.updated_at = datetime.now(timezone.utc)
  db.session.commit()
  return jsonify({'message': 'Consultation cancelled'}), 200

@consultation_bp.route('/veterinarians/search', methods=['GET'])
@verify_firebase_token
@require_role('farmer')
@require_profile_complete
def search_veterinarians():
  state = request.args.get('state')
  district = request.args.get('district')
  specialization = request.args.get('specialization')
  available_for_emergency = request.args.get('available_for_emergency')
  query = Veterinarian.query.filter_by(verification_status='verified')
  if state: query = query.filter_by(state=state)
  if district: query = query.filter_by(district=district)
  if specialization: query = query.filter(Veterinarian.specialization.ilike(f'%{specialization}%'))
  if available_for_emergency: query = query.filter_by(available_for_emergency=True)
  veterinarians = query.limit(20).all()  
  vet_list = [{
    'id': v.id,
    'name': v.user.name,
    'license_number': v.license_number,
    'specialization': v.specialization,
    'clinic_name': v.clinic_hospital_name,
    'district': v.district,
    'state': v.state,
    'years_of_experience': v.years_of_experience,
    'consultation_fee': v.consultation_fee,
    'available_for_emergency': v.available_for_emergency
  } for v in veterinarians]

  return jsonify({'veterinarians': vet_list, 'total': len(vet_list)}), 200