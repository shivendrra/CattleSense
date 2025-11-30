import pytest
from ...backend.models.functional import Livestock, AntimicrobialRecord, Prescription, HealthRecord, ConsultationRequest
from datetime import datetime, timedelta

class TestLivestockModel:
  def test_create_livestock(self, session, create_farmer, sample_livestock_data):
    farmer = create_farmer()
    livestock = Livestock(farmer_id=farmer.id, **sample_livestock_data)
    session.add(livestock)
    session.commit()
    
    assert livestock.id is not None
    assert livestock.rfid_tag == 'RFID001234'
    assert livestock.species == 'cattle'
    assert livestock.breed == 'Holstein'
    assert livestock.is_active == True
  
  def test_livestock_rfid_unique(self, session, create_farmer, sample_livestock_data):
    farmer = create_farmer()
    livestock1 = Livestock(farmer_id=farmer.id, **sample_livestock_data)
    session.add(livestock1)
    session.commit()
    
    livestock2 = Livestock(farmer_id=farmer.id, **sample_livestock_data)
    session.add(livestock2)
    
    with pytest.raises(Exception):
      session.commit()
  
  def test_livestock_species_enum(self, session, create_farmer, sample_livestock_data):
    farmer = create_farmer()
    for species in ['cattle', 'buffalo', 'goat', 'sheep', 'pig', 'poultry']:
      livestock = Livestock(farmer_id=farmer.id, **{**sample_livestock_data, 'rfid_tag': f'RFID{species}', 'species': species})
      session.add(livestock)
    session.commit()
    
    livestock_count = session.query(Livestock).count()
    assert livestock_count == 6
  
  def test_livestock_parent_child_relationship(self, session, create_farmer, sample_livestock_data):
    farmer = create_farmer()
    parent = Livestock(farmer_id=farmer.id, **{**sample_livestock_data, 'rfid_tag': 'PARENT001'})
    session.add(parent)
    session.commit()
    
    child = Livestock(farmer_id=farmer.id, **{**sample_livestock_data, 'rfid_tag': 'CHILD001', 'parent_id': parent.id})
    session.add(child)
    session.commit()
    
    assert child.parent_id == parent.id
    assert child.parent is not None
    assert child.parent.id == parent.id
    assert len(parent.offspring) == 1
  
  def test_livestock_farmer_relationship(self, session, create_farmer, sample_livestock_data):
    farmer = create_farmer()
    livestock = Livestock(farmer_id=farmer.id, **sample_livestock_data)
    session.add(livestock)
    session.commit()
    
    assert livestock.farmer is not None
    assert livestock.farmer.id == farmer.id
  
  def test_livestock_cascade_delete(self, session, create_farmer, sample_livestock_data):
    farmer = create_farmer()
    livestock = Livestock(farmer_id=farmer.id, **sample_livestock_data)
    session.add(livestock)
    session.commit()
    livestock_id = livestock.id
    
    session.delete(farmer)
    session.commit()
    
    deleted_livestock = session.query(Livestock).filter_by(id=livestock_id).first()
    assert deleted_livestock is None

class TestAntimicrobialRecordModel:
  def test_create_amu_record(self, session, create_livestock, sample_amu_data):
    livestock = create_livestock()
    amu_record = AntimicrobialRecord(livestock_id=livestock.id, **sample_amu_data)
    session.add(amu_record)
    session.commit()
    
    assert amu_record.id is not None
    assert amu_record.drug_name == 'Amoxicillin'
    assert amu_record.dosage == 10.0
    assert amu_record.is_verified == False
  
  def test_amu_record_livestock_relationship(self, session, create_livestock, sample_amu_data):
    livestock = create_livestock()
    amu_record = AntimicrobialRecord(livestock_id=livestock.id, **sample_amu_data)
    session.add(amu_record)
    session.commit()
    
    assert amu_record.livestock is not None
    assert amu_record.livestock.id == livestock.id
    assert livestock.antimicrobial_records.count() == 1
  
  def test_amu_record_administration_routes(self, session, create_livestock, sample_amu_data):
    livestock = create_livestock()
    routes = ['oral', 'injection', 'topical', 'feed', 'water']
    
    for route in routes:
      amu = AntimicrobialRecord(livestock_id=livestock.id, **{**sample_amu_data, 'administration_route': route})
      session.add(amu)
    session.commit()
    
    assert livestock.antimicrobial_records.count() == 5
  
  def test_amu_record_withdrawal_date(self, session, create_livestock, sample_amu_data):
    livestock = create_livestock()
    withdrawal_date = datetime.utcnow().date() + timedelta(days=14)
    amu_record = AntimicrobialRecord(livestock_id=livestock.id, **{**sample_amu_data, 'withdrawal_end_date': withdrawal_date})
    session.add(amu_record)
    session.commit()
    
    assert amu_record.withdrawal_end_date is not None
    assert amu_record.withdrawal_end_date == withdrawal_date

