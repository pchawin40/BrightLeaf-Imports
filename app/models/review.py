from .db import db
import datetime

class Review(db.Model):
  __tablename__ = 'reviews'
  
  # id = db.Column(db.Integer, db.ForeignKey('images.imageable_id', ondelete='CASCADE'), primary_key=True)
  id = db.Column(db.Integer, primary_key=True)
  
  user_id = db.Column(db.Integer)
  product_id = db.Column(db.Integer)
  review = db.Column(db.String(255))
  stars = db.Column(db.Integer)
  
  created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
  updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
  
  # connect polymorphic relationship
  # __mapper_args__ = {
  #   'polymorphic_identity': 'review',
  #   'with_polymorphic': '*'
  # }
  
  # return product as object (dictionary)
  def to_dict(self):
    return {
      'id': self.id,
      'user_id': self.user_id,
      'product_id': self.product_id,
      'review': self.review,
      'stars': self.stars,
      'created_at': self.created_at,
      'updated_at': self.updated_at
    }
  
