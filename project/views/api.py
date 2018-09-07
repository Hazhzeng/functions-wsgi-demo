import hashlib, uuid
from flask import Response, g, session, request, json
from flask.views import MethodView
from dateutil import parser
from datetime import datetime, timedelta
from webargs import fields
from webargs.flaskparser import use_args

from project import app, db
from project.views import response
from project.models import BlogModel, UserModel, TagModel

from .wrappers import login_required_api


@app.route('/api/ping', methods=['GET'])
def ping():
    return response.ok('pong')

@app.route('/api/blog', methods=['GET'])
def blog_get():
    blogs = db.session.query(
        BlogModel
    ).order_by(
        BlogModel.last_update.desc()
    ).all()
    return response.ok(blogs)

@app.route('/api/postblog', methods=['POST'])
@login_required_api
@use_args({
    'id': fields.Integer()
})
def postblog_api(args) -> Response:
    new_blog = BlogModel(title=args.title, tag=args.tag, text=args.text)
    if g.user:
        new_blog.user = g.user.id

    # Handle tags and blog-tag relationship
    if args.tag:
        tags = json.loads(args.tag)
        for tag in tags:
            db_tag = db.session.query(TagModel)\
                .filter(TagModel.tag == tag)\
                .scalar()
            if db_tag is None:
                db_tag = TagModel(tag=tag)
                db.session.add(db_tag)
            new_blog.tags.append(db_tag)

    db.session.add(new_blog)
    return response.ok()


@app.route('/api/updateblog', methods=['PATCH'])
@login_required_api
@use_args({
    'id': fields.Integer()
})
def updateblog_api(args) -> Response:
    blog_id = args.id
    blog = db.session.query(BlogModel)\
        .filter(BlogModel.id == blog_id)\
        .first()

    if blog is None:
        return response.unprocessable_entity()

    if blog.user != g.user.id:
        return response.forbidden()

    blog.title = args.title
    blog.tag = args.tag
    blog.text = args.text
    blog.last_update = datetime.utcnow()

    db.session.add(blog)
    db.session.flush()
    return response.accepted()


@app.route('/api/deleteblog', methods=['DELETE'])
@login_required_api
@use_args({
    'blog_id': fields.Integer(required=True)
})
def deleteblog_api(args) -> Response:
    blog = db.session.query(BlogModel)\
        .filter(BlogModel.id == args['blog_id'])\
        .first()
    if blog is None:
        return response.unprocessable_entity()

    if blog.user != g.user.id:
        return response.forbidden()

    for tag in blog.tags:
        blog.tags.remove(tag)

    db.session.delete(blog)
    db.session.flush()
    return response.accepted()


@app.route('/api/getblog', methods=['GET'])
@use_args({
    'date': fields.String(),
    'tag': fields.String(),
    'limit': fields.Integer(required=True)
})
def getblog_api(args) -> Response:
    blogs = db.session.query(BlogModel).order_by(BlogModel.last_update.desc())
    if 'date' in args:
        last_update = parser.parse(args['date'])
        last_update += timedelta(hours=23, minutes=59, seconds=59)
        blogs = blogs.filter(BlogModel.last_update <= last_update)

    if 'tag' in args:
        tag = args['tag']
        blogs = blogs.filter(BlogModel.tag == tag)

    if 'limit' in args:
        limit = args['limit']
        blogs = blogs.limit(limit)

    return response.ok()


@app.route('/api/login', methods=['POST'])
@use_args({
    'username': fields.String(required=True),
    'password': fields.String(required=True)
})
def login_api(args) -> Response:
    username = args['username'].lower()
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
    user.login_expiry = now + timedelta(hours=24)
    user.token = token
    db.session.add(user)

    # Set Token
    res = response.ok()
    res.set_cookie(key='token', value=token, expires=user.login_expiry)
    return res


@app.route('/api/logout', methods=['GET'])
@login_required_api
def logout_api() -> Response:
    res = response.ok()
    if g.user:
        user = db.session.query(UserModel)\
            .filter(UserModel.id == g.user.id)\
            .first()

        if user:
            # Refresh token
            user.token = uuid.uuid4().hex
            db.session.add(user)
            g.user = None
            res.set_cookie(key='token', value='', expires=0)
    return res


@app.route('/api/register', methods=['POST'])
@use_args({
    'username': fields.String(required=True),
    'password': fields.String(required=True)
})
def register_api(args) -> Response:
    username = args['username'].lower()
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
        login_date=now,
        login_expiry=now+timedelta(hours=24),
        register_date=now,
    )
    db.session.add(new_user)

    # Set Token
    res = response.created()
    res.set_cookie(key='token', value=token, expires=new_user.login_expiry)
    return res


@app.before_request
def before_request():
    token = request.cookies.get('token')
    if token is not None:
        user = db.session.query(UserModel)\
            .filter(UserModel.token == token)\
            .first()
        if user and user.login_expiry > datetime.utcnow():
            g.user = user
            return

    g.user = None


@app.after_request
def after_request(res):
    if response.is_success(res.status_code):
        db.session.commit()
    else:
        db.session.rollback()
    return res