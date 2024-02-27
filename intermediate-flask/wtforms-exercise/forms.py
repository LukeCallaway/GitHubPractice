from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, BooleanField, IntegerField, SelectField
from wtforms.validators import InputRequired, Optional, URL, NumberRange

class AddPetForm(FlaskForm):

    name = StringField('Name', validators=[InputRequired(message = "Name can't be blank")])

    species = SelectField('Name', choices=['cat', 'dog', 'porcupine'])

    photo_url = StringField('Photo URL', validators=[Optional(), URL()])

    age = IntegerField('Age', validators=[Optional(), NumberRange(min= 0, max = 30, message = 'Please enter an age between 0 and 30')])

    notes = StringField('Notes', validators=[Optional()])