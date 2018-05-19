from project import db
from sqlalchemy import ForeignKey

BlogTagAssociation = db.Table('blog_tag_association', db.Model.metadata,
    db.Column('blog_id', db.Integer, ForeignKey('blog_model.id')),
    db.Column('tag_id', db.Integer, ForeignKey('tag_model.id'))
)