from flask import Blueprint, request, jsonify
from models.livestock import Livestock
from utils.db import db
from utils.firebase_verify import verify_firebase_token

livestock_bp = Blueprint('livestock_bp', __name__)

@livestock_bp.route('/livestock', methods=['POST'])
@verify_firebase_token
def add_livestock():
  data = request.json
  new_animal = Livestock(
    tag_id=data['tag_id'],
    species=data.get('species', 'unknown'),
    owner_id=data['owner_id'],
    health_data=data.get('health_data', {})
  )
  db.session.add(new_animal)
  db.session.commit()
  return jsonify({'message': 'Livestock added', 'livestock': new_animal.to_dict()}), 201

@livestock_bp.route('/livestock', methods=['GET'])
@verify_firebase_token
def list_livestock():
  all_animals = Livestock.query.all()
  return jsonify([a.to_dict() for a in all_animals]), 200