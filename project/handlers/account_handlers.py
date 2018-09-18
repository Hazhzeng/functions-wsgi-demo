from typing import List, Dict
from project import db
from email.utils import parseaddr

from project.models import UserModel
from .exceptions import UserNotFoundException

def is_valid_email(email: str) -> bool:
    parsed_email = parseaddr(email)[1]
    return '@' in parsed_email


def get_user_by_email(email: str) -> bool:
    user = db.session.query(UserModel).filter(
        UserModel.username == email
    ).first()
    
    if user is None:
        raise UserNotFoundException
    return user