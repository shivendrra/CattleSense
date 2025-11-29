from datetime import datetime
from ..database import db
from sqlalchemy.dialects.mysql import JSON

class Livestock(db.Model):
  __tablename__ = 'livestock'

  id = db.Column(db.Integer, primary_key=True)
  rfid_tag = db.Column(db.String(50), unique=True, nullable=False, index=True)
  farmer_id = db.Column(db.Integer, db.ForeignKey('farmers.id', ondelete='CASCADE'), nullable=False, index=True)
  species = db.Column(db.Enum('cattle', 'buffalo', 'goat', 'sheep', 'pig', 'poultry', name='species_type'), nullable=False, index=True)
  breed = db.Column(db.String(100))
  name = db.Column(db.String(100))
  gender = db.Column(db.Enum('male', 'female', name='gender_type'))
  date_of_birth = db.Column(db.Date)
  age_months = db.Column(db.Integer)
  parent_id = db.Column(db.Integer, db.ForeignKey('livestock.id'))
  health_status = db.Column(db.Enum('healthy', 'sick', 'under_treatment', 'quarantine', 'deceased', name='health_status'), default='healthy')
  current_stage = db.Column(db.Enum('calf', 'juvenile', 'adult', 'breeding', 'production', name='life_stage'))
  weight_kg = db.Column(db.Float)
  production_type = db.Column(db.Enum('milk', 'meat', 'eggs', 'breeding', 'dual_purpose', name='production_type'))
  milk_production_liters_daily = db.Column(db.Float)
  egg_production_daily = db.Column(db.Integer)
  image_url = db.Column(db.String(500))
  is_active = db.Column(db.Boolean, default=True)
  created_at = db.Column(db.DateTime, default=datetime.utcnow)
  updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

  offspring = db.relationship('Livestock', backref=db.backref('parent', remote_side=[id]))
  antimicrobial_records = db.relationship('AntimicrobialRecord', backref='livestock', lazy='dynamic', cascade='all, delete-orphan')
  health_records = db.relationship('HealthRecord', backref='livestock', lazy='dynamic', cascade='all, delete-orphan')
  traceability_logs = db.relationship('TraceabilityLog', backref='livestock', lazy='dynamic', cascade='all, delete-orphan')

  def __repr__(self):
    return f'<Livestock {self.rfid_tag} - {self.species}>'

class AntimicrobialRecord(db.Model):
  __tablename__ = 'antimicrobial_records'

  id = db.Column(db.Integer, primary_key=True)
  livestock_id = db.Column(db.Integer, db.ForeignKey('livestock.id', ondelete='CASCADE'), nullable=False, index=True)
  prescription_id = db.Column(db.Integer, db.ForeignKey('prescriptions.id'))
  drug_name = db.Column(db.String(255), nullable=False)
  drug_category = db.Column(db.String(100))
  active_ingredient = db.Column(db.String(255))
  dosage = db.Column(db.Float, nullable=False)
  unit = db.Column(db.String(20), nullable=False)
  administration_route = db.Column(db.Enum('oral', 'injection', 'topical', 'feed', 'water', name='admin_route'))
  start_date = db.Column(db.Date, nullable=False, index=True)
  end_date = db.Column(db.Date)
  frequency = db.Column(db.String(50))
  duration_days = db.Column(db.Integer)
  reason = db.Column(db.Text)
  prescribed_by = db.Column(db.Integer, db.ForeignKey('veterinarians.id'), index=True)
  recorded_by = db.Column(db.Integer, db.ForeignKey('users.id'))
  is_verified = db.Column(db.Boolean, default=False)
  verified_at = db.Column(db.DateTime)
  withdrawal_end_date = db.Column(db.Date)
  created_at = db.Column(db.DateTime, default=datetime.utcnow)

  def __repr__(self):
    return f'<AntimicrobialRecord {self.drug_name} for Livestock {self.livestock_id}>'

class Prescription(db.Model):
  __tablename__ = 'prescriptions'

  id = db.Column(db.Integer, primary_key=True)
  veterinarian_id = db.Column(db.Integer, db.ForeignKey('veterinarians.id'), nullable=False, index=True)
  farmer_id = db.Column(db.Integer, db.ForeignKey('farmers.id'), nullable=False)
  livestock_id = db.Column(db.Integer, db.ForeignKey('livestock.id'), nullable=False, index=True)
  prescription_number = db.Column(db.String(100), unique=True)
  prescription_date = db.Column(db.Date, nullable=False, index=True)
  diagnosis = db.Column(db.Text)
  drugs_prescribed = db.Column(JSON)
  notes = db.Column(db.Text)
  follow_up_date = db.Column(db.Date)
  status = db.Column(db.Enum('active', 'completed', 'cancelled', name='prescription_status'), default='active')
  verified_at = db.Column(db.DateTime)
  created_at = db.Column(db.DateTime, default=datetime.utcnow)

  antimicrobial_records = db.relationship('AntimicrobialRecord', backref='prescription', lazy='dynamic')

  def __repr__(self):
    return f'<Prescription {self.prescription_number}>'

class HealthRecord(db.Model):
  __tablename__ = 'health_records'

  id = db.Column(db.Integer, primary_key=True)
  livestock_id = db.Column(db.Integer, db.ForeignKey('livestock.id', ondelete='CASCADE'), nullable=False, index=True)
  record_date = db.Column(db.Date, nullable=False, index=True)
  recorded_by = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  weight_kg = db.Column(db.Float)
  temperature_celsius = db.Column(db.Float)
  symptoms = db.Column(db.Text)
  diagnosis = db.Column(db.Text)
  treatment_given = db.Column(db.Text)
  notes = db.Column(db.Text)
  attachment_url = db.Column(db.String(500))
  created_at = db.Column(db.DateTime, default=datetime.utcnow)

  def __repr__(self):
    return f'<HealthRecord for Livestock {self.livestock_id} on {self.record_date}>'

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
  created_at = db.Column(db.DateTime, default=datetime.utcnow, index=True)
  updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

  def __repr__(self):
    return f'<ConsultationRequest {self.id} - {self.status}>'