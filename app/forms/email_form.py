from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import User
import re

class EmailForm(FlaskForm):
  email = StringField('email', validators=[DataRequired()], default="client@email.com")
  name = StringField('name', default="Client-Name")
  phone = StringField('phone', default="123-456-7890")
  message = StringField('message', default="Message Body")
