from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError

class StripeForm(FlaskForm):
  token = StringField('token')
  price = IntegerField('price')
  quantity = IntegerField('quantity')
