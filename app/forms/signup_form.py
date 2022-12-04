from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
import re

def check_valid_email(form, field):
    EMAIL_REGEX = re.compile(r"[^@]+@[^@]+\.[^@]+")
    
    if not EMAIL_REGEX.match(field.data):
        raise ValidationError("Email entered is invalid.")

def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')

class SignUpForm(FlaskForm):
    username = StringField('user_name', default="User")
    profile_picture = StringField("profile_picture")
    email = StringField('email', validators=[DataRequired(), check_valid_email, user_exists])
    password = StringField('password', validators=[DataRequired()])
    role = StringField('role', validators=[DataRequired()])
    login_by = StringField('login_by', default="")
