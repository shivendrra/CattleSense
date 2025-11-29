from functools import wraps
from flask import request, jsonify, g
import firebase_admin
from firebase_admin import credentials, auth
import os

cred = credentials.Certificate(os.getenv('FIREBASE_CREDENTIALS_PATH', '../serviceAccountKey.json'))
try: firebase_admin.initialize_app(cred)
except ValueError: pass

def verify_firebase_token(f):
  @wraps(f)
  def decorated_function(*args, **kwargs):
    token = None
    if 'Authorization' in request.headers:
      auth_header = request.headers['Authorization']
      if auth_header.startswith('Bearer '): token = auth_header.split('Bearer ')[1]

    if not token: return jsonify({'error': 'No token provided'}), 401
    try:
      decoded_token = auth.verify_id_token(token)
      g.firebase_uid = decoded_token['uid']
      g.email = decoded_token.get('email')

      from ..models.user import User
      user = User.query.filter_by(firebase_uid=g.firebase_uid).first()
      g.current_user = user
      return f(*args, **kwargs)
    except Exception as e: return jsonify({'error': 'Invalid token', 'details': str(e)}), 401
  
  return decorated_function

def require_role(*roles):
  def decorator(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
      if not hasattr(g, 'current_user') or g.current_user is None: return jsonify({'error': 'Authentication required'}), 401

      if g.current_user.role not in roles: return jsonify({'error': 'Insufficient permissions'}), 403
      return f(*args, **kwargs)
    return decorated_function
  return decorator

def require_profile_complete(f):
  @wraps(f)
  def decorated_function(*args, **kwargs):
    if not hasattr(g, 'current_user') or g.current_user is None: return jsonify({'error': 'Authentication required'}), 401

    if not g.current_user.is_profile_complete: return jsonify({'error': 'Profile incomplete', 'onboarding_step': g.current_user.onboarding_step}), 403
    return f(*args, **kwargs)
  return decorated_function