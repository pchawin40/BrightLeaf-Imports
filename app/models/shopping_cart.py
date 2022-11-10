from .db import db
import datetime

class ShoppingCart(db.Model):
  __tablename__ = 'shopping_carts'
  
  id = db.Column(db.Integer, primary_key=True)
  
  # product_id = db.Column(db.Integer, db.ForeignKey('products.id', ondelete='CASCADE'))
  product_id = db.Column(db.Integer)
  user_id = db.Column(db.Integer)
  quantity = db.Column(db.Integer)
  price = db.Column(db.Numeric(5, 2))
  
  created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
  updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
  
  # connect shopping cart to products
  # shopping_cart = db.relationship('Product', back_populates='products')
  
  # return product as object (dictionary)
  def to_dict(self):
    return {
      'id': self.id,
      'product_id': self.product_id,
      'user_id': self.user_id,
      'quantity': self.quantity,
      'price': self.price,
      'created_at': self.created_at,
      'updated_at': self.updated_at
    }
  
