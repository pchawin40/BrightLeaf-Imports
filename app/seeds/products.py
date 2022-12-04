from app.models import db, Product, Image
from random import randrange, uniform

# seed products
def seed_products():    
  
  product_img_urls = [
    "https://res.cloudinary.com/dfz7bzhoi/image/upload/v1668669305/BrightleafImports-ShopAll/55ccf4_e3210146c7ed49ed9530ee309539c3f3_mv2_na76wi.webp",
    "https://res.cloudinary.com/dfz7bzhoi/image/upload/v1668669305/BrightleafImports-ShopAll/55ccf4_a126f00009e349d89cdf4a814b1a0868_mv2_i34utc.webp",
    "https://res.cloudinary.com/dfz7bzhoi/image/upload/v1668669305/BrightleafImports-ShopAll/55ccf4_be69b17336114091846ffc3be845d8a6_mv2_lfwzlw.webp",
    "https://res.cloudinary.com/dfz7bzhoi/image/upload/v1668669305/BrightleafImports-ShopAll/55ccf4_d6fc9ae041c84d8280327dc4b79eb3c9_mv2_xmusxi.webp" 
  ]
  
  #* monkey-pod coffee table
  monkey_pod = Product(
    name = "Monkey Pod (Acacia) Coffee Table",
    description = """Authentic, hand-crafted Monkey Pod coffee table with black, flat bar metal legs.
    \n
    Dimensions:\n
    Width - 28.5 in\n
    Length - 39.5 in.\n
    Height - 26 in.\n
    Depth - 1.75 in.\n
    """,
    price=450,
    quantity= randrange(9) + 1,
    preview_image= "https://res.cloudinary.com/dfz7bzhoi/image/upload/v1668669305/BrightleafImports-ShopAll/55ccf4_be69b17336114091846ffc3be845d8a6_mv2_lfwzlw.webp"
  )
  
  monkey_pod_image = Image(
    imageable_id = 1,
    imageable_type = "ShopAll",
    url="https://res.cloudinary.com/dfz7bzhoi/image/upload/v1668669305/BrightleafImports-ShopAll/55ccf4_be69b17336114091846ffc3be845d8a6_mv2_lfwzlw.webp",
    description="Authentic, hand-crafted Monkey Pod coffee table with black, flat bar metal legs."
  )
  
  monkey_pod_image_2 = Image(
    imageable_id = 1,
    imageable_type = "ShopAll",
    url="https://res.cloudinary.com/dfz7bzhoi/image/upload/v1668711225/BrightleafImports-ShopAll/Product_1_Image_2_rnm071.webp",
    description="Authentic, hand-crafted Monkey Pod coffee table with black, flat bar metal legs.\n"
  )
  
  #* monkey-pod coffee table 2
  monkey_pod_2 = Product(
    name = "Monkey Pod (Acacia) Coffee Table",
    description="""Authentic, hand-crafted Monkey Pod coffee table with black, authentic industrial pipe fitting legs.
    \n
    Dimensions:\n
    Width - 28.5 in.\n
    Length - 39.5 in.\n
    Height - 19.5 in.\n
    Depth - 1.75 in.\n
    """,
    price=450,
    quantity=randrange(9) + 1,
    preview_image = "https://res.cloudinary.com/dfz7bzhoi/image/upload/v1668669305/BrightleafImports-ShopAll/55ccf4_d6fc9ae041c84d8280327dc4b79eb3c9_mv2_xmusxi.webp"
  )
  
  monkey_pod_2_image = Image(
    imageable_id = 2,
    imageable_type = "ShopAll",
    url="https://res.cloudinary.com/dfz7bzhoi/image/upload/v1668711225/BrightleafImports-ShopAll/Product_1_Image_2_rnm071.webp",
    description="Product 1 Image 2"
  )

  #* coasters
  coasters = Product(
    name="Epoxy Filled Monkey Pod Coasters",
    description="Hand-crafted Monkey Pod coasters with epoxy. Coasters come in a set of 3.",
    price=25,
    quantity=randrange(9) + 1,
    preview_image = "https://res.cloudinary.com/dfz7bzhoi/image/upload/v1668669305/BrightleafImports-ShopAll/55ccf4_e3210146c7ed49ed9530ee309539c3f3_mv2_na76wi.webp"
  )
  
  coasters_image = Image(
    imageable_id = 3,
    imageable_type = "ShopAll",
    url="https://res.cloudinary.com/dfz7bzhoi/image/upload/v1668669305/BrightleafImports-ShopAll/55ccf4_e3210146c7ed49ed9530ee309539c3f3_mv2_na76wi.webp",
    description="Hand-crafted Monkey Pod coasters with epoxy. Coasters come in a set of 3."
  )
  
  #* monkey pod 3
  monkey_pod_3 = Product(
    name="Monkey Pod (Acacia) Coffee Table",
    description="""Authentic, hand-crafted Monkey Pod coffee table with black, authentic industrial pipe fitting legs.
    \n
    Dimensions:\n
    Width - 28.5 in.\n
    Length - 39.5 in.\n
    Height - 19.5 in.\n
    Depth - 1.75 in.\n
    """,
    price=450,
    quantity=randrange(9) + 1,
    preview_image = "https://res.cloudinary.com/dfz7bzhoi/image/upload/v1668669305/BrightleafImports-ShopAll/55ccf4_a126f00009e349d89cdf4a814b1a0868_mv2_i34utc.webp"
  )
  
  monkey_pod_3_image = Image(
    imageable_id = 4,
    imageable_type = "ShopAll",
    url="https://res.cloudinary.com/dfz7bzhoi/image/upload/v1668669305/BrightleafImports-ShopAll/55ccf4_a126f00009e349d89cdf4a814b1a0868_mv2_i34utc.webp",
    description="Product 4 Image 1"
  )
  
  monkey_pod_3_image_2 = Image(
    imageable_id = 4,
    imageable_type = "ShopAll",
    url="https://res.cloudinary.com/dfz7bzhoi/image/upload/v1668711679/BrightleafImports-Product/Product_4_Image_2_aphlk6.webp",
    description="Product 4 Image 2"
  )
  
  db.session.add(monkey_pod)
  db.session.add(monkey_pod_image)
  db.session.add(monkey_pod_image_2)
  db.session.add(monkey_pod_2)
  db.session.add(monkey_pod_2_image)
  db.session.add(coasters)
  db.session.add(coasters_image)
  db.session.add(monkey_pod_3)
  db.session.add(monkey_pod_3_image)
  db.session.add(monkey_pod_3_image_2)
  
  db.session.commit()
  
# undo products seeds
def undo_products():
  db.session.execute("DELETE FROM products;")
  db.session.commit()
