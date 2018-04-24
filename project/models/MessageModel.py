from project import db
from datetime import datetime

class MessageModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(100), unique=False, nullable=True)
    last_update = db.Column(db.DateTime, nullable=False,
            default=datetime.utcnow)

    def __repr__(self):
        return '<Message {} @ {}>'.format(self.content, self.last_update)
