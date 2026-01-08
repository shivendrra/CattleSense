from datetime import datetime, timezone
from extensions import db

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
  created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))

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
  drugs_prescribed = db.Column(db.JSON)
  notes = db.Column(db.Text)
  follow_up_date = db.Column(db.Date)
  status = db.Column(db.Enum('active', 'completed', 'cancelled', name='prescription_status'), default='active')
  verified_at = db.Column(db.DateTime)
  created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))

  antimicrobial_records = db.relationship('AntimicrobialRecord', backref='prescription', lazy='dynamic')

  def __repr__(self):
    return f'<Prescription {self.prescription_number}>'

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
  created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))
  updated_at = db.Column(db.DateTime, default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc))

  __table_args__ = (db.Index('idx_drug_species_tissue', 'drug_name', 'species', 'tissue_type'),)

  def __repr__(self):
    return f'<WithdrawalPeriod {self.drug_name} - {self.species} - {self.tissue_type}>'