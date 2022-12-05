import os
from app.models import User, db
from flask_login import login_required, current_user
from flask import Blueprint, jsonify, request
from app.forms import StripeForm
import stripe

stripe_routes = Blueprint('stripe', __name__)

#* POST: /api/stripe/charge
@stripe_routes.route('/charge', methods=['POST'])
def post_stripe_charge():
  """
  POST: Process Stripe Charge 
  """
  stripe.api_key = os.environ.get('STRIPE_SECRET_KEY')

  form = StripeForm()

  # validate csrf token
  form['csrf_token'].data = request.cookies['csrf_token']
  
  #* update user
  if form.validate_on_submit():
    url = ""
  
    if os.environ.get('FLASK_ENV') == 'production':
        # return user back to homepage
        url = request.url.replace('/account/my-orders', '/', 1)
        code = 301
        return redirect(url, code=code)
    else:
      # otherwise set it to official website
      url = "http://localhost:3000/"
    
    session = stripe.checkout.Session.create(
      line_items=[
        {
          "price_data": {
            "currency": "usd",
            "product_data": {"name": "Brightleaf Imports LLC"},
            "unit_amount": form.data['price'],
          },
          "quantity": 1,
        },
        ],
      mode="payment",
      success_url=url,
      cancel_url=url,
    )

    return {"session_url": session.url}
  
  return {"Test Failed"}
