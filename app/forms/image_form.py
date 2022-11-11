from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Image

class ImageForm(FlaskForm):
  imageable_id = IntegerField('imageable_id')
  imageable_type = StringField('imageable_type')
  url = StringField('preview_image', validators=[DataRequired()])
  description = StringField('description')
