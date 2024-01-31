from flask import Flask, request, render_template
from stories import Story

app = Flask(__name__)

app.config['SECRET KEY'] = 'secret key'

story = Story(
    ["place", "noun", "verb", "adjective", "plural_noun"],
    """Once upon a time in a long-ago {place}, there lived a
       large {adjective} {noun}. It loved to {verb} {plural_noun}.""")

@app.route('/')
def home_page():
    return render_template('hello.html', prompt_list = story.prompts)

@app.route('/story')
def story_route():
    finished_story = story.generate(request.args.to_dict())
    return render_template('story.html', finished_story = finished_story)