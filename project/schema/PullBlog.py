from marshmallow import Schema, fields, post_load

class PullBlogObject(object):
    def __init__(self, date='', limit=''):
        self.date = date
        self.limit = limit

    def __repr__(self):
        return '<PullBlog(date={self.date}, limit={self.limit}>'\
                .format(self=self)

class PullBlogSchema(Schema):
    class Meta():
        strict = True

    date = fields.String(required=False)
    limit = fields.Integer(required=True)

    @post_load
    def make_pullblog(self, data):
        return PullBlogObject(**data)
