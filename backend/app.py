import os
from dotenv import load_dotenv
load_dotenv()
from flask import Flask, jsonify, render_template
from flask_cors import CORS
from config.settings import get_config
from extensions import db, migrate
from routes import register_blueprints


def create_app(config_name=None):
  app = Flask(__name__)

  if config_name is None:
    config_name = os.getenv('FLASK_ENV', 'development')  
  app.config.from_object(get_config(config_name))

  CORS(app, resources={
    r"/api/*": {
      "origins": app.config['CORS_ORIGINS'],
      "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      "allow_headers": ["Content-Type", "Authorization"],
      "expose_headers": ["Content-Range", "X-Content-Range"],
      "supports_credentials": True
    }
  })

  db.init_app(app)
  migrate.init_app(app, db)
  register_blueprints(app)

  @app.route('/')
  def home():
    return render_template('home.html')

  @app.route('/api/health', methods=['GET'])
  def health_check():
    return jsonify({'status': 'healthy', 'service': 'CattleSense API', 'version': '1.0.0'}), 200

  @app.errorhandler(404)
  def not_found(error):
    return jsonify({'error': 'Resource not found'}), 404

  @app.errorhandler(500)
  def internal_error(error):
    db.session.rollback()
    return jsonify({'error': 'Internal server error'}), 500

  return app

if __name__ == '__main__':
  app = create_app()
  app.run(host='0.0.0.0', port=5000, debug=True)