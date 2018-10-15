import hashlib, uuid
from flask import Response, g, session, request, json, send_from_directory
from dateutil import parser
from datetime import datetime, timedelta
from webargs import fields
from webargs.flaskparser import use_args

from project import app, db
from project.views import response
from project.models import BlogModel, UserModel, TagModel
from project.handlers.blog_handlers import (
    add_blog,
    get_all_tags,
    get_all_blogs,
    get_blog_by_id,
    serialise_tags,
    serialise_blogs,
    delete_blog_by_model,
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
    BlogNotFoundException,
    UserNotFoundException
)

@app.route('/dist/<filename>', methods=['GET'])
def resource_get(filename):
    return send_from_directory(app.config['DIST_DIR'], filename)

from .wrappers import login_required_api
@app.route('/api/ping', methods=['GET'])
def ping():
    return response.ok('pong')

@app.route('/api/github', methods=['GET', 'POST'])
def github_webhook():
    return response.ok()

@app.route('/api/blog', methods=['GET'])
def blog_get():
    blogs = get_all_blogs()
    return response.ok(serialise_blogs(blogs))

@app.route('/api/tag', methods=['GET'])
def tag_get():
    tags = get_all_tags()
    return response.ok(serialise_tags(tags))

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

    res = response.ok({
        'id': refreshed_user.id,
        'email': refreshed_user.username,
        'login': refreshed_user.login_date,
        'expiry': refreshed_user.login_expiry,
    })
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
        return response.unprocessable_entity(
            'Action is required'
        )

    if action == 'logout':
        logout_user(g.user.id)
        g.user = None
        res = response.accepted()
        res.set_cookie(key='identity_token', value='', expires=0)
        return res

    return response.bad_request(
        'Action cannot be handled properly'
    )

@app.route('/api/blog', methods=['POST'])
@login_required_api
@use_args({
    'title': fields.String(required=True),
    'tags': fields.List(fields.String()),
    'text': fields.String(),
})
def blog_post(args):
    title = args.get('title')
    tags = args.get('tags', [])
    text = args.get('text', '')
    if not title:
        return response.unprocessable_entity(
            'Blog title cannot be empty'
        )

    new_blog = add_blog(g.user.id, title, tags, text)
    return response.created({
        'id': new_blog.id,
        'title': new_blog.title,
        'update': new_blog.last_update,
    })

@app.route('/api/blog/<int:id>', methods=['DELETE'])
@login_required_api
def blog_id_delete(id: int):
    try:
        blog_model = get_blog_by_id(id)
    except BlogNotFoundException:
        return response.not_found(
            'Blog cannot be found'
        )

    if g.user.id != blog_model.author_id:
        return response.unauthorized(
            'Only the author can remove their article'
        )

    delete_blog_by_model(blog_model)
    return response.ok()

@app.route('/api/blog/<int:id>', methods=['PATCH'])
@login_required_api
@use_args({
    'action': fields.String(required=True),
    'title': fields.String(),
    'tags': fields.List(fields.String()),
    'text': fields.String()
})
def blog_id_patch(args, id: int):
    action = args.get('action')
    if action is None:
        return response.unprocessable_entity(
            'Action is required'
        )

    if action == 'update':
        try:
            blog_model = get_blog_by_id(id)
        except BlogNotFoundException:
            return response.not_found(
                'Blog cannot be found'
            )

        if g.user.id != blog_model.author_id:
            return response.unauthorized(
                'Only the author can amend their article'
            )

        title = args.get('title')
        tags = args.get('tags', [])
        text = args.get('text', '')
        if not title:
            return response.unprocessable_entity(
                'Blog title cannot be empty'
            )

        delete_blog_by_model(blog_model)
        new_blog = add_blog(g.user.id, title, tags, text)
        return response.created({
            'id': new_blog.id,
            'title': new_blog.title,
            'update': new_blog.last_update,
        })

    return response.bad_request(
        'Action cannot be handled properly'
    )

@app.before_request
def before_request():
    token = request.cookies.get('identity_token')
    if token is not None:
        user = db.session.query(UserModel).filter(
            UserModel.token == token
        ).first()
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
