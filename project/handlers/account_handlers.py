from typing import List, Dict

import uuid
import bcrypt
from email.utils import parseaddr
from datetime import datetime, timedelta

from project import db
from project.models import UserModel

def is_valid_email(email: str) -> bool:
    parsed_email = parseaddr(email)[1]
    return '@' in parsed_email


def get_user_by_email(email: str) -> bool:
    return db.session.query(UserModel).filter(
        UserModel.username == email
    ).first()


def login_account(email: str) -> UserModel:
    user = db.session.query(UserModel).filter(
        UserModel.username == email
    ).first()

    now = datetime.utcnow()
    expiry = now + timedelta(hours=24)
    token = uuid.uuid4().hex

    user.login_date = now
    user.login_expiry = expiry
    user.token = token
    db.session.add(user)
    return user


def register_account(email: str, password: str) -> UserModel:
    now = datetime.utcnow()
    expiry = now + timedelta(hours=24)
    token = uuid.uuid4().hex
    salt = bcrypt.gensalt()
    encoded_password = password.encode(encoding='utf-8')
    hashed = bcrypt.hashpw(encoded_password, salt)
    new_user = UserModel(
        username=email,
        salt=salt,
        hash=hashed,
        token=token,
        login_date=now,
        login_expiry=expiry,
        register_date=now,
    )
    db.session.add(new_user)
    return new_user


def logout_user(user_id: int) -> None:
    user = db.session.query(UserModel).get(user_id)
    user.token = uuid.uuid4().hex
    db.session.add(user)


def is_account_credential_valid(email: str, password: str) -> bool:
    user = db.session.query(UserModel).filter(
        UserModel.username == email
    ).first()

    if user is None:
        return False

    bcrypt_hash = user.hash.encode(encoding='utf-8')
    encoded_password = password.encode(encoding='utf-8')
    return bcrypt.checkpw(encoded_password, bcrypt_hash)