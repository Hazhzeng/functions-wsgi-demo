from project import db

class UserModel(db.Model):
    __tablename__ = 'user_model'
    id = db.Column(db.Integer, primary_key=True)

    username = db.Column(db.String(32), unique=True, nullable=False)
    salt = db.Column(db.String(32), unique=False, nullable=False)
    hash = db.Column(db.String(128), unique=False, nullable=False)

    token = db.Column(db.String(32), unique=False, nullable=True)
    register_date = db.Column(db.DateTime, nullable=True)
    login_date = db.Column(db.DateTime, nullable=True)
    login_expiry = db.Column(db.DateTime, nullable=True)

    def __repr__(self):
        return '<User {}>'.format(self.username)
