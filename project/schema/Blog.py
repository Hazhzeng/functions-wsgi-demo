from marshmallow import Schema, fields, post_load

class BlogObject(object):
    def __init__(self, id=0, user=0, title='', tag='', text='', last_update=''):
        self.id = id
        self.user = user
        self.title = title
        self.tag = tag
        self.text = text
        self.last_update = last_update

    def __repr__(self):
        return '<Blog(title={self.title}, tag={self.tag}, text={self.text},'\
    'last_update={self.last_update}>'.format(self=self)

class BlogSchema(Schema):
    class Meta():
        strict = True

    id = fields.Integer(required=False)
    user = fields.Integer(required=False)
    title = fields.String(required=True)
    tag = fields.String(required=False)
    text = fields.String(required=True)
    last_update = fields.DateTime(required=False)

    @post_load
    def make_blog(self, data):
        return BlogObject(**data)
