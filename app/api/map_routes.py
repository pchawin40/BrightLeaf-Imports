import os
from flask import Blueprint

map_routes = Blueprint('maps', __name__)

#* GET: /api/maps/key
@map_routes.route('/key', methods=['POST'])
def post_map_key():
  """
  Post Map Key: sends public key to backend to encrypt API key to prevent stealing of data
  """
  
  return {"googleMapsAPIKey": os.environ.get('MAPS_API_KEY')}
  
  