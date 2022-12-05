from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import datetime

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(40))
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_picture = db.Column(db.String(255), default="")
    role = db.Column(db.String(40), nullable=False)
    login_by = db.Column(db.String(40), default="")
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
  
    # return password
    @property
    def password(self):
        return self.hashed_password

    # set password with hashed
    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    # check if password is confirmed
    def check_password(self, password):
        return check_password_hash(self.password, password)

    # connect parent (1: user) user to child (*: shopping carts)
    carts = db.relationship('ShoppingCart')
    
    # connect parent (1: user) user to child (*: reviews)
    reviews = db.relationship('Review')
    
    # connect parent (1: user) user to child (*: addresses)
    address_es = db.relationship('Address')
    
    # connect users (*) to product (*) 
    users_products = db.relationship('ProductUser', backref="user", cascade="all, delete")

    # turn user to object (dictionary)
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'profile_picture': self.profile_picture,
            'email': self.email,
            'role': self.role,
            'login_by': self.login_by,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
