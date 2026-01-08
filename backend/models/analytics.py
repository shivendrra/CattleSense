from extensions import db
from datetime import datetime, timezone

class RegionalAnalytics(db.Model):
  __tablename__ = 'regional_analytics'

  id = db.Column(db.Integer, primary_key=True)
  region = db.Column(db.String(100), nullable=False, index=True)
  state, district = db.Column(db.String(100), index=True), db.Column(db.String(100), index=True)
  analysis_date = db.Column(db.Date, nullable=False, index=True)
  total_farms, total_livestock = db.Column(db.Integer, default=0), db.Column(db.Integer, default=0)
  amu_usage_count, mrl_violations_count = db.Column(db.Integer, default=0), db.Column(db.Integer, default=0)
  compliance_rate = db.Column(db.Float)
  analytics_data = db.Column(db.JSON)
  ai_insights = db.Column(db.Text)
  generated_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))

  __table_args__ = (db.Index('idx_region_date', 'region', 'analysis_date'),)

  def __repr__(self):
    return f'<RegionalAnalytics {self.region} - {self.analysis_date}>'

class DataRequest(db.Model):
  __tablename__ = 'data_requests'

  id = db.Column(db.Integer, primary_key=True)
  researcher_id = db.Column(db.Integer, db.ForeignKey('researchers.id'), nullable=False, index=True)
  request_title = db.Column(db.String(255), nullable=False)
  request_description = db.Column(db.Text)
  data_type_requested = db.Column(db.JSON)
  regions_requested = db.Column(db.JSON)
  species_requested = db.Column(db.JSON)
  date_range_start, date_range_end = db.Column(db.Date), db.Column(db.Date)
  justification = db.Column(db.Text)
  status = db.Column(db.Enum('pending', 'approved', 'rejected', 'fulfilled', name='data_request_status'), default='pending', index=True)
  reviewed_by = db.Column(db.Integer, db.ForeignKey('users.id'))
  review_notes = db.Column(db.Text)
  approved_at = db.Column(db.DateTime)
  data_access_url = db.Column(db.String(500))
  created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc), index=True)
  updated_at = db.Column(db.DateTime, default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc))

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
  violations_found = db.Column(db.JSON)
  recommendations = db.Column(db.Text)
  attachments = db.Column(db.JSON)
  follow_up_required = db.Column(db.Boolean, default=False)
  follow_up_date = db.Column(db.Date)
  created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))

  def __repr__(self):
    return f'<InspectionLog {self.id} on {self.inspection_date}>'