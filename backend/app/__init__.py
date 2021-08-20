import os
from flask import Flask, request, jsonify
from flask.wrappers import Request
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from datetime import datetime
import base64
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

app = Flask(__name__)
CORS(app)

app.config[
    "SQLALCHEMY_DATABASE_URI"
] = "postgresql+psycopg2://{user}:{passwd}@{host}:{port}/{table}".format(
    user=os.getenv("POSTGRES_USER"),
    passwd=os.getenv("POSTGRES_PASSWORD"),
    host=os.getenv("POSTGRES_HOST"),
    port=5432,
    table=os.getenv("POSTGRES_DB"),
)

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)


class UserModel(db.Model):
    __tablename__ = "users"
    userID = db.Column(db.Integer(), primary_key=True)
    username = db.Column(db.String(), unique=True, nullable=False)
    password = db.Column(db.String(), nullable=False)

    # def __init__(self, userID, username, password):
    #     self.userID = userID
    #     self.username = username
    #     self.password = password

    def __repr__(self):
        return f"<User {self.username}>"


class Journal(db.Model):
    __tablename__ = "journal"

    postId = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    body = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    author_ID = db.Column(db.Integer, db.ForeignKey("users.userID"), nullable=False)
    rela = db.relationship("UserModel", backref="post", lazy=True)

    # def __repr__(self):
    #     return "<Post %r>" % self.title

    def serialize(self):
        return {
            "id": self.id,
            "author_ID": self.author,
            "title": self.title,
            "body": self.body,
            "created_at": self.created_at,
        }


@app.route("/api/savetoday", methods=("GET", "POST"))
def create():
    if request.method == "POST":
        if "authorization" not in request.headers:
            return {"error": "No authorization header detected"}, 403

        encoded = request.headers["authorization"]
        data = base64.b64decode(encoded).decode("utf-8")
        [username, password] = data.strip().split(":")

        # return {"username": username, "password": password}

        user = UserModel.query.filter_by(username=username).first()
        error = None
        if user is None:
            error = "Incorrect username."
        elif not check_password_hash(user.password, password):
            error = "Incorrect password."

        if error is not None:
            error = "Invalid user"
            return {"error": error}, 403
        else:
            content = request.json
            title = content["title"]

            body = content["body"]
            error = None
            if not title:
                error = "You need to enter the title"
            elif not body:
                error = "You need to write the content"
            else:
                user = UserModel.query.filter_by(username=username).first()
                userID = user.userID
                new_journal = Journal(title=title, body=body, author_ID=userID)
                db.session.add(new_journal)
                db.session.commit()
                return {"response": f"{title} posted successfully"}

    return {"response": error}


@app.route("/api/register", methods=("GET", "POST"))
def register():
    if request.method == "POST":
        content = request.json
        name = content["username"]
        pw = content["password"]
        error = None

        if not name:
            error = "Username is required."
        elif not pw:
            error = "Password is required."
        elif UserModel.query.filter_by(username=name).first() is not None:
            error = f"User {name} is already registered."

        if error is None:
            new_user = UserModel(username=name, password=generate_password_hash(pw))
            db.session.add(new_user)
            db.session.commit()
            return {"response": f"User {name} created successfully"}
        else:
            return {"response": error}
    return "not implemented"


@app.route("/api/login", methods=("GET", "POST"))
def login():
    if request.method == "POST":
        content = request.json
        username = content["username"]
        password = content["password"]
        error = None

        user = UserModel.query.filter_by(username=username).first()
        error = None
        if user is None:
            error = "Incorrect username."
        elif not check_password_hash(user.password, password):
            error = "Incorrect password."

        if error is None:
            return {"response": "Login Successful"}

        else:
            return {"response": error}

    return "not implemented"


# retrieve journal data
@app.route("/api/logs")
def get_logs():
    date = request.args.get("date")  # date = d-m-y

    if "authorization" not in request.headers:
        return {"error": "No authorization header detected"}, 403

    encoded = request.headers["authorization"]
    data = base64.b64decode(encoded).decode("utf-8")
    [username, password] = data.strip().split(":")

    # return {"username": username, "password": password}

    user = UserModel.query.filter_by(username=username).first()
    error = None
    if user is None:
        error = "Incorrect username."
    elif not check_password_hash(user.password, password):
        error = "Incorrect password."

    if error is not None:
        error = "Invalid user"
        return {"error": error}, 403
    else:
        userID = user.userID
        posts = Journal.query.filter_by(author_ID=userID).all()

        dataTitle = {}
        dataContent = {}

        for post in posts:
            datetime = post.created_at
            dateString = datetime.strftime("%d-%m-%y-%H:%M:%S")
            dataTitle[dateString] = post.title
            dataContent[dateString] = post.body
        return {"response": dataContent[date], "title": dataTitle[date]}


# retrieve journal dates
@app.route("/api/dates")
def get_dates():

    if "authorization" not in request.headers:
        return {"error": "No authorization header detected"}, 403

    encoded = request.headers["authorization"]
    data = base64.b64decode(encoded).decode("utf-8")
    [username, password] = data.strip().split(":")

    user = UserModel.query.filter_by(username=username).first()
    error = None
    if user is None:
        error = "Incorrect username."
    elif not check_password_hash(user.password, password):
        error = "Incorrect password."

    if error is not None:
        error = "Invalid user"
        return {"error": error}, 403
    else:
        userID = user.userID

        posts = Journal.query.filter_by(author_ID=userID).all()
        data = []
        for post in posts:
            datetime = post.created_at
            date = datetime.strftime("%d-%m-%y-%H:%M:%S")
            # date = datetime.split(" ")[0]
            data.append(date)

        output = []
        for date in data:
            output.append({"day": date})
        print(output)
        return {"response": output}
