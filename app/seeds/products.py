from app.models import db, Product
from random import randrange, uniform

# seed products
def seed_products():    
  
  product_img_urls = [
    "https://res.cloudinary.com/dfz7bzhoi/image/upload/v1668669305/BrightleafImports-ShopAll/55ccf4_e3210146c7ed49ed9530ee309539c3f3_mv2_na76wi.webp",
    "https://res.cloudinary.com/dfz7bzhoi/image/upload/v1668669305/BrightleafImports-ShopAll/55ccf4_a126f00009e349d89cdf4a814b1a0868_mv2_i34utc.webp",
    "https://res.cloudinary.com/dfz7bzhoi/image/upload/v1668669305/BrightleafImports-ShopAll/55ccf4_be69b17336114091846ffc3be845d8a6_mv2_lfwzlw.webp",
    "https://res.cloudinary.com/dfz7bzhoi/image/upload/v1668669305/BrightleafImports-ShopAll/55ccf4_d6fc9ae041c84d8280327dc4b79eb3c9_mv2_xmusxi.webp" 
  ]
  
  # monkey-pod coffee table
  monkey_pod = Product(
    name = "Monkey Pod (Acacia) Coffee Table",
    description = "Authentic, hand-crafted Monkey Pod coffee table with black, flat bar metal legs. ",
    price=450,
    quantity= randrange(9) + 1,
    preview_image= "https://res.cloudinary.com/dfz7bzhoi/image/upload/v1668669305/BrightleafImports-ShopAll/55ccf4_be69b17336114091846ffc3be845d8a6_mv2_lfwzlw.webp"
  )
  
  # monkey-pod coffee table 2
  monkey_pod_2 = Product(
    name = "Monkey Pod (Acacia) Coffee Table",
    description="Authentic, hand-crafted Monkey Pod coffee table with black, authentic industrial pipe fitting legs. ",
    price=450,
    quantity=randrange(9) + 1,
    preview_image = "https://res.cloudinary.com/dfz7bzhoi/image/upload/v1668669305/BrightleafImports-ShopAll/55ccf4_d6fc9ae041c84d8280327dc4b79eb3c9_mv2_xmusxi.webp"
  )

  # coasters
  coasters = Product(
    name="Epoxy Filled Monkey Pod Coasters",
    description="Hand-crafted Monkey Pod coasters with epoxy. Coasters come in a set of 3. ",
    price=25,
    quantity=randrange(9) + 1,
    preview_image = "https://res.cloudinary.com/dfz7bzhoi/image/upload/v1668669305/BrightleafImports-ShopAll/55ccf4_e3210146c7ed49ed9530ee309539c3f3_mv2_na76wi.webp"
  )
  
  # monkey pod 3
  monkey_pod_3 = Product(
    name="Monkey Pod (Acacia) Coffee Table",
    description="Authentic, hand-crafted Monkey Pod coffee table with black, authentic industrial pipe fitting legs. ",
    price=450,
    quantity=randrange(9) + 1,
    preview_image = "https://res.cloudinary.com/dfz7bzhoi/image/upload/v1668669305/BrightleafImports-ShopAll/55ccf4_a126f00009e349d89cdf4a814b1a0868_mv2_i34utc.webp"
  )
  
  db.session.add(monkey_pod)
  db.session.add(monkey_pod_2)
  db.session.add(coasters)
  db.session.add(monkey_pod_3)
  
  db.session.commit()
  
# undo products seeds
def undo_products():
  db.session.execute("DELETE FROM products;")
  db.session.commit()
