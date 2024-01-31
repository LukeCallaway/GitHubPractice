from flask import Flask, request, render_template, session, redirect, flash
from surveys import *

app = Flask(__name__)
app.config['SECRET_KEY'] = 'my_secret_key'

responses = []

def add_answer():
    answer = request.args['answer']
    responses.append(answer) 

@app.route('/')
def survey_start():
    return render_template('home-page.html', survey_title = satisfaction_survey.title, survey_instructions = satisfaction_survey.instructions)

@app.route('/question/<int:question_number>')
def question_page(question_number):
    next_q = question_number + 1

    if question_number > len(satisfaction_survey.questions):
        flash("Please fill out the survey questions in order")
        return redirect('/')
    
    elif question_number == len(satisfaction_survey.questions):
        add_answer()
        return render_template('thank-you.html', survey_title = satisfaction_survey.title, responses = responses)
    
    else :
        if question_number != 0:
            add_answer()
        return render_template('questions.html', question = satisfaction_survey.questions[question_number].question, choices =  satisfaction_survey.questions[question_number].choices, next_q = next_q)
