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
- `ShippingReturns`: This page display Brightleaf Import's shipping & returns and store policies
- `ShopAll`: This page display all the products available to be purchased for the users. Users, and only users, are also able to post reviews of the business. If administrator are logged in, they able to delete products, and add more if desired.
- `ShopProduct`: This page display one product at a time for the user and administrator. The administrator are also able to edit the product. Users are 
- `Spot`: Makes a fetch to the backend on mount and update to load the details of the selected Spot.

---

## Landing Page:

Depending on whether the user is logged in, the first screen with direct to either a Login Page:
![Login Page](https://github.com/pchawin40/CSRF-ers/blob/dev/assets/LoginPage.png)
Or the Landing Page:
![Slack Landing Page](https://github.com/pchawin40/CSRF-ers/blob/dev/assets/LandingPage.png).

---

## Main Page:

After logging in, the user will be redirected to the Slack main page: the chat rooms, where the main functionality of the service takes place.
![Chat Page](https://github.com/pchawin40/CSRF-ers/blob/dev/assets/ChatPage.png)

---

## Channels and Direct Message Rooms:

### Create a Channel or a Direct Message Room

Users are able to create a new Channel or Direct Message Room. This will lead them through one or more modal pages that allows them to customize specific details of the newly created Channel/Direct Message Room.
<br>
For example, a user may customize a newly created Channel by customizing the name, public setting, and members.
<br>
Note that unlike Channels, Direct Message Rooms do not have a function of customizing the name or the public setting. This is because DMRs have a default name of all the conversation members and existing DMRs cannot be seen by users that are not a part of them.
<br>
<br>

### Read Channels and Direct Message Rooms:

Redux will load the Channels and Direct Message Rooms the user is a part of on the left side bar. From there, users are able to switch between Channels and Direct Message Room.
<br>
<br>

### Updating Channels:

If the user is the owner of a Channel, right clicking it will open a menu with the option of `Edit Chat`. This option will allow the owner of the Channel to change the Channel name as well as add/remove users.
<br>
_Note_: There is no function of editing Direct Message Rooms of changing the name or adding/removing users. To add users to a Direct Message Room, a new one would need to be created.
<br>
<br>

### Deleting a Channel and Direct Message Room:

If the user is the owner of a Channel, right clicking it will open a menu with an option of `Delete channel`. This will delete the Channel for all users part of the Channel.
<br>
Right clicking a Direct Message Room or a Channel the user is not an owner of will open a menu with only one option: `Leave chat`.

---

## Messages for Channels and Direct Message Rooms:

### Create Messages:

Users are able to send messages in Channels and Direct Message Rooms where only the user and other members of the respective chat room will be able to see the messages.

### Read Messages:

Messages will load via Redux on the Message Display box with the respective sender's name and profile picture.

### Edit/Delete Messages:

Users are able to update their sent messages in Channels and Direct Message Rooms by either editing the sent message or by deleting the messag entirely.

---

## Technologies Used:

This Slack Clone utilizes:

1.  React and Redux to manage reducers, actions, and the store to reduce the amount of times the webpage must be refreshed
2.  Flask, SQLAlchemy, and FlaskForm to manage the database and allow users to interact with the web application
    <br>
    Future technologies that may be utilized are Text Editors (e.g. Lexical) and Socket.io to allow users to send messages in real time and with more customization.

---

## Future Features:

Future features that would need to be added is the ability for users to upload photos/files for their profile picture or attached to messages.
<br>
A bonus feature that would need to be added is having the Channels and Direct Message Rooms playing a sound and displaying a notification note to indicate to the user when they receive a new message.
