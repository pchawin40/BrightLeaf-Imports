# app/api/user_routes.py
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.forms import LoginForm, EditUserForm, ProductUserForm
from app.models import User, db, Review, ShoppingCart, Product, ProductUser
from .auth_routes import validation_errors_to_error_messages

user_routes = Blueprint('users', __name__)

#* GET /api/users
@user_routes.route('/')
def users():
    """
    get all available users
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}

#* PUT /api/users/:userId
#* DELETE /api/users/:userId
@user_routes.route('/<int:user_id>', methods=['GET', 'PUT', 'DELETE'])
@login_required
def get_or_modify_user(user_id):
    """
    GET: Get given user information
    PUT: Update given user information
    DELETE: Delete given user
    """
    # find user with given id
    user = User.query.get(user_id)

    # get current user information
    session_user = User.query.get(current_user.get_id())
    
    # if no user found, throw error
    if(user == None):
        return {'errors': [f"User {user_id} does not exist"]}, 404
    
    # [PUT] update user information
    if request.method == 'PUT':
        # if current session user is not administrator, throw error saying need permission
        session_role = session_user.role 

        # get user data from form
        form = EditUserForm()
        
        # validate csrf token
        form['csrf_token'].data = request.cookies['csrf_token']
    
        #* update user
        if form.validate_on_submit():
            # check for any form errors
            # if user name exist
            if(form.data['username']):
                user.username = form.data['username']

            # if profile picture exists
            if(form.data['profile_picture']):
                user.profile_picture = form.data['profile_picture']
                
            # if email exist
            if(form.data['email']):
                user.email = form.data['email']

            # if password exist
            if(form.data['password']):
                user.password = form.data['password']

            # if role exist
            if(form.data['role']):
                user.role = form.data['role']
        
            # commit update
            db.session.commit()
            
            # return current user
            return user.to_dict()
    
        # return error if any
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

    # [DELETE] delete user information
    if request.method == 'DELETE':
        # if current session user is not administrator, throw error saying need permission
        session_role = session_user.role
        
        if int(current_user.get_id()) != user_id and session_role != 'administrator':
            return {'errors': [f"User {session_user.id} does not have permission to delete user {user.id}"]}, 400
        
        # delete current user
        db.session.delete(user)
        db.session.commit()
        
        # return successful response with delete message
        return {'message': f"Successfully deleted user {user.id}"}
    
    # [GET] return given user id information
    return user.to_dict()

#* GET - /api/users/current
@user_routes.route('/current')
@login_required
def get_current_user():
    """
    GET: get current user
    """
    user = User.query.get(current_user.get_id())
    return user.to_dict()

#* GET /api/users/reviews
@user_routes.route('/reviews')
@login_required
def user_reviews():
    current_user_reviews = Review.query.filter(Review.user_id == int(current_user.get_id())).all()
    
    return {'reviews': {current_user_review.id: current_user_review.to_dict() for current_user_review in current_user_reviews}}
    
#* GET /api/users/shopping-carts
@user_routes.route('/shopping-carts')
def user_carts():
    """
    GET: get all shopping-carts that belong to user
    """
    current_user_carts = ShoppingCart.query.filter(ShoppingCart.user_id == current_user.get_id()).all()
    
    current_user_cart_displays = {}
    
    # add product name to current_user_carts
    for current_user_cart in current_user_carts:
        name = Product.query.get(current_user_cart.product_id).to_dict()['name']
        
        current_user_cart_display = {
            **current_user_cart.to_dict(),
            "name": name
        }
        
        current_user_cart_displays = {**current_user_cart_displays, current_user_cart.id: current_user_cart_display}
    
    return {'shopping_carts': current_user_cart_displays}

#* GET /api/users/product_users
#* POST /api/users/product_users
@user_routes.route('/product_users', methods=['GET', 'POST'])
def get_or_modify_product_users():
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

#* DELETE /api/users/product_users/:productUserId
@user_routes.route('/product_users/<int:product_user_id>', methods=['PUT', 'DELETE'])
def delete_product_users(product_user_id):
    """
    PUT: Update current user product_users information
    DELETE: Delete current user product_users information
    """
    # check if product_user is found
    product_user = ProductUser.query.get(product_user_id)

    # if not found, throw error (if necessarily)
    if product_user is None:
        return {'errors': [f"Product User {product_user_id} does not exist"]}, 404
    
    # if found, proceed to update/delete product_user
    
    #* [PUT] update product_user with given id
    if request.method == 'PUT':
        # get product_user data from form
        form = ProductUserForm()
        
        # validate csrf token
        form['csrf_token'].data = request.cookies['csrf_token']
        
        # check if pass submit validation
        if form.validate_on_submit():
            # if url exist in form
            if form.data['likeToggle'] and (form.data['likeToggle'] == 0 or form.data['likeToggle'] == 1):
                product_user.likeToggle = form.data['likeToggle']
            
            # commit update
            db.session.commit()
            
            # return successful response
            return product_user.to_dict()
        
        # return error if any
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    
    if request.method == 'DELETE':
        #* [DELETE] delete product_user with given id
        db.session.delete(product_user)
        db.session.commit()

        # return successful response with delete message
        return {'message': f"Successfully deleted product_user {product_user_id}"}
