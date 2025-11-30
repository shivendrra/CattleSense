import pytest, os
from datetime import datetime, timedelta
from ..backend.index import create_app
from ..backend.database import db
from ..backend.models.user import User, Farmer, Veterinarian, GovernmentOfficial, Researcher
from ..backend.models.functional import Livestock, AntimicrobialRecord, Prescription, HealthRecord, ConsultationRequest
from ..backend.models.records import WithdrawalPeriod, Alert, TraceabilityLog, DataRequest, InspectionLog, RegionalAnalytics
from ..backend.utils.encryption import aadhaar_encryption

@pytest.fixture(scope='session')
def app():
  os.environ['FLASK_ENV'] = 'testing'
  app = create_app('testing')
  app.config['TESTING'] = True
  app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:password@localhost:3306/cattlesense_test'
  return app

@pytest.fixture(scope='session')
def _db(app):
  with app.app_context():
    db.create_all()
    yield db
    db.session.remove()
    db.drop_all()

@pytest.fixture(scope='function')
def session(_db, app):
  with app.app_context():
    connection = _db.engine.connect()
    transaction = connection.begin()
    session = _db.session
    yield session
    transaction.rollback()
    connection.close()
    session.remove()

@pytest.fixture
def sample_user_data():
  return {
    'firebase_uid': 'test_firebase_uid_123',
    'email': 'test@example.com',
    'name': 'Test User',
    'role': 'farmer',
    'phone': '+919876543210'
  }

@pytest.fixture
def sample_farmer_data():
  return {
    'farm_name': 'Test Farm',
    'farm_address': 'Test Address',
    'region': 'West',
    'state': 'Maharashtra',
    'district': 'Pune',
    'pincode': '411001',
    'farm_size_acres': 25.5,
    'farm_type': 'dairy'
  }

@pytest.fixture
def sample_vet_data():
  return {
    'license_number': 'VET123456',
    'specialization': 'Large Animals',
    'qualification': 'BVSc & AH',
    'alma_mater': 'Veterinary College',
    'years_of_experience': 10,
    'age': 35,
    'clinic_hospital_name': 'Test Clinic',
    'state': 'Maharashtra',
    'district': 'Pune'
  }

@pytest.fixture
def sample_livestock_data():
  return {
    'rfid_tag': 'RFID001234',
    'species': 'cattle',
    'breed': 'Holstein',
    'name': 'Bessie',
    'gender': 'female',
    'date_of_birth': datetime(2020, 5, 15).date(),
    'age_months': 36,
    'weight_kg': 450.0,
    'production_type': 'milk',
    'milk_production_liters_daily': 25.0,
    'health_status': 'healthy'
  }

@pytest.fixture
def sample_amu_data():
  return {
    'drug_name': 'Amoxicillin',
    'drug_category': 'Antibiotic',
    'active_ingredient': 'Amoxicillin',
    'dosage': 10.0,
    'unit': 'mg',
    'administration_route': 'injection',
    'start_date': datetime.utcnow().date(),
    'duration_days': 7,
    'frequency': 'Once daily',
    'reason': 'Bacterial infection'
  }

@pytest.fixture
def create_user(session):
  def _create_user(role='farmer', **kwargs):
    user_data = {
      'firebase_uid': f'firebase_{role}_123',
      'email': f'{role}@test.com',
      'name': f'Test {role.capitalize()}',
      'role': role,
      'phone': '+919876543210',
      'is_active': True,
      'is_profile_complete': False,
      'onboarding_step': 0
    }
    user_data.update(kwargs)
    user = User(**user_data)
    session.add(user)
    session.commit()
    return user
  return _create_user

@pytest.fixture
def create_farmer(session, create_user):
  def _create_farmer(**kwargs):
    user = create_user(role='farmer')
    farmer_data = {
      'user_id': user.id,
      'farm_name': 'Test Farm',
      'state': 'Maharashtra',
      'district': 'Pune',
      'farm_type': 'dairy'
    }
    farmer_data.update(kwargs)
    farmer = Farmer(**farmer_data)
    session.add(farmer)
    session.commit()
    return farmer
  return _create_farmer

@pytest.fixture
def create_veterinarian(session, create_user):
  def _create_veterinarian(**kwargs):
    user = create_user(role='veterinary')
    vet_data = {
      'user_id': user.id,
      'license_number': f'VET{datetime.utcnow().timestamp()}',
      'specialization': 'Large Animals',
      'state': 'Maharashtra',
      'district': 'Pune'
    }
    vet_data.update(kwargs)
    vet = Veterinarian(**vet_data)
    session.add(vet)
    session.commit()
    return vet
  return _create_veterinarian

@pytest.fixture
def create_livestock(session, create_farmer):
  def _create_livestock(farmer=None, **kwargs):
    if not farmer: farmer = create_farmer()
    livestock_data = {
      'rfid_tag': f'RFID{datetime.utcnow().timestamp()}',
      'farmer_id': farmer.id,
      'species': 'cattle',
      'breed': 'Holstein',
      'health_status': 'healthy'
    }
    livestock_data.update(kwargs)
    livestock = Livestock(**livestock_data)
    session.add(livestock)
    session.commit()
    return livestock
  return _create_livestock