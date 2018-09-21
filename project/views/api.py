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
from project.handlers.blog_handlers import (
    get_all_blogs,
    serialise_blogs
)
from project.handlers.account_handlers import (
    is_valid_email,
    is_account_credential_valid,
    get_user_by_email,
    login_account,
    register_account,
    logout_user,
)
from project.handlers.exceptions import (
    UserNotFoundException
)

from .wrappers import login_required_api

@app.route('/api/ping', methods=['GET'])
def ping():
    return response.ok('pong')

@app.route('/api/blog', methods=['GET'])
def blog_get():
    blogs = get_all_blogs()
    return response.ok(serialise_blogs(blogs))

@app.route('/api/account', methods=['POST'])
@use_args({
    'email': fields.String(required=True),
    'password': fields.String(required=True)
})
def account_post(args):
    username = args.get('email', '').lower()
    password = args.get('password', '')
    if not username or not password:
        return response.bad_request(
            'Either email or password field is empty'
        )

    isEmail = is_valid_email(username)
    if not isEmail:
        return response.bad_request(
            'Email address is malformed'
        )

    user = get_user_by_email(username)
    if user is not None:
        return response.unprocessable_entity(
            'Email address has already been registered'
        )

    new_user = register_account(username, password)
    res = response.created()
    res.set_cookie(
        key='identity_token',
        value=new_user.token,
        expires=new_user.login_expiry,
    )
    return res

@app.route('/api/account/<email>', methods=['POST'])
@use_args({
    'password': fields.String(required=True)
})
def login_api(args, email: str) -> Response:
    username = email.lower()
    password = args.get('password', '')
    if not username or not password:
        return response.bad_request(
            'Either email or password field is empty'
        )

    isEmail = is_valid_email(username)
    if not isEmail:
        return response.bad_request(
            'Email address is malformed'
        )

    isCredentialValid = is_account_credential_valid(username, password)
    if not isCredentialValid:
        return response.forbidden(
            'Email and password combination cannot be found'
        )

    refreshed_user = login_account(username)

    res = response.ok()
    res.set_cookie(
        key='identity_token',
        value=refreshed_user.token,
        expires=refreshed_user.login_expiry,
    )
    return res

@app.route('/api/account/<email>', methods=['GET'])
def account_email_get(email: str):
    isEmail = is_valid_email(email)
    if not isEmail:
        return response.bad_request(
            'Email address is malformed'
        )

    user = get_user_by_email(email)
    if user is None:
        return response.ok({
            'status': 'unregistered'
        })
    else:
        return response.ok({
            'status': 'registered'
        })

@app.route('/api/account/<email>', methods=['PATCH'])
@login_required_api
@use_args({
    'action': fields.String(required=True),
})
def account_email_patch(args, email: str):
    action = args.get('action')
    if action is None:
        return

    if not g.user:
        return response.ok()

    if action == 'logout':
        logout_user(g.user.id)
        g.user = None
        res.set_cookie(key='identity_token', value='', expires=0)
        return res

    return response.bad_request(
        'Action cannot be handled properly'
    )

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

@app.before_request
def before_request():
    token = request.cookies.get('identity_token')
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