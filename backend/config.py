import os
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()

class Config:
  SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')
  SQLALCHEMY_DATABASE_URI = os.getenv(
    'DATABASE_URL',
    'mysql+pymysql://root:password@localhost:3306/cattlesense'
  )
  SQLALCHEMY_TRACK_MODIFICATIONS = False
  SQLALCHEMY_ENGINE_OPTIONS = {
    'pool_size': 10,
    'pool_recycle': 3600,
    'pool_pre_ping': True,
    'max_overflow': 20
  }

  FIREBASE_CREDENTIALS_PATH = os.getenv('FIREBASE_CREDENTIALS_PATH', 'firebase-credentials.json')  
  CORS_ORIGINS = os.getenv('CORS_ORIGINS', 'http://localhost:3000,http://localhost:5173').split(',')
  RATELIMIT_STORAGE_URL = os.getenv('REDIS_URL', 'redis://localhost:6379/0')
  RATELIMIT_DEFAULT = "100/hour"
  CELERY_BROKER_URL = os.getenv('CELERY_BROKER_URL', 'redis://localhost:6379/1')
  CELERY_RESULT_BACKEND = os.getenv('CELERY_RESULT_BACKEND', 'redis://localhost:6379/2')

  MAX_CONTENT_LENGTH = 16 * 1024 * 1024
  UPLOAD_FOLDER = os.getenv('UPLOAD_FOLDER', 'uploads/')
  ALLOWED_EXTENSIONS = {'pdf', 'png', 'jpg', 'jpeg', 'doc', 'docx'}  
  ALERT_CHECK_INTERVAL = int(os.getenv('ALERT_CHECK_INTERVAL', '3600'))

  JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
  JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=30)
  PAGINATION_DEFAULT = 20
  PAGINATION_MAX = 100

class DevelopmentConfig(Config):
  DEBUG = True
  SQLALCHEMY_ECHO = True

class ProductionConfig(Config):
  DEBUG = False
  SQLALCHEMY_ECHO = False
  RATELIMIT_DEFAULT = "200/hour"

class TestingConfig(Config):
  TESTING = True
  SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:password@localhost:3306/cattlesense_test'

config = {
  'development': DevelopmentConfig,
  'production': ProductionConfig,
  'testing': TestingConfig,
  'default': DevelopmentConfig
}