from project import app
from project.views import response
from functools import wraps
from flask import session, redirect, url_for, g

def login_required(func):
    @wraps(func)
    def decorated_function(*args, **kwargs):
        if g.user is None:
            return redirect(url_for('login_view'))
        return func(*args, **kwargs)
    return decorated_function


def login_required_api(func):
    @wraps(func)
    def decorated_function(*args, **kwargs):
        if g.user is None:
            return response.unauthorized()
        return func(*args, **kwargs)
    return decorated_function
