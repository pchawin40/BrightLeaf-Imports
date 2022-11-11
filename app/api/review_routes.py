# app/api/review_routes.py
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.forms import ReviewForm
from app.models import Review, db, Product, User
from .auth_routes import validation_errors_to_error_messages

review_routes = Blueprint('reviews', __name__)
