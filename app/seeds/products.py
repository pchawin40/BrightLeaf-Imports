from app.models import db, Product
from random import randrange

# seed products
def seed_products():
  product_1 = Product(
    name = "Product 1",
    description = "Description of Product 1",
    price = 12.34,
    quantity= randrange(9) + 1,
    preview_image = "url"
  )
  
  product_2 = Product(
    name = "Product 2",
    description = "Description of Product 2",
    price = 20.34,
    quantity= randrange(9) + 1,
    preview_image = "url"
  )
  
  product_3 = Product(
    name = "Product 3",
    description = "Description of Product 3",
    price = 23.45,
    quantity= randrange(9) + 1,
    preview_image = "url"
  )
  
  db.session.add(product_1)
  db.session.add(product_2)
  db.session.add(product_3)
  
  db.session.commit()

# undo products seeds
def undo_products():
  db.session.execute("DELETE FROM products;")
  db.session.commit()
