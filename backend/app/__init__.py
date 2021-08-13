import os
from flask import Flask, request, jsonify
from flask.wrappers import Request
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

import base64
app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://{user}:{passwd}@{host}:{port}/{table}'.format(
    user=os.getenv('POSTGRES_USER'),
    passwd=os.getenv('POSTGRES_PASSWORD'),
    host=os.getenv('POSTGRES_HOST'),
    port=5432,
    table=os.getenv('POSTGRES_DB'))

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)


class UserModel(db.Model):
    __tablename__ = 'users'

    username = db.Column(db.String(), primary_key=True)
    password = db.Column(db.String())

    def __init__(self, username, password):
        self.username = username
        self.password = password

    def __repr__(self):
        return f"<User {self.username}>"

@app.route('/api/register', methods=('GET', 'POST'))
def register():
    print(request.headers['authorization'])
    encoded = request.headers['authorization']
    data = base64.b64decode(encoded).decode("utf-8")
    print('/login')
    print("encoded data was: " + data)
    print("username is " + data.split(':')[0])
    print("password is: " + data.split(':')[1])
    
    if request.method == 'POST':
        content = request.json
        print(content)
        username = content['username']
        password = content['password']
        error = None

        if not username:
            error = 'Username is required.'
        elif not password:
            error = 'Password is required.'
        elif UserModel.query.filter_by(username=username).first() is not None:
            error = f"User {username} is already registered."

        if error is None:
            new_user = UserModel(username, generate_password_hash(password))
            db.session.add(new_user)
            db.session.commit()
            return {"response" : f"User {username} created successfully"}
        else:
            return {"response" : error}
    return 'not implemented'


@app.route('/api/login', methods=('GET', 'POST'))
def login():
    print(request.headers['authorization'])
    encoded = request.headers['authorization']
    data = base64.b64decode(encoded).decode("utf-8")
    print('/login')
    print("encoded data was: " + data)
    print("username is " + data.split(':')[0])
    print("password is: " + data.split(':')[1])

    return {'response' : 'Login Successful'}
    # the rest of the code does not run
    if request.method == 'POST':

        content = request.json
        print(content['username'])
        username = content['username']
        password = content['password']
        error = None
        
        print([username, password])
        # return {"response" : "Login Successful"}

        #user = UserModel.query.filter_by(username=username).first()
        user = None
        if user is None:
            error = 'Incorrect username.'
        elif not check_password_hash(user.password, password):
            error = 'Incorrect password.'

        if error is None:
            return {"response": "Login Successful"}
        else:
            return {"response": error}
    return 'not implemented'



@app.route('/hello')
def say_hello_world():
    return {'result': "Hello World"}

@app.route('/api/hello')
def say_hello_world():
    return {'result': "Hello World, backend working"}

# @app.route('/login', methods=['POST'])
# def login():
#     print(request)
#     content = request.json
#
#     print(content['username'], content['password'])
#     return (content['username'], content['password'])

# retrieve journal data
@app.route('/api/logs')
def get_logs():
   

    date1 = request.args.get('date') # date = Month-Day format "username-August-3"
    date = date1.split('-', 1)[1]
    user = date1.split('-', 1)[0]

    
    # print(request.headers['authorization'])
    encoded = request.headers['authorization']
    data = base64.b64decode(encoded).decode("utf-8")
    print('/logs')
    print("encoded data was: " + data)
    print("username is " + data.split(':')[0])
    print("password is: " + data.split(':')[1])

    # retrieve journal logs associated with that date here
    sample_response = {
        'August-2' : 'Sample Journal Log \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        'August-3' : 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. ',
        'August-4' : ' Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?'
    }
    return {'response': sample_response[date]}

# retrieve journal dates
@app.route('/api/dates')
def get_dates():
    print(request.headers['authorization'])
    encoded = request.headers['authorization']
    data = base64.b64decode(encoded).decode("utf-8")
    print("encoded data was: " + data)
    print("/dates")
    print("username is " + data.split(':')[0])
    print("password is: " + data.split(':')[1])

    user = request.args.get('user')
    print(user)
    date_column = ["August 4", "August 3", "August 2"]
    output = []
    for date in date_column:
        output.append({"day":date})
    return {'response': output}

# save today's journal
@app.route('/api/savetoday', methods=['POST'])
def save_today():
    content = request.json
    print(request.headers['authorization'])
    encoded = request.headers['authorization']
    data = base64.b64decode(encoded).decode("utf-8")
    print("encoded data was: " + data)
    print("/savetoday")
    print("username is " + data.split(':')[0])
    print("password is: " + data.split(':')[1])

    print(content['logs'])
    print(content['user'])
    # save content['logs'] to db
    return {'response': 'success'}