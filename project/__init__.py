from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os
import json
#import logging

TEMPLATE_DIR = os.path.join('.', 'static')
STATIC_DIR = os.path.join('.', 'static')

app = Flask(
    __name__,
    static_folder=STATIC_DIR,
    static_url_path='',
    template_folder=TEMPLATE_DIR,
)
app.config.from_object(__name__)

CONFIG_FILE = os.path.join(app.root_path, '..', 'roject.config')

with open(CONFIG_FILE, 'r') as config_file:
    config = json.load(config_file)
    app.config.update(dict(
        SQLALCHEMY_DATABASE_URI='sqlite:////{}'\
            .format(os.path.join(app.root_path, 'sql', config['database'])),
        SECRET_KEY=config['secret_key'],
        USERNAME=config['username'],
        PASSWORD=config['password'],
    ))

app.config.update(dict(
    SQLALCHEMY_TRACK_MODIFICATIONS='False',
))

db = SQLAlchemy(app)

import project.views.views
import project.views.api
