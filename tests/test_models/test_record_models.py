import pytest
from ...backend.models.records import WithdrawalPeriod, Alert, TraceabilityLog, DataRequest, InspectionLog, RegionalAnalytics
from datetime import datetime, timedelta
import hashlib, json

class TestWithdrawalPeriodModel:
  def test_create_withdrawal_period(self, session):
    withdrawal = WithdrawalPeriod(
      drug_name='Amoxicillin',
      active_ingredient='Amoxicillin',
      species='cattle',
      withdrawal_period_days=14,
      mrl_value=0.01,
      mrl_unit='mg/kg',
      tissue_type='milk',
      reference_source='FSSAI'
    )
    session.add(withdrawal)
    session.commit()
    
    assert withdrawal.id is not None
    assert withdrawal.drug_name == 'Amoxicillin'
    assert withdrawal.withdrawal_period_days == 14
    assert withdrawal.mrl_value == 0.01
  
  def test_withdrawal_period_composite_index(self, session):
    withdrawal1 = WithdrawalPeriod(drug_name='Drug1', species='cattle', withdrawal_period_days=7, tissue_type='milk')
    withdrawal2 = WithdrawalPeriod(drug_name='Drug1', species='cattle', withdrawal_period_days=14, tissue_type='meat')
    session.add_all([withdrawal1, withdrawal2])
    session.commit()
    
    results = session.query(WithdrawalPeriod).filter_by(drug_name='Drug1', species='cattle').all()
    assert len(results) == 2
  
  def test_withdrawal_period_species_enum(self, session):
    species_list = ['cattle', 'buffalo', 'goat', 'sheep', 'pig', 'poultry']
    
    for species in species_list:
      withdrawal = WithdrawalPeriod(drug_name=f'Drug{species}', species=species, withdrawal_period_days=7, tissue_type='meat')
      session.add(withdrawal)
    session.commit()
    
    assert session.query(WithdrawalPeriod).count() == 6
  
  def test_withdrawal_period_tissue_types(self, session):
    tissue_types = ['meat', 'milk', 'eggs', 'honey']
    
    for tissue in tissue_types:
      withdrawal = WithdrawalPeriod(drug_name='TestDrug', species='cattle', withdrawal_period_days=7, tissue_type=tissue)
      session.add(withdrawal)
    session.commit()
    
    assert session.query(WithdrawalPeriod).count() == 4

class TestAlertModel:
  def test_create_alert(self, session, create_farmer, create_livestock):
    farmer = create_farmer()
    livestock = create_livestock(farmer=farmer)
    
    alert = Alert(
      livestock_id=livestock.id,
      farmer_id=farmer.id,
      alert_type='excessive_use',
      severity='high',
      title='Excessive drug use detected',
      message='Drug used 3+ times in 30 days',
      status='unread'
    )
    session.add(alert)
    session.commit()
    
    assert alert.id is not None
    assert alert.alert_type == 'excessive_use'
    assert alert.severity == 'high'
    assert alert.status == 'unread'
  
  def test_alert_types(self, session, create_farmer):
    farmer = create_farmer()
    alert_types = ['excessive_use', 'withdrawal_period', 'mrl_breach', 'health_critical', 'prescription_expired', 'consultation_request']
    
    for alert_type in alert_types:
      alert = Alert(farmer_id=farmer.id, alert_type=alert_type, severity='medium', title=f'Test {alert_type}', message='Test', status='unread')
      session.add(alert)
    session.commit()
    
    assert session.query(Alert).count() == 6
  
  def test_alert_severity_levels(self, session, create_farmer):
    farmer = create_farmer()
    severities = ['low', 'medium', 'high', 'critical']
    
    for severity in severities:
      alert = Alert(farmer_id=farmer.id, alert_type='excessive_use', severity=severity, title='Test', message='Test', status='unread')
      session.add(alert)
    session.commit()
    
    critical_alerts = session.query(Alert).filter_by(severity='critical').count()
    assert critical_alerts == 1
  
  def test_alert_status_workflow(self, session, create_farmer):
    farmer = create_farmer()
    alert = Alert(farmer_id=farmer.id, alert_type='excessive_use', severity='high', title='Test', message='Test', status='unread')
    session.add(alert)
    session.commit()
    
    assert alert.status == 'unread'
    
    alert.status = 'read'
    session.commit()
    assert alert.status == 'read'
    
    alert.status = 'acknowledged'
    alert.acknowledged_at = datetime.utcnow()
    session.commit()
    assert alert.status == 'acknowledged'
    assert alert.acknowledged_at is not None
    
    alert.status = 'resolved'
    alert.resolved_at = datetime.utcnow()
    session.commit()
    assert alert.status == 'resolved'
    assert alert.resolved_at is not None

