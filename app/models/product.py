from .db import db
import datetime

class Product(db.Model):
  __tablename__ = 'products'
  
  id = db.Column(db.Integer, db.ForeignKey('images.imageable_id', ondelete='CASCADE'), primary_key=True, autoincrement=True)
  
  name = db.Column(db.String(50), nullable=False)
  description = db.Column(db.String(255))
  price = db.Column(db.Numeric(5, 2), nullable=False)
  quantity = db.Column(db.Integer)
  preview_image = db.Column(db.String(255))
  
  created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
  updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
  
  # connect polymorphic relationship
  __mapper_args__ = {
    'polymorphic_identity': 'product',
    'with_polymorphic': '*',
    'concrete': True
  }
  
  # connect parent (1: shopping cart) to child (*: products)
  products = db.relationship('ShoppingCart', cascade='delete')
  
  review = db.relationship('Review', back_populates='products', cascade='delete')
  
  # return product as object (dictionary)
  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'description': self.description,
      # decimal is not convertable to JSON so using float instead (doesn't have to be precise exact)
      'price': float(self.price),
      'quantity': self.quantity,
      'preview_image': self.preview_image,
      'created_at': self.created_at,
      'updated_at': self.updated_at
    }
  
