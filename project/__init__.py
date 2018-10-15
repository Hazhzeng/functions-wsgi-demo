from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os
import json

TEMPLATE_DIR = os.path.join('.', 'static')
STATIC_DIR = os.path.join('.', 'static')
DIST_DIR = os.path.join('.', 'static', 'dist')

app = Flask(
    __name__,
    static_folder=STATIC_DIR,
    static_url_path='',
    template_folder=TEMPLATE_DIR,
)
app.config.from_object(__name__)
app.config['TEMPLATE_DIR'] = TEMPLATE_DIR
app.config['STATIC_DIR'] = STATIC_DIR
app.config['DIST_DIR'] = DIST_DIR

CONFIG_FILE = os.path.join(app.root_path, '..', 'roject.config')

with open(CONFIG_FILE, 'r') as config_file:
    config = json.load(config_file)
    app.config.update(dict(
        SQLALCHEMY_DATABASE_URI=''
        '{dialect}+{driver}://{username}:{password}@{host}:{port}/{database}'\
            .format(
                dialect=config['dialect'],
                driver=config['driver'],
                username=config['username'],
                password=config['password'],
                host=config['host'],
                port=config['port'],
                database=config['database'],
            ),
    ))

app.config.update(dict(SQLALCHEMY_TRACK_MODIFICATIONS='False'))

db = SQLAlchemy(app)

import project.views.views
import project.views.api
