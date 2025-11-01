from flask import Blueprint, request, jsonify
from models.user import User
from utils.db import db
from utils.firebase_verify import verify_firebase_token

auth_bp = Blueprint('auth_bp', __name__)

@auth_bp.route('/register', methods=['POST'])
@verify_firebase_token
def register_user():
  data = request.json
  user = User.query.filter_by(uid=request.user['uid']).first()
  if user:
    return jsonify({'message': 'User already registered', 'user': user.to_dict()}), 200

  new_user = User(
    uid=request.user['uid'],
    name=data.get('name', 'Unknown'),
    email=request.user.get('email', ''),
    role=data.get('role', 'farmer')
  )
  db.session.add(new_user)
  db.session.commit()
  return jsonify({'message': 'User registered successfully', 'user': new_user.to_dict()}), 201
