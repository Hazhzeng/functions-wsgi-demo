from datetime import datetime
from flask import render_template, Response
from project import app
from .authenticate import login_required

@app.route('/')
@app.route('/index')
@app.route('/home')
def index_view():
    return render_template('index.html')

@app.route('/post')
@login_required
def post_view():
    return render_template('index.html')

@app.route('/info')
def info_view():
    return render_template('index.html')

@app.route('/login')
def login_view():
    return render_template('index.html')

@app.route('/robots.txt')
def robots_txt_view():
    return Response('User-agent: *\nDisallow: /\n')
