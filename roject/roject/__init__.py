from flask import Flask
import os

TEMPLATE_DIR = os.path.join('./templates')
STATIC_DIR = os.path.join('./static')

app = Flask(
    __name__,
    static_folder=STATIC_DIR,
    template_folder=TEMPLATE_DIR,
)

import roject.views.views