from flask import Flask, request, jsonify
from flask.wrappers import Request
from flask_cors import CORS
from werkzeug.utils import send_from_directory

app = Flask(__name__)
CORS(app)

@app.route('/api/hello')
def say_hello_world():
    return {'result': "Hello World"}

@app.route('/api/login', methods=['POST'])
def login(): 
    print(request)
    content = request.json
    
    print(content['username'], content['password'])
    return (content['username'], content['password'])