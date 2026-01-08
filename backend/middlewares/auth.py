from functools import wraps
from flask import request, jsonify, g
import firebase_admin
from firebase_admin import credentials, auth
import os
import sys

cred_path = os.getenv('FIREBASE_CREDENTIALS_PATH', 'serviceAccountKey.json')
print(f"Loading Firebase credentials from: {cred_path}")
print(f"File exists: {os.path.exists(cred_path)}")

try:
  cred = credentials.Certificate(cred_path)
  firebase_admin.initialize_app(cred)
  print("Firebase Admin SDK initialized successfully")

  with open(cred_path, 'r') as f:
    import json
    service_account = json.load(f)
    print(f"Project ID: {service_account.get('project_id')}")
    print(f"Client Email: {service_account.get('client_email')}")
except ValueError as e:
  if "already exists" in str(e): print("Firebase Admin SDK already initialized")
  else:
    print(f"Firebase initialization error: {e}")
    sys.exit(1)
except Exception as e:
  print(f"Failed to initialize Firebase: {type(e).__name__}: {e}")
  sys.exit(1)

def verify_firebase_token(f):
  @wraps(f)
  def decorated_function(*args, **kwargs):
    print("\n" + "="*60)
    print("AUTH MIDDLEWARE - Token Verification Starting")
    print("="*60)
    
    token = None
    if 'Authorization' in request.headers:
      auth_header = request.headers['Authorization']
      print(f"Authorization header present: {auth_header[:50]}...")

      if auth_header.startswith('Bearer '):
        token = auth_header.split('Bearer ')[1]
        print(f"Token extracted (length: {len(token)})")
      else: print("Authorization header doesn't start with 'Bearer '")
    else: print("No Authorization header in request")

    if not token:
      print("RESULT: No token provided")
      print("="*60 + "\n")
      return jsonify({'error': 'No token provided'}), 401

    try:
      print("Attempting to verify token...")
      print(f"Token preview: {token[:30]}...{token[-30:]}")

      decoded_token = auth.verify_id_token(token)
      print("Token decoded successfully")
      print(f"UID: {decoded_token['uid']}")
      print(f"Email: {decoded_token.get('email', 'N/A')}")
      print(f"Auth Time: {decoded_token.get('auth_time', 'N/A')}")
      print(f"Issuer: {decoded_token.get('iss', 'N/A')}")

      g.firebase_uid = decoded_token['uid']
      g.email = decoded_token.get('email')

      from models.user import User
      user = User.query.filter_by(firebase_uid=g.firebase_uid).first()
      g.current_user = user

      if user:
        print("User found in database:")
        print(f"   - ID: {user.id}")
        print(f"   - Email: {user.email}")
        print(f"   - Role: {user.role}")
        print(f"   - Profile Complete: {user.is_profile_complete}")
      else:
        print(f"User not found in database for UID: {g.firebase_uid}")
        print("This is normal for new users during signup")

      print("RESULT: Authentication successful")
      print("="*60 + "\n")
      return f(*args, **kwargs)

    except auth.InvalidIdTokenError as e:
      print(f"Invalid ID Token Error: {e}")
      print("Possible causes:")
      print("   - Token expired")
      print("   - Token from different Firebase project")
      print("   - Malformed token")
      print("="*60 + "\n")
      return jsonify({'error': 'Invalid token', 'details': 'Token is invalid or expired'}), 401

    except auth.ExpiredIdTokenError as e:
      print(f"Expired ID Token Error: {e}")
      print("="*60 + "\n")
      return jsonify({'error': 'Invalid token', 'details': 'Token has expired'}), 401

    except auth.RevokedIdTokenError as e:
      print(f"Revoked ID Token Error: {e}")
      print("="*60 + "\n")
      return jsonify({'error': 'Invalid token', 'details': 'Token has been revoked'}), 401

    except Exception as e:
      print("Unexpected error during token verification:")
      print(f"Type: {type(e).__name__}")
      print(f"Message: {str(e)}")
      import traceback
      print("Traceback:")
      traceback.print_exc()
      print("="*60 + "\n")
      return jsonify({'error': 'Invalid token', 'details': str(e)}), 401

  return decorated_function

def require_role(*roles):
  def decorator(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
      if not hasattr(g, 'current_user') or g.current_user is None:
        return jsonify({'error': 'Authentication required'}), 401
      if g.current_user.role not in roles:
        return jsonify({'error': 'Insufficient permissions'}), 403
      return f(*args, **kwargs)
    return decorated_function
  return decorator

def require_profile_complete(f):
  @wraps(f)
  def decorated_function(*args, **kwargs):
    if not hasattr(g, 'current_user') or g.current_user is None:
      return jsonify({'error': 'Authentication required'}), 401
    if not g.current_user.is_profile_complete:
      return jsonify({'error': 'Profile incomplete', 'onboarding_step': g.current_user.onboarding_step}), 403
    return f(*args, **kwargs)
  return decorated_function