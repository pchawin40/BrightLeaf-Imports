# app/api/image_routes.py
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.forms import ImageForm
from app.models import User, db, Image
from .auth_routes import validation_errors_to_error_messages
from sqlalchemy import or_

image_routes = Blueprint('images', __name__)

#* GET /api/images
#* GET /api/images/search
#* GET /api/images/?Product=True&None=True
# Example of search request args: api/images/?search=Product
@image_routes.route('/')
def images():
  """
  GET: Get all availables images | by search arguments
  """
  # create filter list of the wanted filtered if they are given
  filter_list = []

  if(request.args.get('Product')):
    filter_list.append('Product')

  if(request.args.get('None')):
    filter_list.append('None')
    
  if(request.args.get('Review')):
    filter_list.append('Review')

  # search image by filter_list
  images = Image.query.filter(or_(*[Image.imageable_type.ilike(prefix + "%") for prefix in filter_list])).all()
  
  # return succesful response
  return {'images': {image.id: image.to_dict() for image in images}}

#* POST /api/images
@image_routes.route('/', methods=['POST'])
@login_required
def secure_images():
  """
    POST: Create a new image
  """
  # request method is post, create new image
  form = ImageForm()
    
  # Get the csrf_token from the request cookie and put it into the
  # form manually to validate_on_submit can be used
  form['csrf_token'].data = request.cookies['csrf_token']
  
  # check if pass on submit validation
  if form.validate_on_submit():
    # create new image
    new_image = Image(
      imageable_id=form.data['imageable_id'],
      imageable_type=form.data['imageable_type'],
      url=form.data['url'],
      description=form.data['description']
    )

    # add and commit change
    db.session.add(new_image)
    db.session.commit()

    # return successful response
    return new_image.to_dict()
    
  # else if form did not pass validation, return error
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401

#* GET /api/images/:imageId
@image_routes.route('/<int:image_id>')
def image_by_id(image_id):
  """
  GET: Get image by id
  """
  # get image by image_id
  image = Image.query.get(image_id)
  
  # check if image is found
  if image == None:
    return {'errors': [f"Image {image_id} does not exist"]}, 404
  
  return image.to_dict()

#* PUT /api/images/:imageId
#* DELETE /api/images/:imageId
@image_routes.route('/<int:image_id>', methods=['PUT', 'DELETE'])
@login_required
def secure_image_by_id(image_id):
  """
  PUT: Update image by id
  DELETE: Delete image by id
  """
  # get image by image_id
  image = Image.query.get(image_id)
    
  # check if image is found
  if image == None:
    return {'errors': [f"Image {image_id} does not exist"]}, 404

  # [PUT] 
  if request.method == 'PUT':
          
    # get image data from form
    form = ImageForm()
    
    # validate csrf token
    form['csrf_token'].data = request.cookies['csrf_token']
    
    # check if pass submit validation
    # also check if current user has permission
    if form.validate_on_submit():
      # if url exist in form
      if form.data['url']:
        image.url = form.data['url']
      
      # if description exist in form
      if form.data['description']:
        image.description = form.data['description']
        
      # commit update
      db.session.commit()
      
      # return successful response
      return image.to_dict()
    
    # return error if any
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
  
  # [DELETE]
  if request.method == 'DELETE':
    
    # delete image
    db.session.delete(image)
    db.session.commit()
    
    # return successful response with delete image message
    return {'message': f"Successfully deleted image {image.id}"}
  
#* POST /api/images/sample
@image_routes.route('/images/sample')
def fetch_sample_image():
  """
  Fetch sample image
  """
  pass
