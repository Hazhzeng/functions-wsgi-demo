from project import db
from datetime import datetime

class BlogModel(db.Model):
    __tablename__ = 'PristineBlog'
    id = db.Column(
        'Id',
        db.Integer,
        primary_key=True
    )
    author_id = db.Column(
        'AuthorId',
        db.Integer,
        db.ForeignKey('PristineUser.Id')
    )
    title = db.Column(
        'Title',
        db.String(128),
        unique=False,
        nullable=False
    )
    text = db.Column(
        'Text',
        db.Text,
        unique=False,
        nullable=True
    )
    last_update = db.Column(
        'LastUpdateDateUtc',
        db.DateTime,
        nullable=False,
        default=datetime.utcnow
    )

    author = db.relationship(
        'UserModel',
        primaryjoin='UserModel.id==BlogModel.author_id',
        uselist=False,
    )
    tags = db.relationship(
        'TagModel',
        secondary='BlogTagMap',
        uselist=True,
    )

    def __repr__(self):
        return '<Blog {} @ {}>'.format(self.title, self.last_update)
