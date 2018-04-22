from datetime import datetime
from flask import render_template
from project import app


@app.route('/home')
@app.route('/post')
@app.route('/info')
@app.route('/')
def index():
    return render_template('index.html')
