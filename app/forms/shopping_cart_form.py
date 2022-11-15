from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DecimalField
from wtforms.validators import DataRequired, ValidationError
from app.models import Review

class ShoppingCartForm(FlaskForm):
  product_id = IntegerField('product_id', validators=[DataRequired()])
  user_id = IntegerField('user_id', validators=[DataRequired()])
  quantity = IntegerField('quantity', validators=[DataRequired()])
