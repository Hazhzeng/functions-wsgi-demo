from marshmallow import Schema, fields, post_load

class MessageObject(object):
    def __init__(self, msg):
        self.msg = msg

    def __repr__(self):
        return '<Message(msg={self.msg})>'.format(self=self)

class MessageSchema(Schema):
    class Meta():
        strict = True

    msg = fields.String(required=True)

    @post_load
    def make_message(self, data):
        return MessageObject(**data)