class TestPrescriptionModel:
  def test_create_prescription(self, session, create_veterinarian, create_farmer, create_livestock):
    vet = create_veterinarian()
    farmer = create_farmer()
    livestock = create_livestock(farmer=farmer)
    
    prescription = Prescription(
      veterinarian_id=vet.id,
      farmer_id=farmer.id,
      livestock_id=livestock.id,
      prescription_number='RX202501011234',
      prescription_date=datetime.utcnow().date(),
      diagnosis='Mastitis',
      drugs_prescribed=[{'drug': 'Amoxicillin', 'dosage': '10mg'}],
      status='active'
    )
    session.add(prescription)
    session.commit()
    
    assert prescription.id is not None
    assert prescription.prescription_number == 'RX202501011234'
    assert prescription.status == 'active'
  
  def test_prescription_relationships(self, session, create_veterinarian, create_farmer, create_livestock):
    vet = create_veterinarian()
    farmer = create_farmer()
    livestock = create_livestock(farmer=farmer)
    
    prescription = Prescription(
      veterinarian_id=vet.id,
      farmer_id=farmer.id,
      livestock_id=livestock.id,
      prescription_number='RX123',
      prescription_date=datetime.utcnow().date(),
      diagnosis='Test'
    )
    session.add(prescription)
    session.commit()
    
    assert prescription.veterinarian is not None
    assert prescription.veterinarian.id == vet.id
    assert prescription.farmer is not None
    assert prescription.farmer.id == farmer.id
  
  def test_prescription_status_enum(self, session, create_veterinarian, create_farmer, create_livestock):
    vet = create_veterinarian()
    farmer = create_farmer()
    livestock = create_livestock(farmer=farmer)
    
    for status in ['active', 'completed', 'cancelled']:
      prescription = Prescription(
        veterinarian_id=vet.id,
        farmer_id=farmer.id,
        livestock_id=livestock.id,
        prescription_number=f'RX{status}',
        prescription_date=datetime.utcnow().date(),
        diagnosis='Test',
        status=status
      )
      session.add(prescription)
    session.commit()
    
    assert session.query(Prescription).count() == 3

class TestHealthRecordModel:
  def test_create_health_record(self, session, create_livestock, create_user):
    livestock = create_livestock()
    user = create_user()
    
    health_record = HealthRecord(
      livestock_id=livestock.id,
      record_date=datetime.utcnow().date(),
      recorded_by=user.id,
      weight_kg=455.0,
      temperature_celsius=38.5,
      symptoms='Mild fever',
      diagnosis='Infection',
      notes='Administered antibiotics'
    )
    session.add(health_record)
    session.commit()
    
    assert health_record.id is not None
    assert health_record.weight_kg == 455.0
    assert health_record.temperature_celsius == 38.5
  
  def test_health_record_livestock_relationship(self, session, create_livestock, create_user):
    livestock = create_livestock()
    user = create_user()
    
    health_record = HealthRecord(livestock_id=livestock.id, record_date=datetime.utcnow().date(), recorded_by=user.id)
    session.add(health_record)
    session.commit()
    
    assert health_record.livestock is not None
    assert health_record.livestock.id == livestock.id
    assert livestock.health_records.count() == 1

class TestConsultationRequestModel:
  def test_create_consultation_request(self, session, create_farmer, create_veterinarian, create_livestock):
    farmer = create_farmer()
    vet = create_veterinarian()
    livestock = create_livestock(farmer=farmer)
    
    consultation = ConsultationRequest(
      farmer_id=farmer.id,
      veterinarian_id=vet.id,
      livestock_id=livestock.id,
      request_type='emergency',
      description='Urgent care needed',
      status='pending'
    )
    session.add(consultation)
    session.commit()
    
    assert consultation.id is not None
    assert consultation.request_type == 'emergency'
    assert consultation.status == 'pending'
  
  def test_consultation_request_types(self, session, create_farmer, create_veterinarian):
    farmer = create_farmer()
    vet = create_veterinarian()
    
    request_types = ['routine_checkup', 'emergency', 'vaccination', 'prescription', 'other']
    
    for req_type in request_types:
      consultation = ConsultationRequest(farmer_id=farmer.id, veterinarian_id=vet.id, request_type=req_type, status='pending')
      session.add(consultation)
    session.commit()
    
    assert session.query(ConsultationRequest).count() == 5
  
  def test_consultation_status_workflow(self, session, create_farmer, create_veterinarian):
    farmer = create_farmer()
    vet = create_veterinarian()
    
    consultation = ConsultationRequest(farmer_id=farmer.id, veterinarian_id=vet.id, request_type='routine_checkup', status='pending')
    session.add(consultation)
    session.commit()
    
    assert consultation.status == 'pending'
    
    consultation.status = 'accepted'
    session.commit()
    assert consultation.status == 'accepted'
    
    consultation.status = 'completed'
    session.commit()
    assert consultation.status == 'completed'