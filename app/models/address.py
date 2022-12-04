from .db import db
import datetime

class Address(db.Model):
  __tablename__ = "addresses"
  
  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'))
  company_name = db.Column(db.String(50))
  address = db.Column(db.String(100))
  address_2 = db.Column(db.String(100))
  city = db.Column(db.String(50))
  country = db.Column(db.String(50))
  state = db.Column(db.String(50))
  zipcode = db.Column(db.String(20))
  phone = db.Column(db.String(10))
  default = db.Column(db.Boolean, default=False)
  created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
  updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
  
  # connect parent (1: user) to child (*: reviews)
  user = db.relationship('User', back_populates='address_es')
  
  def to_dict(self):
    return{
      'id': self.id,
      'user_id': self.user_id,
      'company_name': self.company_name,
      'address': self.address,
      'address_2': self.address_2,
      'city': self.city,
      'country': self.country,
      'state': self.state,
      'zipcode': self.zipcode,
      'phone': self.phone,
      'default': self.default,
      'created_at': self.created_at,
      'updated_at': self.updated_at
    }
  
