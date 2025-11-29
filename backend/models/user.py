from typing import *
from datetime import datetime
from ..database import db

class User(db.Model):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key=True)
  firebase_uid = db.Column(db.String(128), unique=True, nullable=False, index=True)
  email = db.Column(db.String(255), unique=True, nullable=False, index=True)
  name = db.Column(db.String(255), nullable=False)
  role = db.Column(db.Enum('farmer', 'veterinary', 'government', 'researcher', name='user_roles'), nullable=False)
  profile_image_url = db.Column(db.String(500))
  aadhaar_encrypted = db.Column(db.String(255))
  phone = db.Column(db.String(20))
  is_active = db.Column(db.Boolean, default=True)
  is_profile_complete = db.Column(db.Boolean, default=False)
  onboarding_step = db.Column(db.Integer, default=0)
  created_at = db.Column(db.DateTime, default=datetime.utcnow)
  updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

  farmer = db.relationship('Farmer', backref='user', uselist=False, cascade='all, delete-orphan')
  veterinarian = db.relationship('Veterinarian', backref='user', uselist=False, cascade='all, delete-orphan')
  government_official = db.relationship('GovernmentOfficial', backref='user', uselist=False, cascade='all, delete-orphan')
  researcher = db.relationship('Researcher', backref='user', uselist=False, cascade='all, delete-orphan')

  def __repr__(self):
    return f'<User {self.email} - {self.role}>'

class Farmer(db.Model):
  __tablename__ = 'farmers'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False, unique=True, index=True)
  farm_name = db.Column(db.String(255), nullable=False)
  farm_address = db.Column(db.Text)
  region = db.Column(db.String(100), index=True)
  state = db.Column(db.String(100))
  district = db.Column(db.String(100))
  pincode = db.Column(db.String(10))
  latitude = db.Column(db.Float)
  longitude = db.Column(db.Float)
  registration_number = db.Column(db.String(100), unique=True)
  farm_size_acres = db.Column(db.Float)
  farm_type = db.Column(db.Enum('dairy', 'poultry', 'mixed', 'goat', 'sheep', 'pig', name='farm_type'))
  primary_veterinarian_id = db.Column(db.Integer, db.ForeignKey('veterinarians.id'))
  created_at = db.Column(db.DateTime, default=datetime.utcnow)
  updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

  livestock = db.relationship('Livestock', backref='farmer', lazy='dynamic', cascade='all, delete-orphan')
  prescriptions = db.relationship('Prescription', backref='farmer', lazy='dynamic')
  alerts = db.relationship('Alert', backref='farmer', lazy='dynamic')

  def __repr__(self):
    return f'<Farmer {self.farm_name}>'

class Veterinarian(db.Model):
  __tablename__ = 'veterinarians'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False, unique=True, index=True)
  license_number = db.Column(db.String(100), unique=True, nullable=False, index=True)
  specialization = db.Column(db.String(255))
  qualification = db.Column(db.String(255))
  alma_mater = db.Column(db.String(255))
  years_of_experience = db.Column(db.Integer)
  age = db.Column(db.Integer)
  clinic_hospital_name = db.Column(db.String(255))
  clinic_address = db.Column(db.Text)
  state = db.Column(db.String(100))
  district = db.Column(db.String(100))
  pincode = db.Column(db.String(10))
  consultation_fee = db.Column(db.Float)
  available_for_emergency = db.Column(db.Boolean, default=True)
  verification_status = db.Column(db.Enum('pending', 'verified', 'rejected', name='verification_status'), default='pending')
  verified_at = db.Column(db.DateTime)
  created_at = db.Column(db.DateTime, default=datetime.utcnow)
  updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

  prescriptions = db.relationship('Prescription', backref='veterinarian', lazy='dynamic')
  assigned_farms = db.relationship('Farmer', backref='primary_veterinarian', foreign_keys=[Farmer.primary_veterinarian_id])
  consultation_requests = db.relationship('ConsultationRequest', backref='veterinarian', lazy='dynamic')

  def __repr__(self):
    return f'<Veterinarian {self.license_number}>'

class GovernmentOfficial(db.Model):
  __tablename__ = 'government_officials'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False, unique=True, index=True)
  government_id = db.Column(db.String(100), unique=True, nullable=False, index=True)
  department_name = db.Column(db.String(255), nullable=False)
  department_id = db.Column(db.String(100))
  designation = db.Column(db.String(255))
  jurisdiction_state = db.Column(db.String(100))
  jurisdiction_district = db.Column(db.String(100))
  jurisdiction_regions = db.Column(db.JSON)
  office_address = db.Column(db.Text)
  verification_status = db.Column(db.Enum('pending', 'verified', 'rejected', name='verification_status'), default='pending')
  verified_at = db.Column(db.DateTime)
  created_at = db.Column(db.DateTime, default=datetime.utcnow)
  updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

  inspection_logs = db.relationship('InspectionLog', backref='inspector', lazy='dynamic')

  def __repr__(self):
    return f'<GovernmentOfficial {self.government_id}>'

class Researcher(db.Model):
  __tablename__ = 'researchers'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False, unique=True, index=True)
  institution_name = db.Column(db.String(255), nullable=False)
  institution_type = db.Column(db.Enum('university', 'research_institute', 'government_lab', 'private_org', name='institution_type'))
  role_designation = db.Column(db.String(255))
  project_name = db.Column(db.String(500))
  research_area = db.Column(db.Text)
  verification_status = db.Column(db.Enum('pending', 'verified', 'rejected', name='verification_status'), default='pending')
  verified_at = db.Column(db.DateTime)
  created_at = db.Column(db.DateTime, default=datetime.utcnow)
  updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

  data_requests = db.relationship('DataRequest', backref='researcher', lazy='dynamic')

  def __repr__(self):
    return f'<Researcher {self.institution_name}>'