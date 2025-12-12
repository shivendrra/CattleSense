from flask import Blueprint, request, jsonify, g
from ..extensions import db
from ..models.user import User, Farmer, Veterinarian, GovernmentOfficial, Researcher
from ..models.livestock import Livestock
from ..models.amu import AntimicrobialRecord
from ..models.requests import Alert, ConsultationRequest
from ..models.analytics import RegionalAnalytics, DataRequest
from ..middlewares.auth import verify_firebase_token, require_role, require_profile_complete
from ..services.gemini import gemini_service
from sqlalchemy import func, and_
from datetime import datetime, timedelta, timezone

dashboard_bp = Blueprint('dashboard', __name__, url_prefix='/api/dashboard')

@dashboard_bp.route('/farmer', methods=['GET'])
@verify_firebase_token
@require_role('farmer')
@require_profile_complete
def farmer_dashboard():
  farmer = g.current_user.farmer
  if not farmer: return jsonify({'error': 'Farmer profile not found'}), 400
  
  total_livestock = Livestock.query.filter_by(farmer_id=farmer.id, is_active=True).count()
  healthy_livestock = Livestock.query.filter_by(farmer_id=farmer.id, is_active=True, health_status='healthy').count()
  under_treatment = Livestock.query.filter_by(farmer_id=farmer.id, is_active=True, health_status='under_treatment').count()

  active_alerts = Alert.query.filter_by(farmer_id=farmer.id, status='unread').count()
  thirty_days_ago = datetime.now(timezone.utc) - timedelta(days=30)
  recent_amu = AntimicrobialRecord.query.join(Livestock).filter(
    Livestock.farmer_id == farmer.id,
    AntimicrobialRecord.created_at >= thirty_days_ago
  ).count()

  ai_insights = None
  if total_livestock > 0:
    farmer_data = {
      'farm_type': farmer.farm_type,
      'total_livestock': total_livestock,
      'active_alerts': active_alerts,
      'recent_amu_count': recent_amu
    }
    insights_result = gemini_service.farmer_dashboard_insights(farmer_data)
    if insights_result.get('success'): ai_insights = insights_result.get('insights')
  
  return jsonify({
    'farm_name': farmer.farm_name,
    'farm_type': farmer.farm_type,
    'total_livestock': total_livestock,
    'healthy_livestock': healthy_livestock,
    'under_treatment': under_treatment,
    'active_alerts': active_alerts,
    'recent_amu_count': recent_amu,
    'ai_insights': ai_insights
  }), 200

@dashboard_bp.route('/veterinary', methods=['GET'])
@verify_firebase_token
@require_role('veterinary')
@require_profile_complete
def veterinary_dashboard():
  vet = g.current_user.veterinarian
  if not vet: return jsonify({'error': 'Veterinary profile not found'}), 400

  assigned_farms = Farmer.query.filter_by(primary_veterinarian_id=vet.id).count()
  pending_consultations = ConsultationRequest.query.filter_by(veterinarian_id=vet.id, status='pending').count()
  # thirty_days_ago = datetime.now(timezone.utc) - timedelta(days=30)
  recent_prescriptions = db.session.query(func.count()).filter(
    and_(
      db.session.query(1).filter(
        db.session.query(1).correlate(None)
      ).exists()
    )
  ).scalar() or 0

  pending_requests = ConsultationRequest.query.filter_by( veterinarian_id=vet.id, status='pending' ).order_by(ConsultationRequest.created_at.desc()).limit(5).all()

  requests_list = [{
    'id': req.id,
    'farmer_id': req.farmer_id,
    'livestock_id': req.livestock_id,
    'request_type': req.request_type,
    'description': req.description,
    'preferred_date': req.preferred_date.isoformat() if req.preferred_date else None,
    'created_at': req.created_at.isoformat()
  } for req in pending_requests]

  return jsonify({
    'clinic_name': vet.clinic_hospital_name,
    'specialization': vet.specialization,
    'assigned_farms': assigned_farms,
    'pending_consultations': pending_consultations,
    'recent_prescriptions': recent_prescriptions,
    'pending_requests': requests_list
  }), 200

