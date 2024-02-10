from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def connect_db(app):
    db.app = app
    db.init_app(app)
    app.app_context().push()

class User(db.Model):

    def __repr__(self):
        u = self
        return f"User's First Name: {u.first_name}, User's Last Name: {u.last_name}"

    __tablename__ = 'users'

    id = db.Column(
        db.Integer,
        primary_key = True,
        autoincrement = True
    )

    first_name = db.Column(
        db.String,
        nullable = False
    )

    last_name = db.Column(
        db.String,
        nullable = False
    )

    image_url = db.Column(
        db.String
    )

    def info(self):
        return f"self.first_name = {self.first_name} self.last_name = {self.last_name}"