from ..database import db
from ..models.records import WithdrawalPeriod

def seed_withdrawal_periods():
  withdrawal_data = [
    {'drug_name': 'Amoxicillin', 'active_ingredient': 'Amoxicillin', 'species': 'cattle', 'withdrawal_period_days': 14, 'mrl_value': 0.01, 'mrl_unit': 'mg/kg', 'tissue_type': 'milk', 'reference_source': 'FSSAI'},
    {'drug_name': 'Amoxicillin', 'active_ingredient': 'Amoxicillin', 'species': 'cattle', 'withdrawal_period_days': 28, 'mrl_value': 0.05, 'mrl_unit': 'mg/kg', 'tissue_type': 'meat', 'reference_source': 'FSSAI'},
    {'drug_name': 'Oxytetracycline', 'active_ingredient': 'Oxytetracycline', 'species': 'cattle', 'withdrawal_period_days': 21, 'mrl_value': 0.1, 'mrl_unit': 'mg/kg', 'tissue_type': 'milk', 'reference_source': 'FSSAI'},
    {'drug_name': 'Oxytetracycline', 'active_ingredient': 'Oxytetracycline', 'species': 'cattle', 'withdrawal_period_days': 35, 'mrl_value': 0.2, 'mrl_unit': 'mg/kg', 'tissue_type': 'meat', 'reference_source': 'FSSAI'},
    {'drug_name': 'Penicillin', 'active_ingredient': 'Penicillin G', 'species': 'cattle', 'withdrawal_period_days': 7, 'mrl_value': 0.004, 'mrl_unit': 'mg/kg', 'tissue_type': 'milk', 'reference_source': 'FSSAI'},
    {'drug_name': 'Penicillin', 'active_ingredient': 'Penicillin G', 'species': 'cattle', 'withdrawal_period_days': 14, 'mrl_value': 0.05, 'mrl_unit': 'mg/kg', 'tissue_type': 'meat', 'reference_source': 'FSSAI'},
    {'drug_name': 'Enrofloxacin', 'active_ingredient': 'Enrofloxacin', 'species': 'poultry', 'withdrawal_period_days': 5, 'mrl_value': 0.1, 'mrl_unit': 'mg/kg', 'tissue_type': 'meat', 'reference_source': 'FSSAI'},
    {'drug_name': 'Enrofloxacin', 'active_ingredient': 'Enrofloxacin', 'species': 'poultry', 'withdrawal_period_days': 3, 'mrl_value': 0.05, 'mrl_unit': 'mg/kg', 'tissue_type': 'eggs', 'reference_source': 'FSSAI'},
    {'drug_name': 'Tylosin', 'active_ingredient': 'Tylosin', 'species': 'cattle', 'withdrawal_period_days': 21, 'mrl_value': 0.05, 'mrl_unit': 'mg/kg', 'tissue_type': 'milk', 'reference_source': 'FSSAI'},
    {'drug_name': 'Tylosin', 'active_ingredient': 'Tylosin', 'species': 'cattle', 'withdrawal_period_days': 28, 'mrl_value': 0.1, 'mrl_unit': 'mg/kg', 'tissue_type': 'meat', 'reference_source': 'FSSAI'},
    {'drug_name': 'Sulfamethazine', 'active_ingredient': 'Sulfamethazine', 'species': 'cattle', 'withdrawal_period_days': 7, 'mrl_value': 0.025, 'mrl_unit': 'mg/kg', 'tissue_type': 'milk', 'reference_source': 'FSSAI'},
    {'drug_name': 'Sulfamethazine', 'active_ingredient': 'Sulfamethazine', 'species': 'pig', 'withdrawal_period_days': 15, 'mrl_value': 0.1, 'mrl_unit': 'mg/kg', 'tissue_type': 'meat', 'reference_source': 'FSSAI'},
    {'drug_name': 'Ceftiofur', 'active_ingredient': 'Ceftiofur', 'species': 'cattle', 'withdrawal_period_days': 0, 'mrl_value': 0.1, 'mrl_unit': 'mg/kg', 'tissue_type': 'milk', 'reference_source': 'FSSAI'},
    {'drug_name': 'Ceftiofur', 'active_ingredient': 'Ceftiofur', 'species': 'cattle', 'withdrawal_period_days': 13, 'mrl_value': 0.2, 'mrl_unit': 'mg/kg', 'tissue_type': 'meat', 'reference_source': 'FSSAI'},
    {'drug_name': 'Ivermectin', 'active_ingredient': 'Ivermectin', 'species': 'cattle', 'withdrawal_period_days': 35, 'mrl_value': 0.01, 'mrl_unit': 'mg/kg', 'tissue_type': 'milk', 'reference_source': 'FSSAI'},
    {'drug_name': 'Ivermectin', 'active_ingredient': 'Ivermectin', 'species': 'cattle', 'withdrawal_period_days': 35, 'mrl_value': 0.02, 'mrl_unit': 'mg/kg', 'tissue_type': 'meat', 'reference_source': 'FSSAI'},
    {'drug_name': 'Gentamicin', 'active_ingredient': 'Gentamicin', 'species': 'cattle', 'withdrawal_period_days': 30, 'mrl_value': 0.2, 'mrl_unit': 'mg/kg', 'tissue_type': 'milk', 'reference_source': 'FSSAI'},
    {'drug_name': 'Gentamicin', 'active_ingredient': 'Gentamicin', 'species': 'cattle', 'withdrawal_period_days': 42, 'mrl_value': 0.5, 'mrl_unit': 'mg/kg', 'tissue_type': 'meat', 'reference_source': 'FSSAI'},
    {'drug_name': 'Ampicillin', 'active_ingredient': 'Ampicillin', 'species': 'buffalo', 'withdrawal_period_days': 14, 'mrl_value': 0.01, 'mrl_unit': 'mg/kg', 'tissue_type': 'milk', 'reference_source': 'FSSAI'},
    {'drug_name': 'Ampicillin', 'active_ingredient': 'Ampicillin', 'species': 'buffalo', 'withdrawal_period_days': 21, 'mrl_value': 0.05, 'mrl_unit': 'mg/kg', 'tissue_type': 'meat', 'reference_source': 'FSSAI'}
  ]

  existing_count = WithdrawalPeriod.query.count()
  if existing_count > 0:
    print(f"Withdrawal periods already seeded ({existing_count} records). Skipping.")
    return  
  for data in withdrawal_data:
    withdrawal = WithdrawalPeriod(**data)
    db.session.add(withdrawal)
  db.session.commit()
  print(f"Successfully seeded {len(withdrawal_data)} withdrawal period records.")

if __name__ == '__main__':
  from ..index import create_app
  app = create_app()
  with app.app_context(): seed_withdrawal_periods()