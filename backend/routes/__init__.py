from .auth import auth_bp
from .onboarding import onboarding_bp
from .livestock import livestock_bp
from .alerts import amu_bp
from .prescription import prescription_bp
from .consultation import consultation_bp
from .alerts import alerts_bp
from .dashboard import dashboard_bp

def register_blueprints(app):
  app.register_blueprint(auth_bp)
  app.register_blueprint(onboarding_bp)
  app.register_blueprint(livestock_bp)
  app.register_blueprint(amu_bp)
  app.register_blueprint(prescription_bp)
  app.register_blueprint(consultation_bp)
  app.register_blueprint(alerts_bp)
  app.register_blueprint(dashboard_bp)