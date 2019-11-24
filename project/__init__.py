from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os
import sys
import json
from urllib.parse import quote_plus

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
config = {}
if os.path.exists(CONFIG_FILE):
    with open(CONFIG_FILE, 'r') as config_file:
        config = json.load(config_file)

app.config.update(dict(
    SQLALCHEMY_DATABASE_URI=''
    '{dialect}+{driver}:///?odbc_connect={odbc}'.format(
        dialect=config.get('dialect') or os.environ.get('DIALECT'),
        driver=config.get('driver') or os.environ.get('DRIVER'),
        odbc=quote_plus(config.get('odbc') or os.environ.get('ODBC'))
    )
))

app.config.update(dict(SQLALCHEMY_TRACK_MODIFICATIONS='False'))

db = SQLAlchemy(app)

from __app__.project.views import views, api
