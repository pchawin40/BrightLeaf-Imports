from app.models import db, Image, Product, Review

# seed images
def seed_images():
  products = Product.query.all()
  reviews = Review.query.all()
  
  # seed from all products
  for product in products:
    current_product_image = Image(
      imageable_id=product.id,
      imageable_type="Product",
      url="Product Image URL",
      description="Product Image URL's description"
    )
    
    db.session.add(current_product_image)
    db.session.commit()
  
  # seed from all reviews
  for review in reviews:
    current_review_image = Image(
      imageable_id=review.id,
      imageable_type="Review",
      url="Review Image URL",
      description="Review Image URL's description"
    )
    
    db.session.add(current_review_image)
    db.session.commit()
  
  # seed from non-reviews and non-product reviews
  img_urls = [
    "https://res.cloudinary.com/dfz7bzhoi/image/upload/v1668326915/image-gallery_dyqr4i.webp",
    "https://res.cloudinary.com/dfz7bzhoi/image/upload/v1668397930/Brightleaf%20Imports/55ccf4_8fea206650d84f819bf656450d4cce3b_mv2_g8nxt3.webp",
    "https://res.cloudinary.com/dfz7bzhoi/image/upload/v1668397929/Brightleaf%20Imports/55ccf4_7243a2945dd844f6a54ef257ac9c87e8_mv2_ryypnh.webp",
    "https://res.cloudinary.com/dfz7bzhoi/image/upload/v1668397929/Brightleaf%20Imports/55ccf4_08b2360f40244493b52187c8bc8205f9_mv2_vxom8b.webp",
    "https://res.cloudinary.com/dfz7bzhoi/image/upload/v1668397929/Brightleaf%20Imports/55ccf4_493254c77d32482ebf249917294e91a0_mv2_ydbn5v.webp",
    "https://res.cloudinary.com/dfz7bzhoi/image/upload/v1668397929/Brightleaf%20Imports/55ccf4_eef2548fb2d54f948ff7eb3ec3a00ce6_mv2_m6uht3.webp",
  ]
  
  for index in range(len(img_urls)):
    current_review_image = Image(
      imageable_id=index + 1,
      imageable_type="None",
      url=img_urls[index],
      # url="None Image URL",
      description=f"None Image {index + 1} URL's description"
    )

    db.session.add(current_review_image)
    db.session.commit()

# undo image seeds
def undo_images():
  db.session.execute('DELETE FROM images;')
  db.session.commit()
