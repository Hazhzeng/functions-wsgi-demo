from project import db
from sqlalchemy import ForeignKey

class BlogTagAssociation(db.Model):
    __tablename__ = 'blog_tag'
    id = db.Column(
        'Id',
        db.Integer,
        primary_key=True
    )
    blog_id = db.Column(
        'BlogId',
        db.Integer,
        ForeignKey('BlogModel.id')
    )
    tag_id = db.Column(
        'TagId',
        db.Integer,
        ForeignKey('TagModel.id')
    )