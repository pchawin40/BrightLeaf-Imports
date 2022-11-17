from app.models import db, Image, Product, Review

# seed images
def seed_images():
  products = Product.query.all()
  reviews = Review.query.all()
  
  product_img_urls = [
    "https://res.cloudinary.com/dfz7bzhoi/image/upload/v1668669305/BrightleafImports-ShopAll/55ccf4_be69b17336114091846ffc3be845d8a6_mv2_lfwzlw.webp",
    "https://res.cloudinary.com/dfz7bzhoi/image/upload/v1668579300/BrightleafImports-Product/55ccf4_a2fde1e3392f4172aae2d60f8210897e_mv2_nraa4q.webp",
    "https://res.cloudinary.com/dfz7bzhoi/image/upload/v1668579298/BrightleafImports-Product/55ccf4_e3210146c7ed49ed9530ee309539c3f3_mv2_iptxen.webp",
    "https://res.cloudinary.com/dfz7bzhoi/image/upload/v1668579298/BrightleafImports-Product/55ccf4_90c3600b4b324f4987ae39983b245941_mv2_besuek.webp",
    "https://res.cloudinary.com/dfz7bzhoi/image/upload/v1668579296/BrightleafImports-Product/55ccf4_95c922943b3f4845b3f01cf335271f85_mv2_nwhjoa.webp",
    "https://res.cloudinary.com/dfz7bzhoi/image/upload/v1668579294/BrightleafImports-Product/55ccf4_84f21d4fbb624523925bdcd5565ab7a9_mv2_xrxdja.webp",
    "https://res.cloudinary.com/dfz7bzhoi/image/upload/v1668579294/BrightleafImports-Product/55ccf4_8764717e909b47168defeb3f4498f1b2_mv2_rdb8it.webp",
    "https://res.cloudinary.com/dfz7bzhoi/image/upload/v1668579292/BrightleafImports-Product/55ccf4_858a7154b0354293881442b3bf585f75_mv2_heqkpm.webp",
    "https://res.cloudinary.com/dfz7bzhoi/image/upload/v1668579291/BrightleafImports-Product/55ccf4_06525651f6f34da498e1af1c2db131da_mv2_dnlepk.webp",
    "https://res.cloudinary.com/dfz7bzhoi/image/upload/v1668579290/BrightleafImports-Product/55ccf4_6ade8de87a5b4468b6cd4d631f0e77c8_mv2_vrwxyp.webp",
    "https://res.cloudinary.com/dfz7bzhoi/image/upload/v1668579289/BrightleafImports-Product/55ccf4_4544a9eb13fb40b69cf2bf25453905bd_mv2_zobjog.webp",
    "https://res.cloudinary.com/dfz7bzhoi/image/upload/v1668579288/BrightleafImports-Product/55ccf4_1b34b92cc0f44d2db0bb83d22fd3be7c_mv2_bailvn.webp"
  ]
  
  for index in range(len(product_img_urls)):
    current_review_image = Image(
      imageable_id=index + 1,
      imageable_type="Product",
      url=product_img_urls[index],
      description=f"Product Image {index + 1} URL's description"
    )

    db.session.add(current_review_image)
    db.session.commit()
  
  # seed from all reviews
  for review in reviews:
    current_review_image = Image(
      imageable_id=review.id,
      imageable_type="Review",
      url="https://res.cloudinary.com/dfz7bzhoi/image/upload/v1668326915/image-gallery_dyqr4i.webp",
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
      imageable_type="Gallery",
      url=img_urls[index],
      # url="Gallery Image URL",
      description=f"Gallery Image {index + 1} URL's description"
    )

    db.session.add(current_review_image)
    db.session.commit()

# undo image seeds
def undo_images():
  db.session.execute('DELETE FROM images;')
  db.session.commit()
