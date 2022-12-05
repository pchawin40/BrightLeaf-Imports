from flask import Blueprint, jsonify, session, request, current_app
from app.models import User, db, ProductUser, Product, ShoppingCart
from app.forms import LoginForm, SignUpForm, CustomLoginForm, EditUserForm
from flask_login import current_user, login_user, logout_user, login_required

auth_routes = Blueprint('auth', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append({field: error})
            # errorMessages.append(f'{field} : {error}')
    return errorMessages

#* GET: /api/auth
@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}

#* POST: /api/auth/login
@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

#* POST: /api/auth/login_update
@auth_routes.route('/login_update', methods=['POST'])
def login_update():
    """
    Logs a user in (for editing information)
    """
    form = EditUserForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

#* POST: /api/custom_api/login
@auth_routes.route('/custom_api/login', methods=['POST'])
def custom_api_login():
    """
    Logs a user in
    """
    form = CustomLoginForm()
    
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        # TODO: If no login_by, just find the user (if exists) and then login with no password needed
        if(form['login_by']) is None:
            # find user
            internal_user = User.query.filter(Use.email == form.data['email']).first()
            
            # if user is not found, throw error
            if internal_user is None:
                return {'errors': {"User Not Found": "Given user is not found"}}, 404
        
            # login with no password needed
            login_user(internal_user)
            return internal_user.to_dict()
            
        # check if id already exists
        external_user = User.query.filter(User.email == form.data['email']).first()
        
        # if not, proceed to signup user
        if(external_user == None):
            new_external_user = User(
                username=form.data['name'],
                profile_picture=form.data['profile_picture'],
                email=form.data['email'],
                password="complex_password_123",
                role="user",
                login_by=form.data['login_by']
            )
            
            # Sign up user with all products 
            
            db.session.add(new_external_user)
            db.session.commit()
            
            # query product to add for ProductUser
            products = Product.query.all()
            
            # Sign up user with all products
            for product in products:
                
                # add likeToggle to current product
                current_product_user = ProductUser(
                    likeToggle=True,
                    product_id=product.id,
                    user_id=new_external_user.id
                )
            
                db.session.add(current_product_user)
                
                # Sign up shopping carts
                current_user_carts = ShoppingCart(
                    product_id = product.id,
                    user_id = new_external_user.id,
                    quantity = 0
                )
                
                db.session.add(current_user_carts)
                db.session.commit()
            
            # log in new user
            login_user(new_external_user)
            
            return new_external_user.to_dict()
        
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        
        login_user(user)
        return user.to_dict()
    
    print()
    print()
    print()
    print()
    print(validation_errors_to_error_messages(form.errors))
    print()
    print()
    print()
    print()
    
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

#* GET: /api/auth/logout
@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}

#* POST: /api/auth/signup
@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    # query product to add for ProductUser
    products = Product.query.all()
    
    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            profile_picture=form.data['profile_picture'],
            email=form.data['email'],
            password=form.data['password'],
            role=form.data['role']
        )
        
        db.session.add(user)
        db.session.commit()
        
        # Sign up user with all products
        for product in products:
            # add likeToggle to current product
            current_product_user = ProductUser(
                likeToggle=True,
                product_id=product.id,
                user_id=user.id
            )
            
            db.session.add(current_product_user)
            
            # Sign up shopping carts
            current_user_carts = ShoppingCart(
                product_id = product.id,
                user_id = new_external_user.id,
                quantity = 0
            )
            
            db.session.add(current_user_carts)
            db.session.commit()
        
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

#* GET: /api/auth/unauthorized
@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
        
        
