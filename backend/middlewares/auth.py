from functools import wraps
from flask import request, jsonify, g
import firebase_admin
from firebase_admin import credentials, auth
import os
import sys
import logging

DEBUG = os.getenv("FLASK_ENV") != "production"

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

cred_path = os.getenv('FIREBASE_CREDENTIALS_PATH', 'serviceAccountKey.json')

try:
  cred = credentials.Certificate(cred_path)
  firebase_admin.initialize_app(cred)
except ValueError as e:
  if "already exists" not in str(e):
    logger.error("Firebase initialization error")
    sys.exit(1)
except Exception:
  logger.exception("Failed to initialize Firebase")
  sys.exit(1)

def verify_firebase_token(f):
  @wraps(f)
  def decorated_function(*args, **kwargs):
    token = None
    auth_header = request.headers.get("Authorization")
    if auth_header and auth_header.startswith("Bearer "):
      token = auth_header.split("Bearer ", 1)[1]
    if not token:
      return jsonify({'error': 'Authentication required'}), 401
    try:
      decoded_token = auth.verify_id_token(token)
      g.firebase_uid = decoded_token['uid']
      g.email = decoded_token.get('email')
      from models.user import User
      g.current_user = User.query.filter_by(firebase_uid=g.firebase_uid).first()
      return f(*args, **kwargs)
    except auth.InvalidIdTokenError:
      return jsonify({'error': 'Invalid token'}), 401
    except auth.ExpiredIdTokenError:
      return jsonify({'error': 'Token expired'}), 401
    except auth.RevokedIdTokenError:
      return jsonify({'error': 'Token revoked'}), 401
    except Exception:
      if DEBUG:
        logger.exception("Unexpected authentication error")
      else:
        logger.error("Authentication failure")
      return jsonify({'error': 'Authentication failed'}), 401
  return decorated_function

def require_role(*roles):
  def decorator(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
      if not getattr(g, 'current_user', None):
        return jsonify({'error': 'Authentication required'}), 401
      if g.current_user.role not in roles:
        return jsonify({'error': 'Insufficient permissions'}), 403
      return f(*args, **kwargs)
    return decorated_function
  return decorator

def require_profile_complete(f):
  @wraps(f)
  def decorated_function(*args, **kwargs):
    if not getattr(g, 'current_user', None):
      return jsonify({'error': 'Authentication required'}), 401
    if not g.current_user.is_profile_complete:
      return jsonify({
        'error': 'Profile incomplete',
        'onboarding_step': g.current_user.onboarding_step
      }), 403
    return f(*args, **kwargs)
  return decorated_function