from flask_wtf import FlaskForm
from wtforms import BooleanField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import ProductUser

class ProductUserForm(FlaskForm):
  likeToggle = IntegerField('likeToggle', default=False)
  product_id = IntegerField('product_id')
  user_id = IntegerField('user_id')