class TestTraceabilityLogModel:
  def test_create_traceability_log(self, session, create_livestock, create_user):
    livestock = create_livestock()
    user = create_user()
    
    event_data = {'rfid_tag': livestock.rfid_tag, 'species': livestock.species}
    hash_data = {'livestock_id': livestock.id, 'event_type': 'livestock_registered', 'event_data': event_data, 'timestamp': datetime.utcnow().isoformat(), 'previous_hash': '0'}
    hash_value = hashlib.sha256(json.dumps(hash_data, sort_keys=True).encode()).hexdigest()
    
    log = TraceabilityLog(
      livestock_id=livestock.id,
      event_type='livestock_registered',
      event_data=event_data,
      performed_by=user.id,
      hash_value=hash_value,
      previous_hash='0'
    )
    session.add(log)
    session.commit()
    
    assert log.id is not None
    assert log.event_type == 'livestock_registered'
    assert log.hash_value == hash_value
    assert log.previous_hash == '0'
  
  def test_traceability_chain(self, session, create_livestock, create_user):
    livestock = create_livestock()
    user = create_user()
    
    log1 = TraceabilityLog(livestock_id=livestock.id, event_type='event1', event_data={}, performed_by=user.id, hash_value='hash1', previous_hash='0')
    session.add(log1)
    session.commit()
    
    log2 = TraceabilityLog(livestock_id=livestock.id, event_type='event2', event_data={}, performed_by=user.id, hash_value='hash2', previous_hash='hash1')
    session.add(log2)
    session.commit()
    
    log3 = TraceabilityLog(livestock_id=livestock.id, event_type='event3', event_data={}, performed_by=user.id, hash_value='hash3', previous_hash='hash2')
    session.add(log3)
    session.commit()
    
    logs = session.query(TraceabilityLog).filter_by(livestock_id=livestock.id).order_by(TraceabilityLog.timestamp).all()
    assert len(logs) == 3
    assert logs[0].previous_hash == '0'
    assert logs[1].previous_hash == logs[0].hash_value
    assert logs[2].previous_hash == logs[1].hash_value

class TestDataRequestModel:
  def test_create_data_request(self, session, create_user):
    user = create_user(role='researcher')
    from ...backend.models.user import Researcher
    researcher = Researcher(user_id=user.id, institution_name='Test University', project_name='AMR Study')
    session.add(researcher)
    session.commit()
    
    data_request = DataRequest(
      researcher_id=researcher.id,
      request_title='AMU Data Request',
      request_description='Need data for research',
      data_type_requested=['amu_records', 'livestock_data'],
      regions_requested=['Maharashtra'],
      species_requested=['cattle'],
      status='pending'
    )
    session.add(data_request)
    session.commit()
    
    assert data_request.id is not None
    assert data_request.request_title == 'AMU Data Request'
    assert data_request.status == 'pending'
  
  def test_data_request_status_workflow(self, session, create_user):
    user = create_user(role='researcher')
    from ...backend.models.user import Researcher
    researcher = Researcher(user_id=user.id, institution_name='Test', project_name='Test')
    session.add(researcher)
    session.commit()
    
    data_request = DataRequest(researcher_id=researcher.id, request_title='Test', status='pending')
    session.add(data_request)
    session.commit()
    
    assert data_request.status == 'pending'
    
    data_request.status = 'approved'
    data_request.approved_at = datetime.utcnow()
    session.commit()
    assert data_request.status == 'approved'
    assert data_request.approved_at is not None

class TestInspectionLogModel:
  def test_create_inspection_log(self, session, create_user, create_farmer):
    user = create_user(role='government')
    from ...backend.models.user import GovernmentOfficial
    gov = GovernmentOfficial(user_id=user.id, government_id='GOV123', department_name='Animal Husbandry')
    session.add(gov)
    session.commit()
    
    farmer = create_farmer()
    
    inspection = InspectionLog(
      inspector_id=gov.id,
      farmer_id=farmer.id,
      inspection_date=datetime.utcnow().date(),
      inspection_type='routine',
      findings='All compliant',
      compliance_status='compliant'
    )
    session.add(inspection)
    session.commit()
    
    assert inspection.id is not None
    assert inspection.inspection_type == 'routine'
    assert inspection.compliance_status == 'compliant'
  
  def test_inspection_types(self, session, create_user, create_farmer):
    user = create_user(role='government')
    from ...backend.models.user import GovernmentOfficial
    gov = GovernmentOfficial(user_id=user.id, government_id='GOV123', department_name='Test')
    session.add(gov)
    session.commit()
    
    farmer = create_farmer()
    inspection_types = ['routine', 'complaint', 'follow_up', 'random']
    
    for insp_type in inspection_types:
      inspection = InspectionLog(inspector_id=gov.id, farmer_id=farmer.id, inspection_date=datetime.utcnow().date(), inspection_type=insp_type)
      session.add(inspection)
    session.commit()
    
    assert session.query(InspectionLog).count() == 4

class TestRegionalAnalyticsModel:
  def test_create_regional_analytics(self, session):
    analytics = RegionalAnalytics(
      region='West Maharashtra',
      state='Maharashtra',
      district='Pune',
      analysis_date=datetime.utcnow().date(),
      total_farms=100,
      total_livestock=1500,
      amu_usage_count=250,
      mrl_violations_count=5,
      compliance_rate=95.0,
      analytics_data={'trend': 'improving'}
    )
    session.add(analytics)
    session.commit()
    
    assert analytics.id is not None
    assert analytics.total_farms == 100
    assert analytics.compliance_rate == 95.0
  
  def test_regional_analytics_index(self, session):
    analytics1 = RegionalAnalytics(region='West', analysis_date=datetime.utcnow().date(), state='Maharashtra', district='Pune')
    analytics2 = RegionalAnalytics(region='West', analysis_date=(datetime.utcnow() - timedelta(days=30)).date(), state='Maharashtra', district='Pune')
    session.add_all([analytics1, analytics2])
    session.commit()
    
    results = session.query(RegionalAnalytics).filter_by(region='West').all()
    assert len(results) == 2