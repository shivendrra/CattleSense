from utils.db import db

class User(db.Model):
  __tablename__ = 'users'
  id = db.Column(db.Integer, primary_key=True)
  uid = db.Column(db.String(128), unique=True, nullable=False)  # Firebase UID
  name = db.Column(db.String(120), nullable=False)
  email = db.Column(db.String(120), unique=True, nullable=False)
  role = db.Column(db.String(50), default='farmer')  # farmer, vet, admin

  def to_dict(self):
    return {
      'id': self.id,
      'uid': self.uid,
      'name': self.name,
      'email': self.email,
      'role': self.role
    }