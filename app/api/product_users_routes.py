# app/api/user_routes.py
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.forms import ProductUserForm
from app.models import User, db, Product, ProductUser
from .auth_routes import validation_errors_to_error_messages

product_users_routes = Blueprint('product_users', __name__)

#* GET /api/product_users
#* POST /api/product_users
@product_users_routes.route('/', methods=['GET', 'POST'])
def get_or_post_product_users():
    """
    GET: Get current user product_users information
    POST: Create current user product_users information
    """    
    #* [POST] create a new product_user with given information
    if request.method == 'POST':
        form = ProductUserForm()
        
        # Get the csrf_token from the request cookie and put it into the
        # form manually to validate_on_submit can be used
        form['csrf_token'].data = request.cookies['csrf_token']
        
        # check if pass on submit validation
        if form.validate_on_submit():
            # if product_user already exist with product_id and user_id, throw error
            check_product_user = ProductUser.query.filter(ProductUser.product_id == form.data['product_id'] and ProductUser.product_id == current_user.get_id()).first()
            
            if check_product_user != None:
                return {'errors': f"Product_User with product id {form.data['product_id']} and user id {current_user.get_id()} already exists with id {check_product_user.id}."}, 403
            
            # create new product_user
            new_product_user = ProductUser(
                likeToggle=form.data['likeToggle'],
                product_id=form.data['product_id'],
                user_id=current_user.get_id()
            )
            
            # add and commit new product user
            db.session.add(new_product_user)
            db.session.commit()
            
            # return successful response
            return new_product_user.to_dict()
        
        # else if form did not pass validation, return error
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
        
    #* [GET] retrieve all product_users that belong to current users
    # find product_users that belong to current user
    product_users = ProductUser.query.filter(ProductUser.user_id == current_user.get_id())
    
    return {'product_users': [product_user.to_dict() for product_user in product_users]}

#* PUT /api/product_users/:productUserId
#* DELETE /api/product_users/:productUserId
@product_users_routes.route('/<int:product_user_id>', methods=['PUT', 'DELETE'])
@login_required
def modify_or_delete_product_users(product_user_id):
    """
    PUT: Update current user product_users information
    DELETE: Delete current user product_users information
    """
    # check if product_user is found
    product_user = ProductUser.query.get(product_user_id)

    # if not found, throw error (if necessarily)
    if product_user is None:
        return {'errors': [f"Product User {product_user_id} does not exist"]}, 404
    
    #? if found, proceed to update/delete product_user
    
    #* [PUT] update product_user with given id
    if request.method == 'PUT':
        # get product_user data from form
        form = ProductUserForm()
        
        # validate csrf token
        form['csrf_token'].data = request.cookies['csrf_token']
        
        # check if pass submit validation
        if form.validate_on_submit():
            product_user.likeToggle = form.data['likeToggle']
            
            # commit update
            db.session.commit()
            
            # return successful response
            return product_user.to_dict()
        
        # return error if any
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    
    #* [DELETE] delete product_user with given id
    if request.method == 'DELETE':
        # proceed to delete product_user
        db.session.delete(product_user)
        db.session.commit()

        # return successful response with delete message
        return {'message': f"Successfully deleted product_user {product_user_id}"}
