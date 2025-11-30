import pytest
from ...backend.models.user import User, Farmer, Veterinarian, GovernmentOfficial, Researcher
from ...backend.utils.encryption import aadhaar_encryption
from datetime import datetime

class TestUserModel:
  def test_create_user(self, session, sample_user_data):
    user = User(**sample_user_data)
    session.add(user)
    session.commit()

    assert user.id is not None
    assert user.email == 'test@example.com'
    assert user.role == 'farmer'
    assert user.is_active == True
    assert user.is_profile_complete == False
    assert user.onboarding_step == 0
  
  def test_user_firebase_uid_unique(self, session, sample_user_data):
    user1 = User(**sample_user_data)
    session.add(user1)
    session.commit()
    user2 = User(**{**sample_user_data, 'email': 'other@test.com'})
    session.add(user2)

    with pytest.raises(Exception): session.commit()
  
  def test_user_email_unique(self, session, sample_user_data):
    user1 = User(**sample_user_data)
    session.add(user1)
    session.commit()
    user2 = User(**{**sample_user_data, 'firebase_uid': 'different_uid'})
    session.add(user2)

    with pytest.raises(Exception): session.commit()
  
  def test_user_role_enum(self, session, sample_user_data):
    user = User(**{**sample_user_data, 'role': 'farmer'})
    session.add(user)
    session.commit()
    assert user.role == 'farmer'
  
  def test_user_aadhaar_encryption(self, session, sample_user_data):
    aadhaar = '123456789012'
    encrypted = aadhaar_encryption.encrypt_aadhaar(aadhaar)
    user = User(**{**sample_user_data, 'aadhaar_encrypted': encrypted})
    session.add(user)
    session.commit()
    assert user.aadhaar_encrypted != aadhaar
    decrypted = aadhaar_encryption.decrypt_aadhaar(user.aadhaar_encrypted)
    assert decrypted == aadhaar
  
  def test_user_timestamps(self, session, sample_user_data):
    user = User(**sample_user_data)
    session.add(user)
    session.commit()
    assert user.created_at is not None
    assert user.updated_at is not None
    assert isinstance(user.created_at, datetime)

class TestFarmerModel:
  def test_create_farmer(self, session, create_user, sample_farmer_data):
    user = create_user(role='farmer')
    farmer = Farmer(user_id=user.id, **sample_farmer_data)
    session.add(farmer)
    session.commit()
    assert farmer.id is not None
    assert farmer.user_id == user.id
    assert farmer.farm_name == 'Test Farm'
    assert farmer.state == 'Maharashtra'
    assert farmer.farm_type == 'dairy'
  
  def test_farmer_user_relationship(self, session, create_user, sample_farmer_data):
    user = create_user(role='farmer')
    farmer = Farmer(user_id=user.id, **sample_farmer_data)
    session.add(farmer)
    session.commit()
    assert farmer.user is not None
    assert farmer.user.id == user.id
    assert farmer.user.role == 'farmer'
  
  def test_farmer_registration_number_unique(self, session, create_user, sample_farmer_data):
    user1 = create_user(role='farmer', email='farmer1@test.com', firebase_uid='uid1')
    farmer1 = Farmer(user_id=user1.id, **{**sample_farmer_data, 'registration_number': 'REG123'})
    session.add(farmer1)
    session.commit()
    user2 = create_user(role='farmer', email='farmer2@test.com', firebase_uid='uid2')
    farmer2 = Farmer(user_id=user2.id, **{**sample_farmer_data, 'registration_number': 'REG123'})
    session.add(farmer2)

    with pytest.raises(Exception): session.commit()
  
  def test_farmer_cascade_delete(self, session, create_user, sample_farmer_data):
    user = create_user(role='farmer')
    farmer = Farmer(user_id=user.id, **sample_farmer_data)
    session.add(farmer)
    session.commit()
    farmer_id = farmer.id
    session.delete(user)
    session.commit()
    deleted_farmer = session.query(Farmer).filter_by(id=farmer_id).first()
    assert deleted_farmer is None

class TestVeterinarianModel:
  def test_create_veterinarian(self, session, create_user, sample_vet_data):
    user = create_user(role='veterinary')
    vet = Veterinarian(user_id=user.id, **sample_vet_data)
    session.add(vet)
    session.commit()
    assert vet.id is not None
    assert vet.license_number == 'VET123456'
    assert vet.specialization == 'Large Animals'
    assert vet.verification_status == 'pending'
  
  def test_vet_license_unique(self, session, create_user, sample_vet_data):
    user1 = create_user(role='veterinary', email='vet1@test.com', firebase_uid='uid1')
    vet1 = Veterinarian(user_id=user1.id, **sample_vet_data)
    session.add(vet1)
    session.commit()
    user2 = create_user(role='veterinary', email='vet2@test.com', firebase_uid='uid2')
    vet2 = Veterinarian(user_id=user2.id, **sample_vet_data)
    session.add(vet2)
    
    with pytest.raises(Exception): session.commit()

  def test_vet_verification_status(self, session, create_user, sample_vet_data):
    user = create_user(role='veterinary')
    vet = Veterinarian(user_id=user.id, **sample_vet_data)
    session.add(vet)
    session.commit()
    assert vet.verification_status in ['pending', 'verified', 'rejected']
    vet.verification_status = 'verified'
    vet.verified_at = datetime.utcnow()
    session.commit()

    assert vet.verification_status == 'verified'
    assert vet.verified_at is not None

class TestGovernmentOfficialModel:
  def test_create_government_official(self, session, create_user):
    user = create_user(role='government')
    gov_official = GovernmentOfficial(
      user_id=user.id,
      government_id='GOV123456',
      department_name='Animal Husbandry',
      jurisdiction_state='Maharashtra',
      jurisdiction_district='Pune'
    )
    session.add(gov_official)
    session.commit()
    
    assert gov_official.id is not None
    assert gov_official.government_id == 'GOV123456'
    assert gov_official.department_name == 'Animal Husbandry'
    assert gov_official.verification_status == 'pending'
  
  def test_government_id_unique(self, session, create_user):
    user1 = create_user(role='government', email='gov1@test.com', firebase_uid='uid1')
    gov1 = GovernmentOfficial(user_id=user1.id, government_id='GOV123', department_name='Dept1')
    session.add(gov1)
    session.commit()
    
    user2 = create_user(role='government', email='gov2@test.com', firebase_uid='uid2')
    gov2 = GovernmentOfficial(user_id=user2.id, government_id='GOV123', department_name='Dept2')
    session.add(gov2)
    
    with pytest.raises(Exception):
      session.commit()

class TestResearcherModel:
  def test_create_researcher(self, session, create_user):
    user = create_user(role='researcher')
    researcher = Researcher(
      user_id=user.id,
      institution_name='Test University',
      institution_type='university',
      project_name='AMR Study',
      research_area='Antimicrobial Resistance'
    )
    session.add(researcher)
    session.commit()
    
    assert researcher.id is not None
    assert researcher.institution_name == 'Test University'
    assert researcher.project_name == 'AMR Study'
    assert researcher.verification_status == 'pending'
  
  def test_researcher_institution_types(self, session, create_user):
    user = create_user(role='researcher')
    researcher = Researcher(user_id=user.id, institution_name='Test', institution_type='research_institute', project_name='Test Project')
    session.add(researcher)
    session.commit()
    
    assert researcher.institution_type in ['university', 'research_institute', 'government_lab', 'private_org']