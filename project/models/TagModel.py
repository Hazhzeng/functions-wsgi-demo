from project import db
from datetime import datetime

from .BlogTagAssociation import BlogTagAssociation

class TagModel(db.Model):
    __tablename__ = 'PristineTag'
    id = db.Column(
        'Id',
        db.Integer,
        primary_key=True
    )
    tag = db.Column(
        'Tag',
        db.String(128),
        unique=True,
        nullable=False
    )
    date_added = db.Column(
        'DateAddedUtc',
        db.DateTime,
        nullable=False,
        default=datetime.utcnow
    )

    def __repr__(self):
        return '<Tag {} @ {}>'.format(self.tag, self.date_added)
