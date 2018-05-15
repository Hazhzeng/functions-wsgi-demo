from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os
import json
#import logging

TEMPLATE_DIR = os.path.join('./templates')
STATIC_DIR = os.path.join('./static')

app = Flask(
    __name__,
    static_folder=STATIC_DIR,
    static_url_path='',
    template_folder=TEMPLATE_DIR,
)
app.config.from_object(__name__)

CONFIG_FILE = os.path.join(app.root_path, '..', 'roject.config')
VERSION_FILE = os.path.join(app.root_path, '..', 'version.txt')

with open(VERSION_FILE, 'r') as version_file:
    version = version_file.readline().strip()
    app.config.update(dict(
        VERSION=version
    ))

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

#logging.basicConfig(format='%(asctime)-15s %(message)s')
#logger = logging.getLogger('Roject Logger')

import project.views.views
import project.views.api
