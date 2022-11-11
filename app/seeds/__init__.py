from flask.cli import AppGroup
from .users import seed_users, undo_users
from .images import seed_images, undo_images
from .products import seed_products, undo_products
from .reviews import seed_reviews, undo_reviews
from .shopping_carts import seed_shopping_carts, undo_shopping_carts

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    # Add other seed functions here
    seed_products()
    seed_reviews()
    seed_images()
    seed_shopping_carts()

@seed_commands.command('products')
def test():
    seed_products()

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    # Add other undo functions here
    undo_products()
    undo_reviews()
    undo_images()
    undo_shopping_carts()
