from project import db

from .BlogModel import BlogModel
from .MessageModel import MessageModel
from .UserModel import UserModel

db.create_all()

__all__ = ['BlogModel', 'MessageModel', 'UserModel']
