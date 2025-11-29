from datetime import datetime
from ..database import db
from sqlalchemy.dialects.mysql import JSON

class WithdrawalPeriod(db.Model):
  __tablename__ = 'withdrawal_periods'

  id = db.Column(db.Integer, primary_key=True)
  drug_name = db.Column(db.String(255), nullable=False, index=True)
  active_ingredient = db.Column(db.String(255))
  species = db.Column(db.Enum('cattle', 'buffalo', 'goat', 'sheep', 'pig', 'poultry', name='species_type'), nullable=False, index=True)
  withdrawal_period_days = db.Column(db.Integer, nullable=False)
  mrl_value = db.Column(db.Float)
  mrl_unit = db.Column(db.String(20))
  tissue_type = db.Column(db.Enum('meat', 'milk', 'eggs', 'honey', name='tissue_type'), nullable=False)
  reference_source = db.Column(db.String(255))
  created_at = db.Column(db.DateTime, default=datetime.utcnow)
  updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

  __table_args__ = (db.Index('idx_drug_species_tissue', 'drug_name', 'species', 'tissue_type'),)

  def __repr__(self):
    return f'<WithdrawalPeriod {self.drug_name} - {self.species} - {self.tissue_type}>'

class Alert(db.Model):
  __tablename__ = 'alerts'

  id = db.Column(db.Integer, primary_key=True)
  livestock_id = db.Column(db.Integer, db.ForeignKey('livestock.id'), index=True)
  farmer_id = db.Column(db.Integer, db.ForeignKey('farmers.id'), nullable=False, index=True)
  veterinarian_id = db.Column(db.Integer, db.ForeignKey('veterinarians.id'))
  alert_type = db.Column(db.Enum('excessive_use', 'withdrawal_period', 'mrl_breach', 'health_critical', 'prescription_expired', 'consultation_request', name='alert_type'), nullable=False)
  severity = db.Column(db.Enum('low', 'medium', 'high', 'critical', name='severity'), default='medium')
  title = db.Column(db.String(255), nullable=False)
  message = db.Column(db.Text, nullable=False)
  status = db.Column(db.Enum('unread', 'read', 'acknowledged', 'resolved', name='alert_status'), default='unread', index=True)
  metadata = db.Column(JSON)
  acknowledged_at = db.Column(db.DateTime)
  resolved_at = db.Column(db.DateTime)
  created_at = db.Column(db.DateTime, default=datetime.utcnow, index=True)

  def __repr__(self):
    return f'<Alert {self.alert_type} - {self.severity}>'

class TraceabilityLog(db.Model):
  __tablename__ = 'traceability_logs'

  id = db.Column(db.Integer, primary_key=True)
  livestock_id = db.Column(db.Integer, db.ForeignKey('livestock.id'), nullable=False, index=True)
  event_type = db.Column(db.String(100), nullable=False)
  event_data = db.Column(JSON)
  performed_by = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  timestamp = db.Column(db.DateTime, default=datetime.utcnow, nullable=False, index=True)
  hash_value = db.Column(db.String(64))
  previous_hash = db.Column(db.String(64))
  ip_address = db.Column(db.String(45))

  def __repr__(self):
    return f'<TraceabilityLog {self.event_type} for Livestock {self.livestock_id}>'

class DataRequest(db.Model):
  __tablename__ = 'data_requests'

  id = db.Column(db.Integer, primary_key=True)
  researcher_id = db.Column(db.Integer, db.ForeignKey('researchers.id'), nullable=False, index=True)
  request_title = db.Column(db.String(255), nullable=False)
  request_description = db.Column(db.Text)
  data_type_requested = db.Column(JSON)
  regions_requested = db.Column(JSON)
  species_requested = db.Column(JSON)
  date_range_start = db.Column(db.Date)
  date_range_end = db.Column(db.Date)
  justification = db.Column(db.Text)
  status = db.Column(db.Enum('pending', 'approved', 'rejected', 'fulfilled', name='data_request_status'), default='pending', index=True)
  reviewed_by = db.Column(db.Integer, db.ForeignKey('users.id'))
  review_notes = db.Column(db.Text)
  approved_at = db.Column(db.DateTime)
  data_access_url = db.Column(db.String(500))
  created_at = db.Column(db.DateTime, default=datetime.utcnow, index=True)
  updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

  def __repr__(self):
    return f'<DataRequest {self.request_title} - {self.status}>'

class InspectionLog(db.Model):
  __tablename__ = 'inspection_logs'

  id = db.Column(db.Integer, primary_key=True)
  inspector_id = db.Column(db.Integer, db.ForeignKey('government_officials.id'), nullable=False, index=True)
  farmer_id = db.Column(db.Integer, db.ForeignKey('farmers.id'), nullable=False, index=True)
  inspection_date = db.Column(db.Date, nullable=False, index=True)
  inspection_type = db.Column(db.Enum('routine', 'complaint', 'follow_up', 'random', name='inspection_type'))
  findings = db.Column(db.Text)
  compliance_status = db.Column(db.Enum('compliant', 'minor_issues', 'major_violations', name='compliance_status'))
  violations_found = db.Column(JSON)
  recommendations = db.Column(db.Text)
  attachments = db.Column(JSON)
  follow_up_required = db.Column(db.Boolean, default=False)
  follow_up_date = db.Column(db.Date)
  created_at = db.Column(db.DateTime, default=datetime.utcnow)

  def __repr__(self):
    return f'<InspectionLog {self.id} on {self.inspection_date}>'

class RegionalAnalytics(db.Model):
  __tablename__ = 'regional_analytics'

  id = db.Column(db.Integer, primary_key=True)
  region = db.Column(db.String(100), nullable=False, index=True)
  state = db.Column(db.String(100), index=True)
  district = db.Column(db.String(100), index=True)
  analysis_date = db.Column(db.Date, nullable=False, index=True)
  total_farms = db.Column(db.Integer, default=0)
  total_livestock = db.Column(db.Integer, default=0)
  amu_usage_count = db.Column(db.Integer, default=0)
  mrl_violations_count = db.Column(db.Integer, default=0)
  compliance_rate = db.Column(db.Float)
  analytics_data = db.Column(JSON)
  ai_insights = db.Column(db.Text)
  generated_at = db.Column(db.DateTime, default=datetime.utcnow)

  __table_args__ = (db.Index('idx_region_date', 'region', 'analysis_date'),)

  def __repr__(self):
    return f'<RegionalAnalytics {self.region} - {self.analysis_date}>'