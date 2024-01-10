# Put your app in here.
from flask import Flask,request
import operations

app = Flask(__name__)

@app.route('/')
def home_page():
    """Simple html displayed to signify this is the home page"""
    html = """
    <html>
        <body>
            <h1>Home Page</h1>
        </body>
    </html>
    """
    return html

# @app.route('/add')
# def add_math():
#     a = request.args['a']
#     b = request.args['b']
#     total = operations.add(int(a),int(b))
#     return f'the total was {total}'

# @app.route('/sub')
# def sub_math():
#     a = request.args['a']
#     b = request.args['b']
#     total = operations.sub(int(a),int(b))
#     return f'the total was {total}'

# @app.route('/mult')
# def mult_math():
#     a = request.args['a']
#     b = request.args['b']
#     total = operations.mult(int(a),int(b))
#     return f'the total was {total}'

# @app.route('/div')
# def div_math():
#     a = request.args['a']
#     b = request.args['b']
#     total = operations.div(int(a),int(b))
#     return f'the total was {total}'

@app.route('/<operation>')
def op_math(operation):
    """Does a certain math operation based on the operation path and parameters put into the query string"""
    a = request.args['a']
    b = request.args['b']
    total = 0

    if operation == 'add':
        total = operations.add(int(a),int(b))

    elif operation == 'sub':
        total = operations.sub(int(a),int(b))

    elif operation == 'mult':
        total = operations.mult(int(a),int(b))

    elif operation == 'div':
        total = operations.div(int(a),int(b))

    return f'the total was {total}'