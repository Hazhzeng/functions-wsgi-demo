from datetime import datetime
from flask import render_template
from roject import app

@app.route('/index')
@app.route('/')
def index():
    return render_template('index.html', title='Home Page', year=datetime.now().year)

@app.route('/build/main.js')
def script():
    return 