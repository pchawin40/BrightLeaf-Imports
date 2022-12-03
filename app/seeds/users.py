from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='demo', email='demo@aa.io', password='password', role='administrator')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', role='user')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', role='user')
    test_login = User(
        username='test_login', email='pathocha000@gmail.com', password='password', role='administrator')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(test_login)

    db.session.commit()

# undo user seeds
def undo_users():
    db.session.execute('DELETE FROM users;')
    db.session.commit()
