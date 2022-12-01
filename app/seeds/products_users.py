from app.models import db, ProductUser, Product, User

# seed product_users
def seed_product_users():
  users = User.query.filter(User.role == "user").all()
  products = Product.query.all()
  
  # for every users
  for user in users:
    # for every products
    for product in products:
      # add likeToggle to current product 
      current_product_user = ProductUser(
        likeToggle=True,
        product_id=product.id,
        user_id=user.id
      )

      db.session.add(current_product_user)
      db.session.commit()

# unseed product_users
def undo_product_users():
  db.session.execute('DELETE FROM product_users;')
  db.session.commit()
