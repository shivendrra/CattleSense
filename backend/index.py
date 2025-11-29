from flask import Flask
from flask_cors import CORS
import os
from dotenv import load_dotenv
from .config import config
from .database import init_db

load_dotenv()

def create_app(config_name='default'):
  app = Flask(__name__)
  app.config.from_object(config[config_name])

  CORS(app, resources={r"/api/*": {"origins": app.config['CORS_ORIGINS']}})
  init_db(app)
  return app

config_name = os.getenv('FLASK_ENV', 'development')
app = create_app(config_name)

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=5000, debug=True)