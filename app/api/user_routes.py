# app/api/user_routes.py
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.forms import LoginForm, EditUserForm, ProductUserForm
from app.models import User, db, Review, ShoppingCart, Product, ProductUser, Address
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
# @login_required
def get_or_modify_user(user_id):
    """
    GET: Get given user information
    PUT: Update given user information
    DELETE: Delete given user
    """
    # find user with given id
    user = User.query.get(user_id)

    # get current user information
    session_user = User.query.get(current_user.get_id() or user_id)
    
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

#* GET /api/users/addresses
@user_routes.route('/addresses')
def user_addresses():
    """
    GET: get all addresses that belong to current user
    """
    addresses = Address.query.filter(Address.user_id == current_user.get_id()).all()
    
    return {'addresses': {address.id: address.to_dict() for address in addresses}}
