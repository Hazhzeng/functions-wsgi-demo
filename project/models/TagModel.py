from project import db
from datetime import datetime
from sqlalchemy.orm import relationship

from .BlogTagAssociation import BlogTagAssociation

class TagModel(db.Model):
    __tablename__ = 'tag_model'
    id = db.Column(db.Integer, primary_key=True)
    tag = db.Column(db.String(128), unique=False, nullable=True)
    date_added = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    
    blogs = relationship('BlogModel',
        secondary=BlogTagAssociation,
        back_populates='tags',
        uselist=True,
    )

    def __repr__(self):
        return '<Tag {} @ {}>'.format(self.tag, self.date_added)