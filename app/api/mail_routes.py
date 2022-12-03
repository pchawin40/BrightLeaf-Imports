import os
import smtplib 
from app.models import User, db
from flask import Blueprint, jsonify, request
from flask import Flask 
from app.forms import EmailForm
from .auth_routes import validation_errors_to_error_messages

mail_routes = Blueprint('mail', __name__)

#* POST: /api/mail/subscribe
@mail_routes.route('/subscribe', methods=['POST'])
def post_subscribe_mail():
    """
    POST: Method for sending subscription email
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

        return "Email sent successfully"
      return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    return {'errors': [f"Email was not sent successfully"]}, 404
      
#* POST: /api/mail/contact
@mail_routes.route('/contact', methods=['POST'])
def post_contact_from_user():
    """
    POST: Retrieving contact email from user
    """
    
    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as connection:  
      form = EmailForm()
      
      # validate csrf token
      form['csrf_token'].data = request.cookies['csrf_token']
      
      if form.validate_on_submit():
        email_address = os.environ.get('EMAIL_USER')
        email_password = os.environ.get('EMAIL_PASSWORD')
        connection.login(email_address, email_password )
        # send to business email
        connection.sendmail(from_addr=email_address, to_addrs=email_address,
        msg=f"""subject:Contact from Customer \n\n 
        Client contact: {form.data['name']} (phone: {form.data['phone']}) inquires:\n\n
        Message:
        {form.data['message']}
        """)

        # send a copy to client
        connection.sendmail(from_addr=email_address, to_addrs=form.data['email'], 
        msg=f"""subject:We have received your email \n
        Thank you for contacting Brightleaf Imports LLC. We have received your email.
        
        Here's what you've sent:\n
        {form.data['message']}
        \n\n
        Contact Information: 
        name: {form.data['name']}
        phone: {form.data['phone']}
        """)

        return "Email sent successfully"
      return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    return {'errors': [f"Email was not sent successfully"]}, 404

#* POST: /api/mail/forgot_password
@mail_routes.route('/forgot_password', methods=['POST'])
def post_password_recovery():
    """
    POST: Method for sending password recovery
    """
    
    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as connection:  
      form = EmailForm()
      
      # validate csrf token
      form['csrf_token'].data = request.cookies['csrf_token']
      
      if form.validate_on_submit():
        # check if user is found
        user = User.query.filter(User.email == form.data['email']).first()
        
        # if not found, throw an appropriate error
        if user == None:
          return {'errors': [f"Email does not exist in our database."]}, 404
        else:
          # if found, proceed to send to email
          email_address = os.environ.get('EMAIL_USER')
          email_password = os.environ.get('EMAIL_PASSWORD')
          connection.login(email_address, email_password )
          connection.sendmail(from_addr=email_address, to_addrs=form.data['email'],
          msg=f"""subject:Password Recovery \n\n 
          Hello, please enter this code validation to reset your password: 1234
          """)

          return "Email sent successfully"
      return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    return {'errors': [f"Email was not sent successfully"]}, 404
