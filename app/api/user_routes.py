# app/api/user_routes.py
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.forms import LoginForm, EditUserForm
from app.models import User, db

user_routes = Blueprint('users', __name__)

#* GET /api/users
@user_routes.route('/', methods=['GET'])
@login_required
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

        if session_role != 'administrator':
            return {'errors': [f"User {session_user.id} does not have permission to modify user {user.id}"]}, 400
    
        # get user data from form
        form = EditUserForm()
        
        # validate csrf token
        form['csrf_token'].data = request.cookies['csrf_token']
        
        #* update user
        if form.validate_on_submit():
            # check for any form errors
            # if first name exist
            if(form.data['first_name']):
                user.first_name = form.data['first_name']

            # if last name exist
            if(form.data['last_name']):
                user.last_name = form.data['last_name']

            # if user name exist
            if(form.data['username']):
                user.username = form.data['username']

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
        return{"errors": [error_values for error in form.errors for error_values in form.errors[error]]}, 400

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
def get_current_user():
    """
    get current user
    """
    user = User.query.get(current_user.get_id())
    return user.to_dict()

#* GET /users/reviews

#* GET /users/shopping-cart
