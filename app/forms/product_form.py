from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Product

class ProductForm(FlaskForm):
  name = StringField('name', validators=[DataRequired()])
  description = StringField('description')
  price = DecimalField('price', validators=[DataRequired()])
  quantity = IntegerField('quantity', validators=[DataRequired()])
  preview_image = StringField('preview_image')
