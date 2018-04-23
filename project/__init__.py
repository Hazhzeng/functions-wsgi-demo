from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
import os
import logging

TEMPLATE_DIR = os.path.join('./templates')
STATIC_DIR = os.path.join('./static')


app = Flask(
    __name__,
    static_folder=STATIC_DIR,
    static_url_path='',
    template_folder=TEMPLATE_DIR,
)
app.config.from_object(__name__)

app.config.update(dict(
    SQLALCHEMY_DATABASE_URI='sqlite:////{}'\
        .format(os.path.join(app.root_path, 'sql', 'chat.db')),
    SQLALCHEMY_TRACK_MODIFICATIONS='False',
    DATABASE_INIT_SQL=os.path.join(app.root_path, 'sql', 'init.sql'),
    SECRET_KEY='development',
    USERNAME='admin',
    PASSWORD='default'
))

db = SQLAlchemy(app)

login_manager = LoginManager()
login_manager.init_app(app)

logging.basicConfig(format='%(asctime)-15s %(message)s')
logger = logging.getLogger('Roject Logger')

import project.views.views
import project.views.api
