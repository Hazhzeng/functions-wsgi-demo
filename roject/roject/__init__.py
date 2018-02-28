from flask import Flask
import roject.models
import os


TEMPLATE_DIR = os.path.join('./templates')
STATIC_DIR = os.path.join('./static')

app = Flask(
    __name__,
    static_folder=STATIC_DIR,
    template_folder=TEMPLATE_DIR,
)
app.config.from_object(__name__)

app.config.update(dict(
    DATABASE=os.path.join(app.root_path, 'chat.db'),
    DATABASE_INIT_SQL=os.path.join(app.root_path, 'sql', 'init.sql'),
    SECRET_KEY='development',
    USERNAME='admin',
    PASSWORD='default'
))

import roject.views.views
import roject.views.api
