from project import db
from datetime import datetime

from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

class BlogModel(db.Model):
    __tablename__ = 'blog_model'
    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.Integer, ForeignKey('user_model.id'))
    title = db.Column(db.String(128), unique=False, nullable=False)
    tag = db.Column(db.String(128), unique=False, nullable=True)
    text = db.Column(db.String(8192), unique=False, nullable=True)
    last_update = db.Column(db.DateTime, nullable=False,
            default=datetime.utcnow)

    author = relationship('UserModel')

    def __repr__(self):
        return '<Blog {} @ {}>'.format(self.title, self.last_update)
