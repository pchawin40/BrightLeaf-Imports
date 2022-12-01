from .db import db
import datetime

class ProductUser(db.Model):
  __tablename__ = 'product_users'
  
  id = db.Column(db.Integer, primary_key=True)
  likeToggle=db.Column(db.Boolean)
  product_id = db.Column("product_id", db.ForeignKey("products.id"))
  user_id = db.Column("user_id", db.ForeignKey("users.id"))
  created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
  updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    
  def to_dict(self):
    return{
      'id': self.id,
      'likeToggle': self.likeToggle,
      'product_id': self.product_id,
      'user_id': self.user_id,
      'created_at': self.created_at,
      'updated_at': self.updated_at
    }
