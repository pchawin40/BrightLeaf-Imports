import os
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager

from .models import db, User
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.image_routes import image_routes
from .api.review_routes import review_routes
from .api.product_routes import product_routes
from .api.shopping_cart_routes import shopping_cart_routes
from .api.key_routes import key_routes
from .api.product_users_routes import product_users_routes
from .api.address_routes import address_routes
from .api.stripe_routes import stripe_routes
from .api.mail_routes import mail_routes

from .seeds import seed_commands

from .config import Config

from .api.auth_routes import validation_errors_to_error_messages

app = Flask(__name__)

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://actual-app-url.herokuapp.com",
        "https://actual-app-url.herokuapp.com"
    ]
else:
    origins = "*"

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'

@login.user_loader
def load_user(id):
    return User.query.get(int(id))

# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(image_routes, url_prefix='/api/images')
app.register_blueprint(review_routes, url_prefix='/api/reviews')
app.register_blueprint(product_routes, url_prefix='/api/products')
app.register_blueprint(shopping_cart_routes, url_prefix='/api/shopping-carts')
app.register_blueprint(key_routes, url_prefix='/api/keys')
app.register_blueprint(product_users_routes, url_prefix='/api/product_users')
app.register_blueprint(address_routes, url_prefix='/api/addresses')
app.register_blueprint(stripe_routes, url_prefix='/api/stripe')
app.register_blueprint(mail_routes, url_prefix='/api/mail')

db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)

# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........
@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')
