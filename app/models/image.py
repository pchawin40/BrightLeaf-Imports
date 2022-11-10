from .db import db
import datetime

class Image(db.Model):
  __tablename__ = 'images'
  
  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  
  # image PA can be null to account for non-product or -review related images
  imageable_id = db.Column(db.Integer, db.ForeignKey('products.id', ondelete='CASCADE'))
  imageable_id = db.Column(db.Integer, db.ForeignKey('reviews.id', ondelete='CASCADE'))
  imageable_type = db.Column(db.String(50))
  
  url = db.Column(db.String(255), nullable=False)
  description = db.Column(db.String(255))
  
  created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
  updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
  
  # connect polymorphic relationship
  __mapper_args__ = {
      'polymorphic_identity': 'images',
      'with_polymorphic': '*',
      'concrete': True
  }
  
  # return image as object (dictionary)
  def to_dict(self):
    return {
        'id': self.id,
        'imageable_id': self.imageable_id,
        'imageable_type': self.imageable_type,
        'url': self.url,
        'description': self.description,
        'created_at': self.created_at,
        'updated_at': self.updated_at
    }
