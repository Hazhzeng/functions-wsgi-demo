from datetime import datetime
from flask import render_template
from project import app

@app.route('/')
@app.route('/home')
def index_view():
    return render_template('index.html')

@app.route('/post')
def post_view():
    return render_template('index.html')

@app.route('/info')
def info_view():
    return render_template('index.html')

@app.route('/login')
def login_view():
    return render_template('index.html')
