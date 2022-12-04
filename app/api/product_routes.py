# app/api/product_routes.py
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.forms import ProductForm
from app.models import Product, db, Image, Review, ShoppingCart
from .auth_routes import validation_errors_to_error_messages

product_routes = Blueprint('products', __name__)

#* GET /api/products
@product_routes.route('/')
def products():
  """
  GET: Get all of the available products
  """
  # return all products
  products = Product.query.all()
  return {'products': {product.id: product.to_dict() for product in products}}

#* POST /api/products
@product_routes.route('/', methods=['POST'])
@login_required
def secure_products():
  """
  POST: Create a new product
  """
  form = ProductForm()

  # Get the csrf_token from the request cookie and put it into the
  # form manually to validate_on_submit can be used
  form['csrf_token'].data = request.cookies['csrf_token']
  
  # check if pass on submit validation
  if form.validate_on_submit():
    # create new product
    new_product = Product(
      name=form.data['name'],
      description=form.data['description'],
      price=form.data['price'],
      quantity=form.data['quantity'],
      preview_image=form.data['preview_image']
    )
    
    # add and commit change
    db.session.add(new_product)
    db.session.commit()
    
    # return successful response
    return new_product.to_dict()
  
  # else if form did not pass validation, return error
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401

#* GET /api/products/:productId
@product_routes.route('/<int:product_id>')
def product_by_id(product_id):
  """
  GET: Get product by id
  """
  product = Product.query.get(product_id)
  
  # if product not found, throw appropriate error
  if product == None:
    return {'errors': [f"Product {product_id} does not exist"]}, 404
  
  # otherwise, return successful response
  return product.to_dict()

#* PUT /api/products/:productId
#* DELETE /api/products/:productId
@product_routes.route('/<int:product_id>', methods=['PUT', 'DELETE'])
@login_required
def secure_product_by_id(product_id):
  """
  PUT: Update product by id
  DELETE: Delete product by id
  """
  # get product by product_id
  product = Product.query.get(product_id)
  
  # check if product is found
  if product == None:
    return {'errors': [f"Product {product_id} does not exist"]}, 404
  
  # [PUT]
  if request.method == 'PUT':
    # get review data from form
    form = ProductForm()
    
    # validate csrf token
    form['csrf_token'].data = request.cookies['csrf_token']
    
    # check if pass submit validation
    if form.validate_on_submit():
      # if name exist
      if form.data['name']:
        product.name = form.data['name']
        
      # if description exist
      if form.data['description']:
        product.description = form.data['description']
      
      # if price exist
      if form.data['price']:
        product.price = form.data['price']
        
      # if quantity exist
      if form.data['quantity'] or form.data['quantity'] == 0:
        product.quantity = form.data['quantity']
      
      # if preview_image exist
      if form.data['preview_image']:
        product.preview_image = form.data['preview_image']
    
      # commit update
      db.session.commit()
    
      # return successful response
      return product.to_dict()

    # return error if any
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

  # [DELETE]
  if request.method == 'DELETE':
    # remove all images part of product 4
    destroy_shopall_images = Image.query.filter(Image.imageable_id == product_id).filter(Image.imageable_type == "ShopAll")

    destroy_shopall_images.delete(synchronize_session=False)

    # remove itself from its own model
    # remove all reviews part of given product
    # remove all shopping carts of given product
    db.session.delete(product)
    
    db.session.commit()
    
    # return successful response with delete product message
    return {'message': f"Successfully deleted product {product.id}"}
