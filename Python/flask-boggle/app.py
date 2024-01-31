from boggle import Boggle
from flask import Flask, request, render_template, redirect, session, jsonify

app = Flask(__name__)
app.config['SECRET_KEY'] = 'abc123'
app.config['TESTING'] = True

boggle_game = Boggle()
game_board = boggle_game.make_board()

@app.route('/')
def home_page():
    """displays the home page"""
    return render_template('home-page.html')
    
@app.route('/game', methods=['GET'])
def game_page():
    """displays the boggle game page and adds the game board to the session"""
    session['game_board'] = game_board
    return render_template('game.html', game_board = game_board)

@app.route('/word-check', methods=['POST'])
def word_check_route():
    """checks if a submitted guess is a valid word and on the board and returns information based on that"""
    session['game_board'] = game_board
    res = request.form['guess-input']
    word_check = boggle_game.check_valid_word(game_board,res)
    return jsonify(word_check)
