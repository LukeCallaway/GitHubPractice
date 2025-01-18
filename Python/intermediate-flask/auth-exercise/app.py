from flask import Flask, render_template, redirect, flash, session
from models import db, connect_db, User, Feedback
from forms import RegisterForm, LoginForm, FeedbackForm

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///auth_users'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = '4uth3nt1c4t10n'

connect_db(app)

@app.route('/')
def redirect_to_register():
    return redirect('/register')

@app.route('/login', methods=['GET', 'POST'])
def log_user_in():
    form = LoginForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data

        user = User.authenticate(username, password)
        if user:
            session['username'] = user.username
            return redirect(f'/users/{user.username}')
    return render_template('login.html', form = form)

@app.route('/register', methods=['GET', 'POST'])
def sign_up():
    form = RegisterForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        email = form.email.data
        first_name = form.first_name.data
        last_name = form.last_name.data

        new_user = User.register(username, password, email, first_name, last_name)
        db.session.add(new_user)
        db.session.commit()
        session['username'] = new_user.username

        return redirect(f'/users/{new_user.username}')

    return render_template('register.html', form = form)

@app.route('/users/<username>')
def show_user_page(username):
    user = db.session.get(User, username)
    feedback = Feedback.query.filter_by(username = username). all()

    url_path = check_user(username)
    if url_path is not None:
        return redirect(url_path)

    return render_template('/user-page.html', user = user, feedback = feedback)

@app.route('/users/<username>/feedback/add', methods=['GET', 'POST'])
def add_feedback(username):
    user = db.session.get(User, username)
    form = FeedbackForm()

    url_path = check_user(username)
    if url_path is not None:
        return redirect(url_path)

    if form.validate_on_submit():
        title = form.title.data
        content = form.content.data

        new_feedback = Feedback(title = title, content = content, username = username)
        db.session.add(new_feedback)
        db.session.commit()

        return redirect(f'/users/{username}')

    return render_template('add-feedback.html', user = user, form = form)

@app.route('/feedback/<int:feedback_id>/update', methods=['GET', 'POST'])
def update_feedback(feedback_id):
    updated_feedback = db.session.get(Feedback, feedback_id)
    username = updated_feedback.username
    url_path = check_user(username)
    form = FeedbackForm(obj = updated_feedback)

    if url_path is not None:
        return redirect(url_path)
    
    if form.validate_on_submit():
        updated_feedback.title = form.title.data
        updated_feedback.content = form.content.data

        db.session.add(updated_feedback)
        db.session.commit()

        return redirect(f'/users/{username}')

    return render_template('updated-feedback.html', feedback = updated_feedback, form = form)

@app.route('/feedback/<int:feedback_id>/delete', methods=['POST'])
def delete_feedback(feedback_id):
    feedback = db.session.get(Feedback, feedback_id)
    username = feedback.username
    url_path = check_user(username)

    if url_path is not None:
        return redirect(url_path)
    
    db.session.delete(feedback)
    db.session.commit()

    return redirect(f'/users/{username}')
    

@app.route('/logout')
def log_user_out():
    session.pop('username')
    return redirect('/')

@app.route('/users/<username>/delete', methods=['POST'])
def delete_user(username):
    user = db.session.get(User, username)
    url_path = check_user(username)

    if url_path is not None:
        return redirect(url_path)

    db.session.delete(user)
    db.session.commit()
    return redirect('/register')

def check_user(username):
    logged_in_user = session['username']

    url_path = None

    if 'username' not in session:
        url_path = '/login'

    if logged_in_user != username:
        url_path = f'/users/{logged_in_user}'

    return url_path
