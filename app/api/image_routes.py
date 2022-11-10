# app/api/image_routes.py
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.forms import ImageForm
from app.models import User, db, Image

image_routes = Blueprint('images', __name__)

#* GET /images
@image_routes.route('/')
def images():
  """
  Get all availables images
  """
  images = Image.query.all()
  return {'images': {image.id: image.to_dict() for image in images}}
