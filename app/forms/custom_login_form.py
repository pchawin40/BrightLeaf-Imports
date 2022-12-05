from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError

class CustomLoginForm(FlaskForm):
    id = StringField('id')
    email = StringField('email', validators=[DataRequired()])
    password = StringField('password', default="")
    login_by = StringField('login_by', default="")
    name = StringField('name')
    profile_picture = StringField('profile_picture')
