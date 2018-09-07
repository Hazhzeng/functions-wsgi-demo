from project import db

class UserModel(db.Model):
    __tablename__ = 'user'
    id = db.Column(
        'Id',
        db.Integer,
        primary_key=True
    )
    username = db.Column(
        'Username',
        db.String(32),
        unique=True,
        nullable=False
    )
    salt = db.Column(
        'Salt',
        db.String(32),
        unique=False,
        nullable=False
    )
    hash = db.Column(
        'Hash',
        db.String(128),
        unique=False,
        nullable=False
    )
    token = db.Column(
        'Token',
        db.String(32),
        unique=False,
        nullable=True
    )
    register_date = db.Column(
        'RegisterationDateUtc',
        db.DateTime,
        nullable=True
    )
    login_date = db.Column(
        'LoginDateUtc',
        db.DateTime,
        nullable=True
    )
    login_expiry = db.Column(
        'ExpiryDateUtc',
        db.DateTime,
        nullable=True
    )

    def __repr__(self):
        return '<User {}>'.format(self.username)
