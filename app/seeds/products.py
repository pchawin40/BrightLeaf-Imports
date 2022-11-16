from app.models import db, Product
from random import randrange, uniform

# seed products
def seed_products():    
  for index in range(13):
    current_product = Product(
      name = f"Product {index + 1}",
      description = f"Description of Product {index + 1}",
      price = round(uniform(0.00, 500.00), 2),
      quantity= randrange(9) + 1,
      preview_image = "url"
    )
    
    db.session.add(current_product)
    
    db.session.commit()
  
# undo products seeds
def undo_products():
  db.session.execute("DELETE FROM products;")
  db.session.commit()
