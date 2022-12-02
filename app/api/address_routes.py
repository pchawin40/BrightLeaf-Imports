# app/api/address_routes.py
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.forms import AddressForm
from app.models import User, db, Address
from .auth_routes import validation_errors_to_error_messages

address_routes = Blueprint('addresses', __name__)

#* GET - /api/addresses
#* POST - /api/addresses
@address_routes.route('/', methods=['GET', 'POST'])
@login_required
def get_or_post_addresses():
  """
  Get all of the available addresses
  Create a new address
  """
  #* [POST] create a new address with given information
  if request.method == 'POST':
    form = AddressForm()
    
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    
    # check if pass on submit validation
    if form.validate_on_submit():
      #* check if default address already exist
      # query for default address owned by current user
      default_address_exist = Address.query.filter(Address.default is True and Address.user_id == current_user.get_id()).first()
      
      if default_address_exist:
        return {'errors': f"Cannot have more than one default address for user {user.id}"}, 403
    
      # if default is true, reset other default and make a new default
      if form.data['default']:
        # find any other address that is default and reset it
        current_default_address = Address.query.filter(Address.default == True).first()
        current_default_address.default = False
        db.session.commit()
        
      # create new address
      new_address = Address(
        user_id=current_user.get_id(),
        company_name=form.data['company_name'],
        address=form.data['address'],
        address_2=form.data['address_2'],
        city=form.data['city'],
        country=form.data['country'],
        state=form.data['state'],
        zipcode=form.data['zipcode'],
        phone=form.data['phone'],
        default=form.data['default']
      )
      
      # add and commit new address
      db.session.add(new_address)
      db.session.commit()
      
      #  return successful response
      return new_address.to_dict()

    print()
    print()
    print()
    print()
    print()
    print(validation_errors_to_error_messages(form.errors))
    print()
    print()
    print()
    print()
    print()
    # else if form did not pass validation, return error
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
  
  #* [GET] retrieve all addresses that belong to current user
  # find addresses that belong to current user
  addresses = Address.query.filter(Address.user_id == current_user.get_id())
  
  return {'addresses': {address.id: address.to_dict() for address in addresses}}

#* PUT - /api/addresses/:addressId
#* DELETE - /api/addresses/:addressId
@address_routes.route('/<int:address_id>', methods=['PUT', 'DELETE'])
@login_required
def modify_or_delete_address(address_id):
  """
  Update address by id
  Delete address by id
  """
  # check if address is found
  address = Address.query.get(address_id)
  
  # if address is not found, throw error
  if address is None:
    return {'errors': [f"Address {address_id} does not exist"]}, 404

  #? if found, proceed to update/delete address
  
  #* [PUT] update address with given id
  if request.method == 'PUT':
    # get address data from form
    form = AddressForm()
    
    # validate csrf token
    form['csrf_token'].data = request.cookies['csrf_token']
    
    # check if pass submit validation
    if form.validate_on_submit():
      
      if(form.data['company_name']):
        address.company_name = form.data['company_name']
      if(form.data['address']):
        address.address = form.data['address']
      if(form.data['address_2']):
        address.address_2 = form.data['address_2']
      if(form.data['city']):
        address.city = form.data['city']
      if(form.data['country']):
        address.country = form.data['country']
      if(form.data['state']):
        address.state = form.data['state']
      if(form.data['zipcode']):
        address.zipcode = form.data['zipcode']
      if(form.data['phone']):
        address.phone = form.data['phone']
      
      # if default is true, reset other default and make a new default
      if form.data['default']:
        # find any other address that is default and reset it
        current_default_address = Address.query.filter(Address.default == True).first()
        current_default_address.default = False
        db.session.commit()
        
      address.default = form.data['default']
      
      # commit update
      db.session.commit()
      
      # return successful response
      return address.to_dict()
  
  #* [DELETE] delete address with given id
  if request.method == 'DELETE':
    # if current address is default, make the first address query a default address if any
    if address.default == True:
        new_default_address = Address.query.filter(Address.default == False).first()
        
        if new_default_address:
          new_default_address.default = True
          db.session.commit()
    
    # proceed to delete address
    db.session.delete(address)
    db.session.commit()
    
    # return successful response with delete message
    return {'message': f"Successfully deleted address {address_id}"}
