from datetime import datetime
from flask import render_template, Response, g, redirect, jsonify, request
from project import app, db
from project.models import UserModel
from .wrappers import login_required


@app.route('/')
def index():
    return redirect('/articles')


@app.route('/articles')
@app.route('/account')
def logout_view():
    return render_template('index.html')


@app.route('/edit')
@app.route('/logout')
@login_required
def login_view():
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
            'id': g.user.id,
            'username': g.user.username,
            'login_date': g.user.login_date,
            'login_expiry': g.user.login_expiry,
        })
    return dict(user=None)