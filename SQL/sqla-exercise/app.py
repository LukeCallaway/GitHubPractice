from flask import Flask, request, render_template, redirect, flash, session
from models import db, connect_db, User, Post, Tag, PostTag

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'w3l0v3bl0gging'

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
    posts = Post.query.filter_by(user_id = user_id).all()
    user = db.session.get(User, user_id)
    return render_template('user-page.html', user = user, posts = posts)

@app.route('/users/new')
def create_user():
    return render_template('create-user.html')

@app.route('/users/new', methods=['POST'])
def add_user():
    first_name = request.form['first-name']
    last_name = request.form['last-name']
    image_url = request.form['image-url']
    
    new_user = User(first_name = first_name, last_name = last_name, image_url = image_url)

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

@app.route('/users/<int:user_id>/posts/new')
def create_post_form(user_id):
    user = db.session.get(User, user_id)
    tags = Tag.query.all()

    return render_template('create-post.html', user = user, tags = tags)

@app.route('/users/<int:user_id>/posts/new', methods=['POST'])
def post_post(user_id):
    title = request.form['title']
    content = request.form['content']

    all_tags_on_post = request.form.getlist('tag')

    new_post = Post(title = title, content = content, user_id = user_id)

    db.session.add(new_post)
    db.session.commit()

    for tag_on_post in all_tags_on_post:
        tag_obj = Tag.query.filter(Tag.name == tag_on_post).one()
        new_post_tag = PostTag(post_id = new_post.id, tag_id = tag_obj.id)
        db.session.add(new_post_tag)

    db.session.commit()

    return redirect(f'/users/{user_id}')

@app.route('/post/<int:post_id>')
def show_post(post_id):
    post = db.session.get(Post, post_id)

    tags = post.tags

    return render_template('show-post.html', post = post, tags = tags)

@app.route('/post/<int:post_id>/edit')
def edit_post(post_id):
    post = db.session.get(Post, post_id)
    tags = Tag.query.all()
    post_tags = post.tags

    for tag in post_tags:
        PostTag.query.filter(PostTag.tag_id == tag.id).delete()

    db.session.commit()
    return render_template('edit-post.html', post = post, tags = tags)

@app.route('/post/<int:post_id>/edit', methods=['POST'])
def update_post(post_id):
    updated_post = db.session.get(Post, post_id)
    updated_post.title = request.form['title']
    updated_post.content = request.form['content']

    db.session.add(updated_post)
    db.session.commit()

    all_tags_on_post = request.form.getlist('tag')

    for tag_on_post in all_tags_on_post:
        tag_obj = Tag.query.filter(Tag.name == tag_on_post).one()
        updated_post_tag = PostTag(post_id = updated_post.id, tag_id = tag_obj.id)
        db.session.add(updated_post_tag)

    db.session.commit()

    return redirect(f'/post/{post_id}')

@app.route('/post/<int:post_id>/delete', methods = ['POST'])
def delete_post(post_id):
    posts = db.session.query(Post).filter(Post.id == post_id).all()

    for post in posts:
        db.session.delete(post)

    db.session.commit()

    return redirect(f'/users/{post.user_id}')

@app.route('/tags')
def list_tags():
    tags = Tag.query.all()
    return render_template('list-tags.html', tags = tags)

@app.route('/tags/<int:tag_id>')
def show_tag(tag_id):
    tag = db.session.get(Tag, tag_id)

    related_posts = tag.posts

    return render_template('show-tag.html', tag = tag, related_posts = related_posts)

@app.route('/tags/new')
def create_tag():
    return render_template('create-tag.html')

@app.route('/tags/new', methods = ['POST'])
def post_tag():
    new_tag_name = request.form['name']

    new_tag = Tag(name = new_tag_name)

    db.session.add(new_tag)
    db.session.commit()
    return redirect('/tags')

@app.route('/tags/<int:tag_id>/edit')
def edit_tag(tag_id):
    tag = db.session.get(Tag, tag_id)
    return render_template('edit-tag.html', tag = tag)

@app.route('/tags/<int:tag_id>/edit', methods = ['POST'])
def update_tag(tag_id):
    updated_tag = db.session.get(Tag, tag_id)

    updated_tag.name = request.form['name']

    db.session.add(updated_tag)
    db.session.commit()
    return redirect('/tags')

@app.route('/tags/<int:tag_id>/delete', methods = ['POST'])
def delete_tag(tag_id):
    tags = db.session.query(Tag).filter(Tag.id == tag_id).all()

    for tag in tags:
        db.session.delete(tag)

    db.session.commit()
    return redirect('/tags')
