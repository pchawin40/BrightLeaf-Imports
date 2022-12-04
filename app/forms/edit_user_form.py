from flask_wtf import FlaskForm
from wtforms import StringField
from flask_login import current_user
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
import re

def check_valid_email(form, field):
    EMAIL_REGEX = re.compile(r"[^@]+@[^@]+\.[^@]+")
    
    if field.data != "" and not EMAIL_REGEX.match(field.data):
        raise ValidationError("Email entered is invalid.")

def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).filter(current_user.get_id() != User.id).first()
    if user:
      raise ValidationError('Email address is already in use.')

class EditUserForm(FlaskForm):
    username = StringField('user_name', default="User")
    profile_picture = StringField("profile_picture")
    email = StringField('email', validators=[user_exists, check_valid_email])
    password = StringField('password')
    role = StringField('role')
