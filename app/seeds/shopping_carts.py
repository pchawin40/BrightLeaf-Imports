from app.models import db, ShoppingCart, User, Product

# seed shopping cart
def seed_shopping_carts():
  users = User.query.filter(User.role == 'user').all()
  products = Product.query.all()
  
  for user in users:
    for product in products:
      current_shopping_cart = ShoppingCart(
        user_id = user.id,
        product_id = product.id,
        quantity = product.quantity,
        price = product.price * product.quantity
      )
      
      db.session.add(current_shopping_cart)
      
      db.session.commit()

# undo shopping cart seeds
def undo_shopping_carts():
  db.session.execute("DELETE FROM shopping_carts;")
  db.session.commit()
