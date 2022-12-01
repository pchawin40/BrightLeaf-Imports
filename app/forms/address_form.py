from flask_wtf import FlaskForm
from wtforms import BooleanField, IntegerField, StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Address

def check_valid_phone(form, field):
  # check if phone is valid
  PHONE_REGEX = "^\\+?[1-9][0-9]{7,14}$"
  
  if not PHONE_REGEX.match(field.data):
    raise ValidationError("Phone number entered is invalid.")

class AddressForm(FlaskForm):
  user_id = IntegerField('user_id')
  company_name = StringField('company_name')
  address = StringField('address', validators=[DataRequired()])
  address_2 = StringField('address_2')
  city = StringField('city', validators=[DataRequired()])
  country = StringField('country', validators=[DataRequired()])
  state = StringField('state')
  zipcode = StringField('zipcode')
  phone = StringField('phone', validators=[DataRequired(), check_valid_phone])
  default = BooleanField('default')
  
