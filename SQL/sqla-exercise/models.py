from flask_sqlalchemy import SQLAlchemy
import datetime

db = SQLAlchemy()

def connect_db(app):
    db.app = app
    db.init_app(app)
    app.app_context().push()

class User(db.Model):

    posts = db.relationship('Post', backref = 'users')

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

class Post(db.Model):

    def __repr__(self):
        return f"Created by: {self.user_id} Title: {self.title} on {self.created_at}"

    __tablename__ = 'posts'

    tags = db.relationship('Tag', secondary = 'posts_tags', backref = 'posts')
    posts_tags = db.relationship('PostTag', backref = 'posts', cascade='all, delete')

    id = db.Column(
        db.Integer,
        primary_key = True,
        autoincrement = True
    )

    title = db.Column(
        db.String,
        nullable = False
    )

    content = db.Column(
        db.String,
        nullable = False
    )

    created_at = db.Column(
        db.String,
        default = datetime.datetime.now()
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey('users.id')
    )

class Tag(db.Model):

    def __repr__(self):
        return f"name = {self.name}"

    __tablename__ = 'tags'

    posts_tags = db.relationship('PostTag', backref = 'tags', cascade='all, delete')

    id = db.Column(
        db.Integer,
        primary_key = True,
        autoincrement = True
    )

    name = db.Column(
        db.String,
        nullable = False,
        unique = True
    )

class PostTag(db.Model):

    __tablename__ = 'posts_tags'

    post_id = db.Column(
        db.Integer,
        db.ForeignKey('posts.id', ondelete='CASCADE'),
        primary_key = True,
        nullable = False
    )

    tag_id = db.Column(
        db.Integer,
        db.ForeignKey('tags.id', ondelete='CASCADE'),
        primary_key = True,
        nullable = False
    )

