from project import db

class UserModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(20), unique=False, nullable=False)
    register_date = db.Column(db.DateTime, nullable=True)
    login_date = db.Column(db.DateTime, nullable=True)

    def __repr__(self):
        return '<User {}>'.format(self.username)
