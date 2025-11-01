from utils.db import db

class Livestock(db.Model):
  __tablename__ = 'livestock'
  id = db.Column(db.Integer, primary_key=True)
  tag_id = db.Column(db.String(64), unique=True, nullable=False)
  species = db.Column(db.String(50))
  owner_id = db.Column(db.Integer, db.ForeignKey('users.id'))
  health_data = db.Column(db.JSON)
  created_at = db.Column(db.DateTime, server_default=db.func.now())

  def to_dict(self):
    return {
      'id': self.id,
      'tag_id': self.tag_id,
      'species': self.species,
      'owner_id': self.owner_id,
      'health_data': self.health_data,
      'created_at': self.created_at.isoformat()
    }
