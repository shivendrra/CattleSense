from flask import Blueprint, request, jsonify, g
from ..extensions import db
from ..models.user import User
from ..middlewares.auth import verify_firebase_token

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@auth_bp.route('/verify', methods=['POST'])
@verify_firebase_token
def verify_token():
  user_data = {'firebase_uid': g.firebase_uid, 'email': g.email, 'user_exists': g.current_user is not None}
  if g.current_user:
    user_data.update({
      'user_id': g.current_user.id,
      'name': g.current_user.name,
      'role': g.current_user.role,
      'is_profile_complete': g.current_user.is_profile_complete,
      'onboarding_step': g.current_user.onboarding_step
    })
  return jsonify(user_data), 200

@auth_bp.route('/profile', methods=['GET'])
@verify_firebase_token
def get_profile():
  if not g.current_user:
    return jsonify({'error': 'User not found'}), 404

  profile_data = {
    'id': g.current_user.id,
    'name': g.current_user.name,
    'email': g.current_user.email,
    'role': g.current_user.role,
    'phone': g.current_user.phone,
    'profile_image_url': g.current_user.profile_image_url,
    'is_active': g.current_user.is_active,
    'is_profile_complete': g.current_user.is_profile_complete,
    'onboarding_step': g.current_user.onboarding_step,
    'created_at': g.current_user.created_at.isoformat()
  }

  if g.current_user.role == 'farmer' and g.current_user.farmer:
    profile_data['farmer'] = {
      'farm_name': g.current_user.farmer.farm_name,
      'farm_type': g.current_user.farmer.farm_type,
      'region': g.current_user.farmer.region,
      'state': g.current_user.farmer.state,
      'district': g.current_user.farmer.district
    }
  elif g.current_user.role == 'veterinary' and g.current_user.veterinarian:
    profile_data['veterinarian'] = {
      'license_number': g.current_user.veterinarian.license_number,
      'specialization': g.current_user.veterinarian.specialization,
      'clinic_name': g.current_user.veterinarian.clinic_hospital_name,
      'verification_status': g.current_user.veterinarian.verification_status
    }
  elif g.current_user.role == 'government' and g.current_user.government_official:
    profile_data['government'] = {
      'government_id': g.current_user.government_official.government_id,
      'department': g.current_user.government_official.department_name,
      'designation': g.current_user.government_official.designation,
      'jurisdiction_state': g.current_user.government_official.jurisdiction_state,
      'jurisdiction_district': g.current_user.government_official.jurisdiction_district
    }
  elif g.current_user.role == 'researcher' and g.current_user.researcher:
    profile_data['researcher'] = {
      'institution': g.current_user.researcher.institution_name,
      'project': g.current_user.researcher.project_name,
      'research_area': g.current_user.researcher.research_area
    }

  return jsonify(profile_data), 200

@auth_bp.route('/profile', methods=['PUT'])
@verify_firebase_token
def update_profile():
  if not g.current_user:
    return jsonify({'error': 'User not found'}), 404

  data = request.get_json()

  if 'name' in data: g.current_user.name = data['name']
  if 'phone' in data: g.current_user.phone = data['phone']
  if 'profile_image_url' in data: g.current_user.profile_image_url = data['profile_image_url']

  db.session.commit()
  return jsonify({'message': 'Profile updated successfully'}), 200

@auth_bp.route('/logout', methods=['POST'])
@verify_firebase_token
def logout():
  return jsonify({'message': 'Logged out successfully'}), 200