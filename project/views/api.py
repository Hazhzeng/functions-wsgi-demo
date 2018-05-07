import hashlib, uuid
from flask import request, Response, g, session
from project import app, db
from dateutil import parser
from datetime import datetime, timedelta
from webargs import fields
from webargs.flaskparser import use_args

from project.views import response
from project.schema import BlogSchema
from project.models import BlogModel, UserModel

from .authenticate import login_required_api


@app.route('/api/ping', methods=['GET'])
def ping() -> str:
    return response.ok('pong')


@app.route('/api/postblog', methods=['POST'])
@login_required_api
@use_args(BlogSchema())
def postblog_api(args) -> Response:
    new_blog = BlogModel(title=args.title, tag=args.tag, text=args.text)
    db.session.add(new_blog)
    return response.ok();


@app.route('/api/getblog', methods=['GET'])
@use_args({
    'date': fields.String(),
    'limit': fields.Integer(required=True)
})
def getblog_api(args) -> Response:
    last_update = datetime.utcnow()
    if 'date' in args:
        last_update = parser.parse(args['date'])
        last_update += timedelta(hours=23, minutes=59, seconds=59)

    blogs = db.session.query(BlogModel)\
        .filter(BlogModel.last_update <= last_update)\
        .order_by(BlogModel.last_update.desc())\
        .limit(args['limit'])

    ret = [BlogSchema().dump(blog).data for blog in blogs]
    return response.ok(ret)


@app.route('/api/login', methods=['POST'])
@use_args({
    'username': fields.String(required=True),
    'password': fields.String(required=True)
})
def login_api(args) -> Response:
    username = args['username']
    password = args['password']

    user = db.session.query(UserModel)\
        .filter(UserModel.username == username)\
        .first()
    if user is None:
        return response.unauthorized()
    else:
        expected_hash = user.hash
        calculated_hash = hashlib.sha512(
            (username + password + user.salt).encode('utf-8')
        ).hexdigest()
        if expected_hash != calculated_hash:
            return response.forbidden()

    now = datetime.utcnow()
    token = uuid.uuid4().hex
    user.login_date = now
    user.token = token
    db.session.add(user)

    # Set Token
    res = response.ok()
    res.set_cookie(
        key='token',
        value=token,
        expires=now+timedelta(hours=24),
    )
    return res


@app.route('/api/register', methods=['POST'])
@use_args({
    'username': fields.String(required=True),
    'password': fields.String(required=True)
})
def register_api(args) -> Response:
    username = args['username']
    password = args['password']

    user = db.session.query(UserModel)\
        .filter(UserModel.username == username)\
        .first()
    if user is not None:
        return response.unprocessable_entity()

    now = datetime.utcnow()
    token = uuid.uuid4().hex
    salt = uuid.uuid4().hex
    hash = hashlib.sha512(
        (username + password + salt).encode('utf-8')
    ).hexdigest()
    new_user = UserModel(
        username=username,
        salt=salt,
        hash=hash,
        token=token,
        register_date=now,
    )
    db.session.add(new_user)

    # Set Token
    res = response.created()
    res.set_cookie(
        key='token',
        value=token,
        expires=now+timedelta(hours=24),
    )
    return res


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


@app.after_request
def after_request(res):
    if response.is_success(res.status_code):
        db.session.commit()
    else:
        db.session.rollback()
    return res
