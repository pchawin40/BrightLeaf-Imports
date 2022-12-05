# app/api/review_routes.py
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.forms import ReviewForm
from app.models import Review, db, Product, User, Image
from .auth_routes import validation_errors_to_error_messages

review_routes = Blueprint('reviews', __name__)

#* GET /api/reviews
@review_routes.route('/')
def reviews():
  """
  GET: Get all of the available reviews
  """
  # return all reviews
  reviews = Review.query.all()
  return {'reviews': {review.id: review.to_dict() for review in reviews}}

#* POST /api/reviews
@review_routes.route('/', methods=['POST'])
@login_required
def secure_reviews():
  """
  POST: Create a new review
  """
  form = ReviewForm()

  # Get the csrf_token from the request cookie and put it into the
  # form manually to validate_on_submit can be used
  form['csrf_token'].data = request.cookies['csrf_token']
  
  # check if pass on submit validation
  if form.validate_on_submit():
    # create new review
    new_review = Review(
      user_id=form.data['user_id'],
      review=form.data['review'],
      stars=form.data['stars']
    )
    
    # add and commit change
    db.session.add(new_review)
    db.session.commit()
    
    # return successful response
    return new_review.to_dict()
  
  print()
  print()
  print()
  print()
  print(validation_errors_to_error_messages(form.errors))
  print()
  print()
  print()
  print()
  
  # else if form did not pass validation, return error
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401

#* GET /api/reviews/:reviewId
@review_routes.route('/<int:review_id>')
def review_by_id(review_id):
  """
  GET: Get image by id
  """
  review = Review.query.get(review_id)
  
  # check if review is found, if not, throw appropriate error
  if review == Gallery:
    return {'errors': [f"Review {review_id} does not exist"]}, 404
  
  # return successful response if found
  return review.to_dict()

#* PUT /api/reviews/:reviewId
#* DELETE /api/reviews/:reviewId
@review_routes.route('/<int:review_id>', methods=['PUT', 'DELETE'])
@login_required
def secure_review_by_id(review_id):
  """
  PUT: Update review by id
  DELETE: Delete review by id
  """
  # get review by review_id
  review = Review.query.get(review_id)
  
  # check if review is found
  if review == None:
    return {'errors': [f"Review {review_id} does not exist"]}, 404
  
  # [PUT]
  if request.method == 'PUT':
    # get review data from form
    form = ReviewForm()
    
    # validate csrf token
    form['csrf_token'].data = request.cookies['csrf_token']
    
    # check if pass submit validation
    if form.validate_on_submit():
      # if review exist
      if form.data['review']:
        review.review = form.data['review']
        
      # if stars exist
      if form.data['stars']:
        review.stars = form.data['stars']
        
      # commit update
      db.session.commit()

      # return successful response
      return review.to_dict()

    # return error if any
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

  # [DELETE]
  if request.method == 'DELETE':
    
    # delete review
    db.session.delete(review)

    # filter through image and get rid of any that are review and imageable id of given review
    destroy_review_images = Image.query.filter(Image.imageable_id == review_id).filter(Image.imageable_type == "Review")
    
    destroy_review_images.delete(synchronize_session=False)
    
    db.session.commit()

    # return successful response with delete review message
    return {'message': f"Successfully deleted review {review.id}"}
