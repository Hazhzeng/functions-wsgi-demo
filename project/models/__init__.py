from project import db

from .BlogModel import BlogModel
from .UserModel import UserModel
from .TagModel import TagModel
from .BlogTagAssociation import BlogTagAssociation

db.create_all()

__all__ = ['BlogModel', 'UserModel', 'TagModel', 'BlogTagAssociation']
