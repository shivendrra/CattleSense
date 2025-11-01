import firebase_admin
from firebase_admin import credentials, auth
from flask import request, jsonify
from functools import wraps
from config import Config

cred = credentials.Certificate(Config.FIREBASE_CRED)
firebase_admin.initialize_app(cred)

def verify_firebase_token(f):
  @wraps(f)
  def decorated(*args, **kwargs):
    auth_header = request.headers.get('Authorization')
    if not auth_header:
      return jsonify({'error': 'Authorization header missing'}), 401
    try:
      token = auth_header.split(" ")[1]
      decoded = auth.verify_id_token(token)
      request.user = decoded
    except Exception as e:
      return jsonify({'error': f'Invalid token: {str(e)}'}), 401
    return f(*args, **kwargs)
  return decorated
