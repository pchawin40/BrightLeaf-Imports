from flask_wtf import FlaskForm
from wtforms import BooleanField, IntegerField, StringField
from wtforms.validators import DataRequired, ValidationError, Length, AnyOf, URL, Regexp
from app.models import Address
import re

def validatePhoneNum(form, field):
    if not (int(field.data)):
        raise ValidationError("Invalid phone number")

class AddressForm(FlaskForm):
  user_id = IntegerField('user_id')
  company_name = StringField('company_name')
  address = StringField('address')
  address_2 = StringField('address_2')
  city = StringField('city')
  country = StringField('country')
  state = StringField('state')
  zipcode = StringField('zipcode')
  phone = StringField('phone', validators=[Length(min=10, max=10),validatePhoneNum])
  default = BooleanField('default')
  
