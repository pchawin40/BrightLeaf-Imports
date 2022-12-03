import os
import smtplib 

from flask import Blueprint, jsonify, request
from flask import Flask 
from app.forms import EmailForm
from .auth_routes import validation_errors_to_error_messages

mail_routes = Blueprint('mail', __name__)

#* POST: /api/mail/subscribe
@mail_routes.route('/subscribe', methods=['POST'])
def post_subscribe_mail():
    """
    method for using w/ flask_mail and for resetting user's password
    """
    
    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as connection:  
      form = EmailForm()
      
      # validate csrf token
      form['csrf_token'].data = request.cookies['csrf_token']
      
      if form.validate_on_submit():
        email_address = os.environ.get('EMAIL_USER')
        email_password = os.environ.get('EMAIL_PASSWORD')
        connection.login(email_address, email_password )
        connection.sendmail(from_addr=email_address, to_addrs=form.data['email'], 
        msg="subject:Brightleaf Imports Subscription \n\n Hello, you have subscribed to Brightleaf Imports LLC. We'll send you update on our product and any news we may have.")

        return "Success"
      return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    return {'errors': [f"Email was not sent successfully"]}, 404
      
  
