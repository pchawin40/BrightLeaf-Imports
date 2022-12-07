# Slack Clone Project

Heroku Link: http://brightleaf-imports.herokuapp.com/

GitHub Link: https://github.com/pchawin40/BrightLeaf-Imports

## Setup Directions:

1. Clone from GitHub repository
   1. Run `pipenv install` in the `BrightLeafImports` directory
   2. Switch to the `react-app` directory and run `npm install`
   3. Run `pipenv shell` to start the virtual environment
2. Run the following command in your terminal to run the migration and seeder files within the `BrightLeafImports` directory
   1. `flask db init && flask db migrate && flask db upgrade && flask seed all`
3. Run the following commands to create start a local session
   1. In the `BrightLeafImports` directory, run `flask run`
   2. In the `react-app` directory, run `npm start`

---

## Description:

This is a repository of Brightleaf Imports LLC website revamped by Chawin Pathompornvivat of the original Brightleaf Imports LLC's website: https://www.brightleafimports.com/
<br>
<br>
This project implements 5 features which are all full CRUD actions. Image, Reviews, Shopping Carts, Products, and Addresses.
<br>
<br>
This clone project also implements a feature to allow users to create a new account, sign in with a Demo User or Demo Administrator account, signing in and up with Facebook and Google, and logging out.

---

## Configuration

In the `root` folder, create a `.env` file that will be used to define your environment variables.

Populate the `.env` file based on the example below:

```plaintext
SECRET_KEY=«input_jwt_secret_key_here»
DATABASE_URL=«input_database_url_location_here»
FLASK_DEBUG=«input_flask_debug_boolean_here»
FLASK_ENV=«input_flask_env_mode_here»
S3_BUCKET=«input_aws_bucket_name_here»
S3_KEY=«input_aws_access_key_id_here»
S3_SECRET=«input_aws_secret_access_key_here»
S3_REGION=«input_aws_region_here»
HEROKU_APP_NAME=«input_heroku_app_name_here»
MAPS_API_KEY=«input_google_maps_api_key_here»
STRIPE_PUBLISHABLE_KEY=«input_stripe_publishable_key_here»
STRIPE_SECRET_KEY=«input_stripe_secret_key_here»
EMAIL_USER=«input_email_for_sending_mail_here»
EMAIL_PASSWORD=«input_email_for_sending_password_here»
```

Assign `PORT` to `5000`, and a strong JWT secret.

> Recommendation to generate a strong secret: create a random string using
> `openssl` (a library that should already be installed in your Ubuntu/MacOS
> shell). Run `openssl rand -base64 10` to generate a random JWT secret.

---

### Explore the reference application

- `App`: Does the browser routing
- `About`: Page to describe Brightleaf Imports description
- `AccountMenu`: Page to display account menu that shows their account, saved
  addresses, current orders, and saved wishlists
- `Auth`: Component that contains route to protect from users that are not signed in
- `CheckOutModal`: Modal page that takes user to check out step-by-step of check out process starting from their address to send to, their order reviews, then to page that connect them to Stripe API to check out and process payment
- `Contact`: Page where user are able to contact the root administrator of Brightleaf Imports LLC
- `Footer`: Component that are used to display footer with navigation links and subscription functionality for user
- `ImageModal`: Modal component that allow administrator to update portfolio images
- `LandingPage`: The browser that users first see when they start up the webpage.
- `LoadingScreenModal`: Modal screen that shows initial loading screen as a pseudo-welcoming page
- `NavFooter`: Component that display the developer's LinkedIn and Github links
- `NavHeader`: Component that shows UserModal and ShoppingCartModal. For UserModal, if user is not signed in, it will take the user to sign in/sign up normally or with Google/Facebook. If the user forgot their password, an email will also be sent to their inputted email with passcode verification that allows password changing if verified. For ShoppingCartModal, this allows the user to see what is currently in their cart.
- `NavRight`: This is the main navigation component where user are able to click on whether to navigate to home page, about page, portfolio page, shop all page, or contact page.
- `Portfolio`: This page display all the product and gallery images. If the user is an admin, they are able to add, delete, modify the current display images.
- `ProductFormModal`: This modal component allow administrator to add and modify products.
- `ShippingReturns`: This page display Brightleaf Import's shipping & returns policies and payment methods availability
- `ShopAll`: This page display all the products available to be purchased for the users. Users, and only users, are also able to post reviews of the business. If administrator are logged in, they able to delete products, and add more if desired.
- `ShopProduct`: This page display one product at a time for the user and administrator. The administrator are also able to edit the product. Users, and only logged-in users, are able to toggle likes to add to their wishlists.
- `StorePolicy`: This page display Brightleaf Import's store policies
- `ResourceNotFound`: This page display a welcoming resource not found. User may play Snake Game (an easter egg) or they may exit back to home page in this page component.

