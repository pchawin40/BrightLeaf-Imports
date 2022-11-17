# app/api/shopping_cart_routes.py
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.forms import ShoppingCartForm
from app.models import ShoppingCart, db, User, Product
from .auth_routes import validation_errors_to_error_messages

shopping_cart_routes = Blueprint('shopping-carts', __name__)

#* GET /api/shopping-carts
@shopping_cart_routes.route('/')
def shopping_carts():
  """
  GET: Get all of the available shopping carts
  """
  # return all shopping carts
  shopping_carts = ShoppingCart.query.all()
  return {'shopping_carts': {shopping_cart.id: shopping_cart.to_dict() for shopping_cart in shopping_carts}}

#* POST /api/shopping-carts
@shopping_cart_routes.route('/', methods=['POST'])
@login_required
def secure_shopping_carts():
  """
  POST: Create a new shopping cart
  """
  form = ShoppingCartForm()
  
  # Get the csrf_token from the request cookie and put it into the
  # form manually to validate_on_submit can be used
  form['csrf_token'].data = request.cookies['csrf_token']

  # check if pass on submit validation
  if form.validate_on_submit():
    # create new shopping cart
    new_shopping_cart = ShoppingCart(
      user_id=form.data['user_id'],
      product_id=form.data['product_id'],
      quantity=form.data['quantity']
    )

    # add and commit change
    db.session.add(new_shopping_cart)
    db.session.commit()
    
    # return successful response
    return new_shopping_cart.to_dict()

  # else if form did not pass validation, return error
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401

#* GET /api/shopping-carts/:shoppingCartId
@shopping_cart_routes.route('/<int:cart_id>')
def cart_by_id(cart_id):
  """
  GET: Get shopping cart by id
  """
  shopping_cart = ShoppingCart.query.get(cart_id)
  
  # if cart not found, throw appropriate error
  if shopping_cart == Gallery:
    return {'errors': [f"Shopping Cart {cart_id} does not exist"]}, 404

  # otherwise, return successful response
  return shopping_cart.to_dict()

#* PUT /api/shopping-carts/:shoppingCartId
#* DELETE /api/shopping-carts/:shoppingCartId
@shopping_cart_routes.route('/<int:cart_id>', methods=['PUT', 'DELETE'])
@login_required
def secure_cart_by_id(cart_id):
  """
  PUT: Update shopping cart by id
  DELETE: Delete shopping cart by id
  """
  # get cart by cart_id
  shopping_cart = ShoppingCart.query.get(cart_id)
  
  # check if cart is found
  if shopping_cart == Gallery:
    return {'errors': [f"Shopping Cart {cart_id} does not exist"]}, 404
  
  # [PUT]
  if request.method == 'PUT':
    # get review data from form
    form = ShoppingCartForm()

    # validate csrf token
    form['csrf_token'].data = request.cookies['csrf_token']

    # check if pass submit validation
    if form.validate_on_submit():

      # if quantity exist
      if form.data['quantity']:
        shopping_cart.quantity = form.data['quantity']

      # commit update
      db.session.commit()
    
      # return successful response
      return shopping_cart.to_dict()

    # return error if any
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

  # [DELETE]
  if request.method == 'DELETE':
    # remove itself from its own model
    # remove all reviews part of given product
    # remove all shopping carts of given product    
    db.session.delete(shopping_cart)
    
    db.session.commit()
    
    # return successful response with delete product message
    return {'message': f"Successfully deleted cart {cart_id}"}
