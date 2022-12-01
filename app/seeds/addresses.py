from app.models import db, User, Address
import random

# seed addresses
def seed_addresses():
  users = User.query.filter(User.role == "user").all()
  
  # for every user
  for user in users:
    # seed a sample address
    current_address = Address(
      user_id=user.id,
      company_name=f"Company {user.id}",
      address=f"Address of user {user.id}",
      address_2=f"Address 2 of user {user.id}",
      city=f"City of user {user.id}",
      country=f"Country of user {user.id}",
      state=f"State of user {user.id}",
      zipcode="".join(random.sample('0123456789', 5)),
      phone="".join(random.sample('0123456789', 10)),
      default=True
    )
    
    db.session.add(current_address)
    db.session.commit()

# unseed addresses
def undo_addresses():
  db.session.execute('DELETE FROM addresses;')
  db.session.commit()
