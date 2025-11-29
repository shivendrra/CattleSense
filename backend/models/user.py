from datetime import datetime
from ..database import db
from sqlalchemy.dialects.mysql import JSON

class User(db.Model):
  __tablename__ = 'users'
  
  id = db.Column(db.Integer, primary_key=True)
  firebase_uid = db.Column(db.String(128), unique=True, nullable=False, index=True)
  email = db.Column(db.String(255), unique=True, nullable=False, index=True)
  role = db.Column(db.Enum('farmer', 'veterinary', 'inspector', 'consumer', name='user_roles'), nullable=False)
  phone = db.Column(db.String(20))
  is_active = db.Column(db.Boolean, default=True)
  created_at = db.Column(db.DateTime, default=datetime.utcnow)
  updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
  
  farmer = db.relationship('Farmer', backref='user', uselist=False, cascade='all, delete-orphan')
  veterinarian = db.relationship('Veterinarian', backref='user', uselist=False, cascade='all, delete-orphan')
  
  def __repr__(self):
    return f'<User {self.email} - {self.role}>'

class Farmer(db.Model):
  __tablename__ = 'farmers'
  
  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False, index=True)
  farm_name = db.Column(db.String(255))
  location = db.Column(db.String(255))
  region = db.Column(db.String(100), index=True)
  state = db.Column(db.String(100))
  district = db.Column(db.String(100))
  pincode = db.Column(db.String(10))
  registration_number = db.Column(db.String(100), unique=True)
  farm_size_acres = db.Column(db.Float)
  created_at = db.Column(db.DateTime, default=datetime.utcnow)
  
  livestock = db.relationship('Livestock', backref='farmer', lazy='dynamic', cascade='all, delete-orphan')
  
  def __repr__(self):
    return f'<Farmer {self.farm_name}>'

class Veterinarian(db.Model):
  __tablename__ = 'veterinarians'
  
  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False, index=True)
  license_number = db.Column(db.String(100), unique=True, nullable=False, index=True)
  specialization = db.Column(db.String(255))
  qualification = db.Column(db.String(255))
  verification_status = db.Column(db.Enum('pending', 'verified', 'rejected', name='verification_status'), default='pending')
  verified_at = db.Column(db.DateTime)
  created_at = db.Column(db.DateTime, default=datetime.utcnow)
  
  prescriptions = db.relationship('Prescription', backref='veterinarian', lazy='dynamic')
  
  def __repr__(self):
    return f'<Veterinarian {self.license_number}>'

class Livestock(db.Model):
  __tablename__ = 'livestock'
  
  id = db.Column(db.Integer, primary_key=True)
  rfid_tag = db.Column(db.String(50), unique=True, nullable=False, index=True)
  farmer_id = db.Column(db.Integer, db.ForeignKey('farmers.id', ondelete='CASCADE'), nullable=False, index=True)
  species = db.Column(db.Enum('cattle', 'buffalo', 'goat', 'sheep', 'pig', 'poultry', name='species_type'), nullable=False, index=True)
  breed = db.Column(db.String(100))
  gender = db.Column(db.Enum('male', 'female', name='gender_type'))
  date_of_birth = db.Column(db.Date)
  parent_id = db.Column(db.Integer, db.ForeignKey('livestock.id'))
  health_status = db.Column(db.Enum('healthy', 'sick', 'under_treatment', 'quarantine', 'deceased', name='health_status'), default='healthy')
  current_stage = db.Column(db.Enum('calf', 'juvenile', 'adult', 'breeding', 'production', name='life_stage'))
  weight_kg = db.Column(db.Float)
  is_active = db.Column(db.Boolean, default=True)
  created_at = db.Column(db.DateTime, default=datetime.utcnow)
  updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
  
  offspring = db.relationship('Livestock', backref=db.backref('parent', remote_side=[id]))
  antimicrobial_records = db.relationship('AntimicrobialRecord', backref='livestock', lazy='dynamic', cascade='all, delete-orphan')
  health_records = db.relationship('HealthRecord', backref='livestock', lazy='dynamic', cascade='all, delete-orphan')
  traceability_logs = db.relationship('TraceabilityLog', backref='livestock', lazy='dynamic', cascade='all, delete-orphan')
  
  def __repr__(self):
    return f'<Livestock {self.rfid_tag} - {self.species}>'