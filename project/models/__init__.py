from project import db

from .BlogModel import BlogModel
from .UserModel import UserModel

db.create_all()

__all__ = ['BlogModel', 'UserModel']
