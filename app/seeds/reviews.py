from app.models import db, Review, User, Product
from random import randrange

# seed review
def seed_reviews():
  # query for all users that are not administrator
  users = User.query.filter(User.role == 'user')
  products = Product.query.all()
  
  # for every user
  for user in users:
    # for every product, assume every user are ordering every product
    for product in products:
      current_review = Review(
        user_id = user.id,
        review = f"A review of {product.name} by user {user.id}",
        stars = randrange(5)
      )

      db.session.add(current_review)

      db.session.commit()

# undo review seeds
def undo_reviews():
  db.session.execute("DELETE FROM reviews;")
  db.session.commit()