@dashboard_bp.route('/government', methods=['GET'])
@verify_firebase_token
@require_role('government')
@require_profile_complete
def government_dashboard():
  gov_official = g.current_user.government_official
  if not gov_official: return jsonify({'error': 'Government official profile not found'}), 400
  jurisdiction = gov_official.jurisdiction_district or gov_official.jurisdiction_state  
  if gov_official.jurisdiction_district:
    total_farms = Farmer.query.filter_by(district=gov_official.jurisdiction_district).count()
    total_livestock = db.session.query(func.count(Livestock.id)).join(Farmer).filter(Farmer.district == gov_official.jurisdiction_district).scalar()
  elif gov_official.jurisdiction_state:
    total_farms = Farmer.query.filter_by(state=gov_official.jurisdiction_state).count()
    total_livestock = db.session.query(func.count(Livestock.id)).join(Farmer).filter(Farmer.state == gov_official.jurisdiction_state).scalar()
  else:
    total_farms = Farmer.query.count()
    total_livestock = Livestock.query.count()

  thirty_days_ago = datetime.now(timezone.utc) - timedelta(days=30)
  recent_violations = Alert.query.filter(Alert.alert_type == 'mrl_breach', Alert.created_at >= thirty_days_ago).count()
  compliance_rate = 95.0
  if total_farms > 0:
    farms_with_violations = db.session.query(func.count(func.distinct(Alert.farmer_id))).filter(Alert.alert_type == 'mrl_breach', Alert.created_at >= thirty_days_ago).scalar() or 0
    compliance_rate = ((total_farms - farms_with_violations) / total_farms) * 100

  regional_data = {
    'total_farms': total_farms,
    'total_livestock': total_livestock,
    'amu_usage_count': 0,
    'mrl_violations_count': recent_violations,
    'compliance_rate': round(compliance_rate, 2)
  }

  ai_insights = None
  if total_farms > 0:
    insights_result = gemini_service.analyze_amu_trends(regional_data)
    if insights_result.get('success'): ai_insights = insights_result.get('insights')

  species_distribution = db.session.query(
    Livestock.species,
    func.count(Livestock.id)
  ).filter(Livestock.is_active == True).group_by(Livestock.species).all()

  species_data = {species: count for species, count in species_distribution}

  return jsonify({
    'jurisdiction': jurisdiction,
    'department': gov_official.department_name,
    'total_farms': total_farms,
    'total_livestock': total_livestock,
    'recent_violations': recent_violations,
    'compliance_rate': round(compliance_rate, 2),
    'species_distribution': species_data,
    'ai_insights': ai_insights
  }), 200

@dashboard_bp.route('/researcher', methods=['GET'])
@verify_firebase_token
@require_role('researcher')
@require_profile_complete
def researcher_dashboard():
  researcher = g.current_user.researcher
  if not researcher: return jsonify({'error': 'Researcher profile not found'}), 400

  pending_requests = DataRequest.query.filter_by( researcher_id=researcher.id, status='pending' ).count()
  approved_requests = DataRequest.query.filter_by( researcher_id=researcher.id, status='approved' ).count()
  fulfilled_requests = DataRequest.query.filter_by( researcher_id=researcher.id, status='fulfilled' ).count()
  recent_requests = DataRequest.query.filter_by( researcher_id=researcher.id ).order_by(DataRequest.created_at.desc()).limit(5).all()
  requests_list = [{
    'id': req.id,
    'title': req.request_title,
    'status': req.status,
    'created_at': req.created_at.isoformat(),
    'approved_at': req.approved_at.isoformat() if req.approved_at else None
  } for req in recent_requests]

  return jsonify({
    'institution': researcher.institution_name,
    'project': researcher.project_name,
    'pending_requests': pending_requests,
    'approved_requests': approved_requests,
    'fulfilled_requests': fulfilled_requests,
    'recent_requests': requests_list
  }), 200