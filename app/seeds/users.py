from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='demo', email='demo@aa.io', password='password', role='administrator')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', role='user')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', role='user')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()

# undo user seeds
def undo_users():
    db.session.execute('DELETE FROM users;')
    db.session.commit()
