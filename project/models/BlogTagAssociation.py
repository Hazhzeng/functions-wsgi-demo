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