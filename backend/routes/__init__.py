from .auth import auth_bp
from .onboarding import onboarding_bp

def register_blueprints(app):
  app.register_blueprint(auth_bp)
  app.register_blueprint(onboarding_bp)