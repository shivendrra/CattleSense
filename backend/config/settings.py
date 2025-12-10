import os
from datetime import timedelta

class BaseConfig:
  SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')
  SQLALCHEMY_TRACK_MODIFICATIONS = False
  SQLALCHEMY_ENGINE_OPTIONS = {'pool_size': 10, 'pool_recycle': 3600, 'pool_pre_ping': True, 'max_overflow': 20}
  FIREBASE_CREDENTIALS_PATH = os.getenv('FIREBASE_CREDENTIALS_PATH', 'firebase-credentials.json')
  CORS_ORIGINS = os.getenv('CORS_ORIGINS', 'http://localhost:3000,http://localhost:5173').split(',')
  MAX_CONTENT_LENGTH = 16 * 1024 * 1024
  UPLOAD_FOLDER = os.getenv('UPLOAD_FOLDER', 'uploads/')
  ALLOWED_EXTENSIONS = {'pdf', 'png', 'jpg', 'jpeg', 'doc', 'docx'}
  JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
  JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=30)
  PAGINATION_DEFAULT = 20
  PAGINATION_MAX = 100

class DevelopmentConfig(BaseConfig):
  DEBUG = True
  SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
  SQLALCHEMY_ECHO = False

class ProductionConfig(BaseConfig):
  DEBUG = False
  SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
  SQLALCHEMY_ECHO = False

class TestingConfig(BaseConfig):
  TESTING = True
  SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:password@localhost:3306/cattlesense_test'

def get_config(config_name='development'):
  configs = {'development': DevelopmentConfig, 'production': ProductionConfig, 'testing': TestingConfig}
  return configs.get(config_name, DevelopmentConfig)