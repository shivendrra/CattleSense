from flask import Blueprint, request, jsonify, g
from ..database import db
from ..models.records import Alert
from ..models.functional import Livestock
from ..middleware.auth import verify_firebase_token, require_role, require_profile_complete
from datetime import datetime, timezone

alerts_bp = Blueprint('alerts', __name__, url_prefix='/api/alerts')

@alerts_bp.route('/list', methods=['GET'])
@verify_firebase_token
@require_profile_complete
def list_alerts():
  page = request.args.get('page', 1, type=int)
  per_page = request.args.get('per_page', 20, type=int)
  status = request.args.get('status')
  alert_type = request.args.get('type')
  severity = request.args.get('severity')

  if g.current_user.role == 'farmer':
    if not g.current_user.farmer: return jsonify({'error': 'Farmer profile not found'}), 400
    query = Alert.query.filter_by(farmer_id=g.current_user.farmer.id)
  elif g.current_user.role == 'veterinary':
    if not g.current_user.veterinarian: return jsonify({'error': 'Veterinary profile not found'}), 400
    query = Alert.query.filter_by(veterinarian_id=g.current_user.veterinarian.id)
  else: return jsonify({'error': 'Unauthorized access'}), 403
  
  if status: query = query.filter_by(status=status)
  if alert_type: query = query.filter_by(alert_type=alert_type)
  if severity: query = query.filter_by(severity=severity)

  query = query.order_by(Alert.created_at.desc())
  pagination = query.paginate(page=page, per_page=per_page, error_out=False)  
  alerts = [{
    'id': a.id,
    'alert_type': a.alert_type,
    'severity': a.severity,
    'title': a.title,
    'message': a.message,
    'status': a.status,
    'livestock_id': a.livestock_id,
    'metadata': a.metadata,
    'created_at': a.created_at.isoformat()
  } for a in pagination.items]

  return jsonify({'alerts': alerts, 'total': pagination.total, 'page': pagination.page, 'pages': pagination.pages}), 200

@alerts_bp.route('/<int:alert_id>', methods=['GET'])
@verify_firebase_token
@require_profile_complete
def get_alert(alert_id):
  alert = Alert.query.get_or_404(alert_id)

  if g.current_user.role == 'farmer':
    if not g.current_user.farmer or alert.farmer_id != g.current_user.farmer.id: return jsonify({'error': 'Unauthorized access'}), 403
  elif g.current_user.role == 'veterinary':
    if not g.current_user.veterinarian or alert.veterinarian_id != g.current_user.veterinarian.id: return jsonify({'error': 'Unauthorized access'}), 403

  livestock_info = None
  if alert.livestock_id:
    livestock = Livestock.query.get(alert.livestock_id)
    if livestock: livestock_info = {'id': livestock.id, 'rfid_tag': livestock.rfid_tag, 'species': livestock.species, 'name': livestock.name}

  return jsonify({
    'id': alert.id,
    'alert_type': alert.alert_type,
    'severity': alert.severity,
    'title': alert.title,
    'message': alert.message,
    'status': alert.status,
    'livestock': livestock_info,
    'metadata': alert.metadata,
    'acknowledged_at': alert.acknowledged_at.isoformat() if alert.acknowledged_at else None,
    'resolved_at': alert.resolved_at.isoformat() if alert.resolved_at else None,
    'created_at': alert.created_at.isoformat()
  }), 200

@alerts_bp.route('/<int:alert_id>/acknowledge', methods=['PUT'])
@verify_firebase_token
@require_profile_complete
def acknowledge_alert(alert_id):
  alert = Alert.query.get_or_404(alert_id)

  if g.current_user.role == 'farmer':
    if not g.current_user.farmer or alert.farmer_id != g.current_user.farmer.id: return jsonify({'error': 'Unauthorized access'}), 403
  elif g.current_user.role == 'veterinary':
    if not g.current_user.veterinarian or alert.veterinarian_id != g.current_user.veterinarian.id: return jsonify({'error': 'Unauthorized access'}), 403

  alert.status = 'acknowledged'
  alert.acknowledged_at = datetime.now(timezone.utc)
  db.session.commit()  
  return jsonify({'message': 'Alert acknowledged', 'acknowledged_at': alert.acknowledged_at.isoformat()}), 200

