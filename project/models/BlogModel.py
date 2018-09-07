from project import db
from datetime import datetime

from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

class BlogModel(db.Model):
    __tablename__ = 'blog'
    id = db.Column(
        'Id',
        db.Integer,
        primary_key=True
    )
    author_id = db.Column(
        'AuthorId',
        db.Integer,
        ForeignKey('user_model.id')
    )
    title = db.Column(
        'Title',
        db.String(128),
        unique=False,
        nullable=False
    )
    text = db.Column(
        'Text',
        db.String(8192),
        unique=False,
        nullable=True
    )
    last_update = db.Column(
        'LastUpdateUtc',
        db.DateTime,
        nullable=False,
        default=datetime.utcnow
    )

    author = relationship(
        'UserModel',
        primaryjoin='BlogModel.user==UserModel.id',
        uselist=False
    )
    tags = relationship(
        'TagModel',
        primaryjoin='BlogModel.id==BlogTagAssociation.blog_id',
        secondaryjoin='TagModel.id==BlogTagAssociation.tag_id',
        uselist=True,
    )

    def __repr__(self):
        return '<Blog {} @ {}>'.format(self.title, self.last_update)