---

### Proxy

In this project, two servers will be run on the following addresses:

- `http://localhost:3000` for your frontend
- `http://localhost:5000` for your backend

---

## Brightleaf Imports LLC's Revamped at a Glance

This revamp web project is a fullstack [MERN](https://www.geeksforgeeks.org/mern-stack/) app that lets the user (i.e. buyers and potential customers) do full CRUD for reviews, addresses, and shopping carts including check out their desired items (if available). It also allow administrator (i.e. business owner and their partner(s)) the full CRUD for images and products.

##### BrightLeaf Imports LLC's Revamped at a glance (Landing Page)

![AirBnB at a glance](/readme-resources/at-a-glance.png)

##### BrightLeaf Imports LLC's Revamped at a glance (Portfolio)

![AirBnB at a glance-portfolio](/readme-resources/at-a-glance-portfolio.png)

##### BrightLeaf Imports LLC's Revamped at a glance (Shop All)

![AirBnB at a glance-shop-all](/readme-resources/at-a-glance-product.png)

##### BrightLeaf Imports LLC's Revamped at a glance (Contact)

![AirBnB at a glance-contact](/readme-resources/at-a-glance-contact.png)

##### BrightLeaf Imports LLC's Revamped at a glance (Navigation)

![AirBnB at a glance-navigation](/readme-resources/at-a-glance-nav.png)

##### BrightLeaf Imports LLC's Revamped at a glance (Account Menu)

![AirBnB at a glance-account-menu](/readme-resources/at-a-glance-account-menu.png)

##### BrightLeaf Imports LLC's Revamped at a glance (Checkout)

![AirBnB at a glance-checkout](/readme-resources/at-a-glance-checkout.png)

## Application Architecture and Technologies Used

As noted above, this revamped of Brightleaf Imports LLC's website is a fullstack MERN application. The majority of the application logic occurs within front end's [Redux](https://redux.js.org/) store and its interactions with the [Google Maps API](https://developers.google.com/maps/documentation/) via the [react-google-maps](https://www.npmjs.com/package/react-google-maps) library, [Facebook's Login API](https://developers.facebook.com/apps/525043799200328/fb-login/quickstart/) via the [react-facebook](https://www.npmjs.com/package/react-facebook), [Google's Login API](https://developers.google.com/maps/documentation/) via the [react-oauth/google@latest](https://www.npmjs.com/package/@react-oauth/google), [Moment Package](https://www.npmjs.com/package/moment) for grabbing current time alloted since updated, and [Stripe API](https://stripe.com/docs/api) via the [@stripe/stripe-js](https://www.npmjs.com/package/stripe), and [AWS API](https://aws.amazon.com/console/) via [AWS Management Console](https://hackmd.io/@jpshafto/SyWY45KGu), [SnakeGame](https://www.npmjs.com/package/snake-game-react) for resource not found component.

The backend serves the frontend, responds to frontend requests, acts as an intermediary to serve images, reviews, shopping carts, products, addresses, product-users, and api keys data to the frontend, and fetches data from the SQLite and PostgreSQL database.

---

### Frontend Technologies Used:

#### React

At its core, Brightleaf Imports LLC's revamped is a React application. It uses very little of the core React library besides passing a few props, but makes extensive use of the technologies and libraries of the React ecosystem. Without the robust and well-documented React ecosystem, creating this project would have been a substantially more challenging enterprise.

#### Redux

[Redux](https://redux.js.org/) and the [react-redux](https://react-redux.js.org/) library were used to manage application state and make fetch requests to the server for data.

All information are fetched on page load and kept in the Redux store. While this expensive operation lengthens the initial load time, it also allows for a snappy experience after that load.

By managing states in Redux, it provides easy access to the information across components without prop threading. This was particularly important because there were so many components in the application, largely due to all the products, images, addresses, shopping carts, and reviews being individual components, that if too many components were re-rendering constantly because of state change it would cause significant performance issues or crash the application completely. Redux provided a relatively simple way to manage this point of complexity.

Redux also allows for a lot of extendibility if new features are to be implemented (additional feature wish-list discussed in [conclusion](#conclusion-and-next-steps)).

## Backend Overview

Brightleaf Imports LLC's revamped website uses SQLAlchemy and Flask server with SQLite and PostgreSQL as the database. Compared to the frontend, the backend of this project is fairly simple, with the server sending the front end to the client, receiving requests, and sending data to the frontend.

## Conclusion and Next Steps

Brightleaf Imports LLC's revamped website was fun to build. It made me appreciate the efforts that went into building the popular modern app of today for e-commerce businesses.

This also marks the first time that I've built a fullstack app with payment processing and log-in using api such as Facebook and Google, and my first project of significant scope where I originated the idea and brought it into existence. This revamped website has been an incredibly rewarding to create.
