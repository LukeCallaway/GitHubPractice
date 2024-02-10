from flask import Flask, request, render_template, redirect, flash, session
from models import db, connect_db, User

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'w3l0v3b0gging'

connect_db(app)

@app.route('/')
def home_page():
    return redirect('/users')

@app.route('/users')
def users_list():
    users = User.query.all()
    return render_template('users.html', users = users)

@app.route('/users/<int:user_id>')
def user_info(user_id):
    user = db.session.get(User, user_id)
    return render_template('user-page.html', user = user)

@app.route('/users/new')
def create_user():
    return render_template('create-user.html')

@app.route('/users/new', methods=['POST'])
def add_user():
    first_name = request.form['first-name']
    last_name = request.form['last-name']
    image_url = request.form['image-url']
    
    new_user = User(first_name=first_name, last_name=last_name, image_url=image_url)
    db.session.add(new_user)
    db.session.commit()
    return redirect('/users')

@app.route('/users/<int:user_id>/edit')
def edit_user(user_id):
    user = db.session.get(User, user_id)
    return render_template('edit-user.html', user = user)

@app.route('/users/<int:user_id>/edit', methods=['POST'])
def update_user(user_id):
    updated_user = db.session.get(User, user_id)
    updated_user.first_name = request.form['first-name']
    updated_user.last_name = request.form['last-name']
    updated_user.image_url = request.form['image-url']
    
    db.session.add(updated_user)
    db.session.commit()
    return redirect('/users')

@app.route('/users/<int:user_id>/delete', methods=['POST'])
def delete_user(user_id):
    User.query.filter(User.id == user_id).delete()
    db.session.commit()
    return redirect ('/users')