@alerts_bp.route('/<int:alert_id>/resolve', methods=['PUT'])
@verify_firebase_token
@require_profile_complete
def resolve_alert(alert_id):
  alert = Alert.query.get_or_404(alert_id)
  
  if g.current_user.role == 'farmer':
    if not g.current_user.farmer or alert.farmer_id != g.current_user.farmer.id: return jsonify({'error': 'Unauthorized access'}), 403
  elif g.current_user.role == 'veterinary':
    if not g.current_user.veterinarian or alert.veterinarian_id != g.current_user.veterinarian.id: return jsonify({'error': 'Unauthorized access'}), 403

  alert.status = 'resolved'
  alert.resolved_at = datetime.now(timezone.utc)
  db.session.commit()
  return jsonify({'message': 'Alert resolved', 'resolved_at': alert.resolved_at.isoformat()}), 200

@alerts_bp.route('/<int:alert_id>/mark-read', methods=['PUT'])
@verify_firebase_token
@require_profile_complete
def mark_alert_read(alert_id):
  alert = Alert.query.get_or_404(alert_id)
  
  if g.current_user.role == 'farmer':
    if not g.current_user.farmer or alert.farmer_id != g.current_user.farmer.id: return jsonify({'error': 'Unauthorized access'}), 403
  elif g.current_user.role == 'veterinary':
    if not g.current_user.veterinarian or alert.veterinarian_id != g.current_user.veterinarian.id: return jsonify({'error': 'Unauthorized access'}), 403  
  if alert.status == 'unread':
    alert.status = 'read'
    db.session.commit()
  return jsonify({'message': 'Alert marked as read'}), 200

@alerts_bp.route('/summary', methods=['GET'])
@verify_firebase_token
@require_profile_complete
def alerts_summary():
  if g.current_user.role == 'farmer':
    if not g.current_user.farmer: return jsonify({'error': 'Farmer profile not found'}), 400
    farmer_id = g.current_user.farmer.id

    unread_count = Alert.query.filter_by(farmer_id=farmer_id, status='unread').count()
    critical_count = Alert.query.filter_by(farmer_id=farmer_id, severity='critical').filter(Alert.status.in_(['unread', 'read'])).count()
    high_count = Alert.query.filter_by(farmer_id=farmer_id, severity='high').filter(Alert.status.in_(['unread', 'read'])).count()

    withdrawal_alerts = Alert.query.filter_by(farmer_id=farmer_id, alert_type='withdrawal_period').filter(Alert.status.in_(['unread', 'read'])).count()
    excessive_use_alerts = Alert.query.filter_by(farmer_id=farmer_id, alert_type='excessive_use').filter(Alert.status.in_(['unread', 'read'])).count()

    return jsonify({
      'unread_count': unread_count,
      'critical_count': critical_count,
      'high_count': high_count,
      'withdrawal_alerts': withdrawal_alerts,
      'excessive_use_alerts': excessive_use_alerts
    }), 200

  elif g.current_user.role == 'veterinary':
    if not g.current_user.veterinarian: return jsonify({'error': 'Veterinary profile not found'}), 400
    vet_id = g.current_user.veterinarian.id

    unread_count = Alert.query.filter_by(veterinarian_id=vet_id, status='unread').count()
    consultation_requests = Alert.query.filter_by(veterinarian_id=vet_id, alert_type='consultation_request', status='unread').count()
    return jsonify({'unread_count': unread_count, 'consultation_requests': consultation_requests}), 200  
  return jsonify({'error': 'Unauthorized access'}), 403

@alerts_bp.route('/bulk-acknowledge', methods=['PUT'])
@verify_firebase_token
@require_profile_complete
def bulk_acknowledge_alerts():
  data = request.get_json()
  alert_ids = data.get('alert_ids', [])  
  if not alert_ids: return jsonify({'error': 'No alert IDs provided'}), 400

  if g.current_user.role == 'farmer':
    if not g.current_user.farmer: return jsonify({'error': 'Farmer profile not found'}), 400
    alerts = Alert.query.filter(Alert.id.in_(alert_ids), Alert.farmer_id == g.current_user.farmer.id).all()
  elif g.current_user.role == 'veterinary':
    if not g.current_user.veterinarian: return jsonify({'error': 'Veterinary profile not found'}), 400
    alerts = Alert.query.filter(Alert.id.in_(alert_ids), Alert.veterinarian_id == g.current_user.veterinarian.id).all()
  else: return jsonify({'error': 'Unauthorized access'}), 403

  acknowledged_count = 0
  for alert in alerts:
    if alert.status in ['unread', 'read']:
      alert.status = 'acknowledged'
      alert.acknowledged_at = datetime.now(timezone.utc)
      acknowledged_count += 1  
  db.session.commit()
  return jsonify({'message': f'{acknowledged_count} alerts acknowledged'}), 200