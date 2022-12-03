import os
import smtplib 

from flask import Blueprint
from flask import Flask 
from flask_mail import Mail
from app.forms import EmailForm

mail_routes = Blueprint('mail', __name__)

#* POST: /api/mail/subscribe
@mail_routes.route('/subscribe', methods=['POST'])
def post_subscribe_mail():
    """
    method for using w/ flask_mail and for resetting user's password
    """
    form = EmailForm()
    
    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as connection:  
        email_address = os.environ.get('EMAIL_USER')
        email_password = os.environ.get('EMAIL_PASSWORD')
        connection.login(email_address, email_password )
        connection.sendmail(from_addr=email_address, to_addrs=form.data['email'], 
        msg="subject:Brightleaf Imports Subscription \n\n Hello, you have subscribed to Brightleaf Imports LLC. We'll send you update on our product and any news we may have.")
    
        return "Success"
    return "Failed"
  
