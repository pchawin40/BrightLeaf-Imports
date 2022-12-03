from .db import db
import datetime

class Message(db.Model):
  __tablename__ = 'message'
  
  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  
  subject = db.Column(db.String(255), nullable=False, default="Testing Email Sending")
  sender = db.Column(db.String(255), default="brightleafs_imports@mailtrap.io")
  recipient = db.Column(db.String(255), default="pathocha000@gmail.com")
  body = db.Column(db.String(255), default="Email sent successfully")
    
  created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
  updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

  # return mail as object (dictionary)
  def to_dict(self):
    return {
        'id': self.id,
        'subject': self.subject,
        'sender': self.sender,
        'recipient': self.recipient,
        'body': self.body,
        'created_at': self.created_at,
        'updated_at': self.updated_at
    }
