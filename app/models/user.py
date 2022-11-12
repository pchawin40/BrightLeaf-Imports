from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import datetime

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(40), nullable=False)
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
    reviews = db.relationship('Review')

    # turn user to object (dictionary)
    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'role': self.role,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
