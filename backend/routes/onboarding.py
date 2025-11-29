from flask import Blueprint, request, jsonify, g
from ..database import db
from ..models.user import User, Farmer, Veterinarian, GovernmentOfficial, Researcher
from ..middleware.auth import verify_firebase_token
from ..utils.encryption import aadhaar_encryption

onboarding_bp = Blueprint('onboarding', __name__, url_prefix='/api/onboarding')

@onboarding_bp.route('/initial', methods=['POST'])
@verify_firebase_token
def initial_profile():
  data = request.get_json()
  if g.current_user: return jsonify({'error': 'User profile already exists'}), 400
  name = data.get('name')
  role = data.get('role')
  profile_image_url = data.get('profile_image_url')
  aadhaar = data.get('aadhaar')
  phone = data.get('phone')

  if not name or not role: return jsonify({'error': 'Name and role are required'}), 400
  if role not in ['farmer', 'veterinary', 'government', 'researcher']: return jsonify({'error': 'Invalid role'}), 400
  aadhaar_encrypted = None
  if role in ['farmer', 'veterinary', 'government']:
    if not aadhaar: return jsonify({'error': 'Aadhaar is required for this role'}), 400
    try: aadhaar_encrypted = aadhaar_encryption.encrypt_aadhaar(aadhaar)
    except ValueError as e: return jsonify({'error': str(e)}), 400

  user = User(
    firebase_uid=g.firebase_uid,
    email=g.email,
    name=name,
    role=role,
    profile_image_url=profile_image_url,
    aadhaar_encrypted=aadhaar_encrypted,
    phone=phone,
    onboarding_step=1
  )

  db.session.add(user)
  db.session.commit()

  return jsonify({
    'message': 'Initial profile created',
    'user_id': user.id,
    'role': user.role,
    'onboarding_step': user.onboarding_step
  }), 201

@onboarding_bp.route('/farmer', methods=['POST'])
@verify_firebase_token
def complete_farmer_profile():
  if not g.current_user or g.current_user.role != 'farmer': return jsonify({'error': 'Invalid access'}), 403
  if g.current_user.farmer: return jsonify({'error': 'Farmer profile already exists'}), 400

  data = request.get_json()

  farmer = Farmer(
    user_id=g.current_user.id,
    farm_name=data.get('farm_name'),
    farm_address=data.get('farm_address'),
    region=data.get('region'),
    state=data.get('state'),
    district=data.get('district'),
    pincode=data.get('pincode'),
    latitude=data.get('latitude'),
    longitude=data.get('longitude'),
    registration_number=data.get('registration_number'),
    farm_size_acres=data.get('farm_size_acres'),
    farm_type=data.get('farm_type')
  )

  g.current_user.onboarding_step = 2  
  db.session.add(farmer)
  db.session.commit()

  return jsonify({
    'message': 'Farmer profile created',
    'farmer_id': farmer.id,
    'onboarding_step': g.current_user.onboarding_step
  }), 201

@onboarding_bp.route('/veterinary', methods=['POST'])
@verify_firebase_token
def complete_veterinary_profile():
  if not g.current_user or g.current_user.role != 'veterinary': return jsonify({'error': 'Invalid access'}), 403
  if g.current_user.veterinarian: return jsonify({'error': 'Veterinary profile already exists'}), 400
  data = request.get_json()
  if not data.get('license_number'): return jsonify({'error': 'License number is required'}), 400

  veterinarian = Veterinarian(
    user_id=g.current_user.id,
    license_number=data.get('license_number'),
    specialization=data.get('specialization'),
    qualification=data.get('qualification'),
    alma_mater=data.get('alma_mater'),
    years_of_experience=data.get('years_of_experience'),
    age=data.get('age'),
    clinic_hospital_name=data.get('clinic_hospital_name'),
    clinic_address=data.get('clinic_address'),
    state=data.get('state'),
    district=data.get('district'),
    pincode=data.get('pincode'),
    consultation_fee=data.get('consultation_fee'),
    available_for_emergency=data.get('available_for_emergency', True)
  )

  g.current_user.is_profile_complete = True
  g.current_user.onboarding_step = 3
  
  db.session.add(veterinarian)
  db.session.commit()  
  return jsonify({
    'message': 'Veterinary profile created',
    'veterinarian_id': veterinarian.id,
    'verification_status': veterinarian.verification_status
  }), 201

@onboarding_bp.route('/government', methods=['POST'])
@verify_firebase_token
def complete_government_profile():
  if not g.current_user or g.current_user.role != 'government': return jsonify({'error': 'Invalid access'}), 403
  if g.current_user.government_official: return jsonify({'error': 'Government profile already exists'}), 400
  data = request.get_json()  
  if not data.get('government_id') or not data.get('department_name'): return jsonify({'error': 'Government ID and department name are required'}), 400
  
  gov_official = GovernmentOfficial(
    user_id=g.current_user.id,
    government_id=data.get('government_id'),
    department_name=data.get('department_name'),
    department_id=data.get('department_id'),
    designation=data.get('designation'),
    jurisdiction_state=data.get('jurisdiction_state'),
    jurisdiction_district=data.get('jurisdiction_district'),
    jurisdiction_regions=data.get('jurisdiction_regions'),
    office_address=data.get('office_address')
  )

  g.current_user.is_profile_complete = True
  g.current_user.onboarding_step = 3

  db.session.add(gov_official)
  db.session.commit()

  return jsonify({
    'message': 'Government official profile created',
    'official_id': gov_official.id,
    'verification_status': gov_official.verification_status
  }), 201

@onboarding_bp.route('/researcher', methods=['POST'])
@verify_firebase_token
def complete_researcher_profile():
  if not g.current_user or g.current_user.role != 'researcher': return jsonify({'error': 'Invalid access'}), 403  
  if g.current_user.researcher: return jsonify({'error': 'Researcher profile already exists'}), 400
  data = request.get_json()
  if not data.get('institution_name') or not data.get('project_name'): return jsonify({'error': 'Institution name and project name are required'}), 400

  researcher = Researcher(
    user_id=g.current_user.id,
    institution_name=data.get('institution_name'),
    institution_type=data.get('institution_type'),
    role_designation=data.get('role_designation'),
    project_name=data.get('project_name'),
    research_area=data.get('research_area')
  )

  g.current_user.is_profile_complete = True
  g.current_user.onboarding_step = 3
  db.session.add(researcher)
  db.session.commit()

  return jsonify({
    'message': 'Researcher profile created',
    'researcher_id': researcher.id,
    'verification_status': researcher.verification_status
  }), 201

@onboarding_bp.route('/complete-livestock', methods=['POST'])
@verify_firebase_token
def complete_farmer_onboarding():
  if not g.current_user or g.current_user.role != 'farmer': return jsonify({'error': 'Invalid access'}), 403
  if not g.current_user.farmer: return jsonify({'error': 'Complete farmer profile first'}), 400
  g.current_user.is_profile_complete = True
  g.current_user.onboarding_step = 3
  db.session.commit()  
  return jsonify({'message': 'Onboarding completed'}), 200

@onboarding_bp.route('/status', methods=['GET'])
@verify_firebase_token
def onboarding_status():
  if not g.current_user: return jsonify({'is_profile_complete': False, 'onboarding_step': 0, 'role': None}), 200

  return jsonify({
    'is_profile_complete': g.current_user.is_profile_complete,
    'onboarding_step': g.current_user.onboarding_step,
    'role': g.current_user.role,
    'user_id': g.current_user.id
  }), 200