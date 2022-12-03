from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import User
import re

class EmailForm(FlaskForm):
  email = StringField('email', validators=[DataRequired()])
