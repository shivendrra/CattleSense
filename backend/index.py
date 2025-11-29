import os
from dotenv import load_dotenv
from flask import Flask, render_template
from flask_cors import CORS
from config import config
from database import init_db

load_dotenv()

def create_app(config_name='default'):
  app = Flask(__name__)
  app.config.from_object(config[config_name])  
  CORS(app, resources={r"/api/*": {"origins": app.config['CORS_ORIGINS']}})
  init_db(app)

  from models.user import User, Farmer, Veterinarian, GovernmentOfficial, Researcher
  from models.records import Alert, DataRequest, InspectionLog, RegionalAnalytics, TraceabilityLog, WithdrawalPeriod
  from models.functional import AntimicrobialRecord, ConsultationRequest, HealthRecord, Livestock, Prescription

  @app.route('/')
  def home(): return render_template('home.html')

  @app.route('/api/health', methods=['GET'])
  def health_check(): return {'status': 'healthy', 'service': 'CattleSense API'}, 200
  return app

config_name = os.getenv('FLASK_ENV', 'development')
app = create_app(config_name)

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=5000, debug=True)