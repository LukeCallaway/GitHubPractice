from flask import Flask, request, render_template, redirect, flash, session
from models import db, connect_db, Pet
from forms import AddPetForm

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///adopt_pets'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'p3ts4adp0t1ng'

connect_db(app)

@app.route('/')
def home_page():
    pets = Pet.query.all()
    return render_template('home-page.html', pets = pets)

@app.route('/add', methods=['GET', 'POST'])
def add_pet_form():
    form = AddPetForm()
    if form.validate_on_submit():
        name = form.name.data
        species = form.species.data
        photo_url = form.photo_url.data
        age = form.age.data
        notes = form.notes.data

        new_pet = Pet(name = name, species = species, photo_url = photo_url, age = age, notes = notes)
        db.session.add(new_pet)
        db.session.commit()

        return redirect('/')
    else:
        return render_template('add-pet.html', form = form)

@app.route('/<int:pet_id>', methods=['GET', 'POST'])
def pet_info(pet_id):
    pet = db.session.get(Pet, pet_id)
    form = AddPetForm(obj = pet)
    if form.validate_on_submit():
        name = form.name.data
        species = form.species.data
        photo_url = form.photo_url.data
        age = form.age.data
        notes = form.notes.data

        updated_pet = Pet(name = name, species = species, photo_url = photo_url, age = age, notes = notes)
        db.session.add(updated_pet)
        db.session.commit()

        return redirect('/')

    else:
        return render_template('pet-info.html', pet = pet, form = form)