from app import create_app
from extensions import db
from sqlalchemy import create_engine, text
from models.user import User, Farmer, Veterinarian, GovernmentOfficial, Researcher
from models.livestock import Livestock, HealthRecord
from models.amu import AntimicrobialRecord, Prescription, WithdrawalPeriod
from models.requests import ConsultationRequest, Alert, TraceabilityLog
from models.analytics import RegionalAnalytics, DataRequest, InspectionLog
import os

def init_database():
  db_user = os.getenv('DB_USER', 'root')
  db_password = os.getenv('DB_PASSWORD', '')
  db_host = os.getenv('DB_HOST', 'localhost')
  db_port = os.getenv('DB_PORT', '3306')
  db_name = os.getenv('DB_NAME', 'cattlesenseLocal')

  print(f"Initializing database: {db_name}")
  print("WARNING: This will delete ALL existing data!")

  confirm = input("Are you sure you want to continue? (yes/no): ")
  if confirm.lower() != 'yes':
    print("Database initialization cancelled")
    return

  try:
    print("\nDropping and recreating database...")
    temp_url = f"mysql+pymysql://{db_user}:{db_password}@{db_host}:{db_port}/"
    temp_engine = create_engine(temp_url, isolation_level="AUTOCOMMIT")

    with temp_engine.connect() as conn:
      conn.execute(text(f"DROP DATABASE IF EXISTS {db_name}"))
      conn.execute(text(f"CREATE DATABASE {db_name}"))

    temp_engine.dispose()
    print(f"Database {db_name} recreated successfully!")

    print("\nCreating all tables from models...")
    app = create_app()

    with app.app_context():
      db.create_all()

      print("\nDatabase initialized successfully!")
      print("\nTables created:")
      tables = [
        "users", "farmers", "veterinarians", "government_officials", "researchers",
        "livestock", "health_records", "antimicrobial_records", "prescriptions",
        "withdrawal_periods", "consultation_requests", "alerts", "traceability_logs",
        "regional_analytics", "data_requests", "inspection_logs"
      ]
      for table in tables:
        print(f"   - {table}")

      print("\nDatabase is ready to use!")
      print("\nNOTE: You only need to run this script once.")
      print("After this, your tables will persist in MySQL.")
      print("Only run again if you:")
      print("  - Change your database models")
      print("  - Want to reset all data")

  except Exception as e:
    print(f"\nError during database initialization: {e}")
    print("\nTry manually running these commands in MySQL:")
    print(f"  DROP DATABASE IF EXISTS {db_name};")
    print(f"  CREATE DATABASE {db_name};")
    print("Then run this script again.")

if __name__ == '__main__':
  init_database()