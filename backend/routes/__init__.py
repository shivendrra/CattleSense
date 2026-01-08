from routes.auth import auth_bp
from routes.onboarding import onboarding_bp
from routes.livestock import livestock_bp
from routes.amu import amu_bp
from routes.prescription import prescription_bp
from routes.consultation import consultation_bp
from routes.alerts import alerts_bp
from routes.dashboard import dashboard_bp

def register_blueprints(app):
  app.register_blueprint(auth_bp)
  app.register_blueprint(onboarding_bp)
  app.register_blueprint(livestock_bp)
  app.register_blueprint(amu_bp)
  app.register_blueprint(prescription_bp)
  app.register_blueprint(consultation_bp)
  app.register_blueprint(alerts_bp)
  app.register_blueprint(dashboard_bp)