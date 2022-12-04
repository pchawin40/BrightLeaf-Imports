import os
from flask import Blueprint

key_routes = Blueprint('keys', __name__)

#* POST: /api/keys
@key_routes.route('/', methods=['POST'])
def post_api_keys():
  """
  POST: Get API Keys
  """
  
  return {
    "googleMapsAPIKey": os.environ.get('MAPS_API_KEY'),
    "recaptchaKey": os.environ.get('RECAPTCHA_KEY')
    }
  
  