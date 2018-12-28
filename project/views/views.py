from datetime import datetime, timedelta
from flask import (
    render_template,
    make_response,
    Response,
    g,
    redirect,
    jsonify,
    request
)
from project import app, db
from project.models import UserModel
from .wrappers import login_required


@app.route('/')
def home():
    skipPersonalPage = request.cookies.get('skipPersonalPage')
    try:
        isSkipEnable = bool(int(skipPersonalPage))
    except TypeError:
        isSkipEnable = False
    except ValueError:
        isSkipEnable = False

    if isSkipEnable:
        return redirect('/articles', code=302)

    response = make_response(render_template('index.html'))
    response.set_cookie(
        key='skipPersonalPage',
        value='0',
        expires=datetime.utcnow() + timedelta(days=30)
    )
    return response

@app.route('/articles')
@app.route('/account')
@app.route('/tag')
@app.route('/roadmap')
def logout_view():
    return render_template('index.html')


@app.route('/compose')
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
        user = db.session.query(
            UserModel
        ).filter(
            UserModel.token == token
        ).first()
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