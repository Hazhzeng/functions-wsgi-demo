from project import db
from datetime import datetime

class UserModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def __repr__(self):
        return '<User {}>'.format(self.username)


class MessageModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(100), unique=False, nullable=True)
    last_update = db.Column(db.DateTime, nullable=False,
            default=datetime.utcnow)

    def __repr__(self):
        return '<Message {} @ {}>'.format(self.content, self.last_update)


class BlogModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(64), unique=False, nullable=False)
    tag = db.Column(db.String(64), unique=False, nullable=True)
    text = db.Column(db.String(1024), unique=False, nullable=True)
    last_update = db.Column(db.DateTime, nullable=False,
            default=datetime.utcnow)

    def __repr__(self):
        return '<Blog {} @ {}>'.format(self.title, self.last_update)


db.create_all()
