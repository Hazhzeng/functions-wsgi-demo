from datetime import datetime
from flask import render_template, Response, g, jsonify, request
from project import app, db
from project.models import UserModel
from .wrappers import login_required

@app.route('/')
@app.route('/index')
@app.route('/home')
@app.route('/info')
@app.route('/login')
def index_view():
    if g.user:
        return render_template('index.html', user={
            'username': g.user.username,
            'login_date': g.user.login_date,
        })
    return render_template('index.html')


@app.route('/post')
@login_required
def post_view():
    if g.user:
        return render_template('index.html', user={
            'username': g.user.username,
            'login_date': g.user.login_date,
        })
    return render_template('index.html')


@app.route('/robots.txt')
def robots_txt_view():
    return Response('User-agent: *\nDisallow: /\n')


@app.before_request
def before_request():
    token = request.cookies.get('token')
    if token is not None:
        user = db.session.query(UserModel)\
            .filter(UserModel.token == token)\
            .first()
    else:
        user = None
    g.user = user