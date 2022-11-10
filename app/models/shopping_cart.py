from .db import db
import datetime

class ShoppingCart(db.Model):
  __tablename__ = 'shopping_carts'
  
  id = db.Column(db.Integer, primary_key=True)
  
  product_id = db.Column(db.Integer, db.ForeignKey('products.id', ondelete='CASCADE'))
  user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'))
  quantity = db.Column(db.Integer)
  price = db.Column(db.Numeric(5, 2))
  
  created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
  updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
  
  # connect parent (1: shopping cart) to child (*: products)
  shopping_cart = db.relationship('Product', back_populates='products')
  
  # connect parent (1: user) user to child (*: shopping carts)
  user = db.relationship('User', back_populates='carts')
  
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
  
