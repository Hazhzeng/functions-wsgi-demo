from datetime import datetime
from flask import render_template, Response, g, redirect, jsonify, request
from project import app, db
from project.models import UserModel
from .wrappers import login_required

@app.route('/')
def root_view():
    return redirect('/home', 302)

@app.route('/index')
@app.route('/home')
@app.route('/info')
@app.route('/login')
def index_view():
    return render_template('index.html')


@app.route('/post')
@app.route('/logout')
@login_required
def post_view():
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

@app.context_processor
def context_user():
    if g.user:
        return dict(user={
            'username': g.user.username,
            'login_date': g.user.login_date,
            'login_expiry': g.user.login_expiry,
        })
    return dict(user=None)

@app.context_processor
def context_version():
    return dict(version=app.config['VERSION'])