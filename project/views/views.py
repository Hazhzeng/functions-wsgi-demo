from datetime import datetime
from flask import render_template
from project import app


@app.route('/index')
@app.route('/')
def index():
    return render_template('index.html')
