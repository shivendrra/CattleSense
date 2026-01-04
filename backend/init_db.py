import os
from app import create_app
from extensions import db
from models.user import User, Farmer, Veterinarian, GovernmentOfficial, Researcher
from models.livestock import Livestock, HealthRecord
from models.amu import AntimicrobialRecord, Prescription, WithdrawalPeriod
from models.requests import Alert, ConsultationRequest, TraceabilityLog
from models.analytics import RegionalAnalytics, DataRequest, InspectionLog

def init_database():
  app = create_app('development')
  
  with app.app_context():
    print("Creating all tables...")
    db.create_all()
    print("/ Database tables created successfully!")
    
    # Verify tables
    inspector = db.inspect(db.engine)
    tables = inspector.get_table_names()
    print(f"\n Created {len(tables)} tables:")
    for table in tables: print(f"  - {table}")

if __name__ == '__main__':
  init_database()