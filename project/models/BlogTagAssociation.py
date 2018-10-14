from datetime import datetime

from project import db

class BlogTagAssociation(db.Model):
    __tablename__ = 'blog_tag_map'
    id = db.Column(
        'Id',
        db.Integer,
        primary_key=True
    )
    blog_id = db.Column(
        'BlogId',
        db.Integer,
        db.ForeignKey('blog.Id')
    )
    tag_id = db.Column(
        'TagId',
        db.Integer,
        db.ForeignKey('tag.Id')
    )
    date_added = db.Column(
        'DateAddedUtc',
        db.DateTime,
        nullable=False,
        default=datetime.utcnow
    )

    tag = db.relationship(
        'TagModel',
        primaryjoin='TagModel.id==BlogTagAssociation.tag_id',
        uselist=False,
    )
    blog = db.relationship(
        'BlogModel',
        primaryjoin='BlogModel.id==BlogTagAssociation.blog_id',
        uselist=False,
    )