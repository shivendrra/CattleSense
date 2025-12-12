from datetime import datetime, timezone
from ..extensions import db

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
  created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))
  updated_at = db.Column(db.DateTime, default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc))

  offspring = db.relationship('Livestock', backref=db.backref('parent', remote_side=[id]))
  antimicrobial_records = db.relationship('AntimicrobialRecord', backref='livestock', lazy='dynamic', cascade='all, delete-orphan')
  health_records = db.relationship('HealthRecord', backref='livestock', lazy='dynamic', cascade='all, delete-orphan')
  traceability_logs = db.relationship('TraceabilityLog', backref='livestock', lazy='dynamic', cascade='all, delete-orphan')
  prescriptions = db.relationship('Prescription', backref='livestock', lazy='dynamic')
  alerts = db.relationship('Alert', backref='livestock', lazy='dynamic')

  def __repr__(self):
    return f'<Livestock {self.rfid_tag} - {self.species}>'

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
  created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))

  def __repr__(self):
    return f'<HealthRecord for Livestock {self.livestock_id} on {self.record_date}>'