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
  for index in range(3):
    current_review_image = Image(
      imageable_id=index + 1,
      imageable_type="None",
      url="None Image URL",
      description=f"None Image {index + 1} URL's description"
    )

    db.session.add(current_review_image)
    db.session.commit()

# undo image seeds
def undo_images():
  db.session.execute('DELETE FROM images;')
  db.session.commit()
