from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Review

class ReviewForm(FlaskForm):
  user_id = IntegerField('user_id', validators=[DataRequired()])
  product_id = IntegerField('product_id', validators=[DataRequired()])
  review = StringField('review')
  stars = IntegerField('stars', validators=[DataRequired()])
