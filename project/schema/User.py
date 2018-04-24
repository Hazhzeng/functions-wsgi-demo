from marshmallow import Schema, fields, post_load

class UserObject(object):
    def __init__(self, username, password):
        self.username = username
        self.password = password

    def __repr__(self):
        return '<User(username={self.username})>'.format(self=self)

class UserSchema(Schema):
    class Meta():
        strict = True

    username = fields.String(required=True)
    password = fields.String(required=True)

    @post_load
    def make_user(self, data):
        return UserObject(**data)
