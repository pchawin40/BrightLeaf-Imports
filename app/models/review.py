from .db import db
import datetime

class Review(db.Model):
  __tablename__ = 'reviews'
  
  id = db.Column(db.Integer, db.ForeignKey('images.imageable_id', ondelete='CASCADE'), primary_key=True, autoincrement=True)
  
  user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
  review = db.Column(db.String(255))
  stars = db.Column(db.Integer, nullable=False)
  
  created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
  updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
  
  # connect polymorphic relationship
  __mapper_args__ = {
    'polymorphic_identity': 'review',
    'with_polymorphic': '*',
    'concrete': True
  }
  
  # connect parent (1: user) to child (*: reviews)
  user = db.relationship('User', back_populates='reviews')
  
  # return review as object (dictionary)
  def to_dict(self):
    return {
      'id': self.id,
      'user_id': self.user_id,
      'review': self.review,
      'stars': self.stars,
      'created_at': self.created_at,
      'updated_at': self.updated_at
    }
  
