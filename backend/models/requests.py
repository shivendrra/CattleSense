from datetime import datetime, timezone
from ..extensions import db

class ConsultationRequest(db.Model):
  __tablename__ = 'consultation_requests'

  id = db.Column(db.Integer, primary_key=True)
  farmer_id = db.Column(db.Integer, db.ForeignKey('farmers.id'), nullable=False, index=True)
  veterinarian_id = db.Column(db.Integer, db.ForeignKey('veterinarians.id'), index=True)
  livestock_id = db.Column(db.Integer, db.ForeignKey('livestock.id'))
  request_type = db.Column(db.Enum('routine_checkup', 'emergency', 'vaccination', 'prescription', 'other', name='request_type'))
  description = db.Column(db.Text)
  preferred_date = db.Column(db.Date)
  status = db.Column(db.Enum('pending', 'accepted', 'completed', 'cancelled', name='consultation_status'), default='pending', index=True)
  response_notes = db.Column(db.Text)
  created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc), index=True)
  updated_at = db.Column(db.DateTime, default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc))

  def __repr__(self):
    return f'<ConsultationRequest {self.id} - {self.status}>'

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
  metadata = db.Column(db.JSON)
  acknowledged_at = db.Column(db.DateTime)
  resolved_at = db.Column(db.DateTime)
  created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc), index=True)

  def __repr__(self):
    return f'<Alert {self.alert_type} - {self.severity}>'

class TraceabilityLog(db.Model):
  __tablename__ = 'traceability_logs'

  id = db.Column(db.Integer, primary_key=True)
  livestock_id = db.Column(db.Integer, db.ForeignKey('livestock.id'), nullable=False, index=True)
  event_type = db.Column(db.String(100), nullable=False)
  event_data = db.Column(db.JSON)
  performed_by = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  timestamp = db.Column(db.DateTime, default=datetime.now(timezone.utc), nullable=False, index=True)
  hash_value = db.Column(db.String(64))
  previous_hash = db.Column(db.String(64))
  ip_address = db.Column(db.String(45))

  def __repr__(self):
    return f'<TraceabilityLog {self.event_type} for Livestock {self.livestock_id}>'