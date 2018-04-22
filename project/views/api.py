from flask import request, Response, g
from project import app, db
from dateutil import parser
from datetime import timedelta
from webargs.flaskparser import use_args

from project.views import response
from project.schema.Blog import BlogSchema
from project.schema.PullBlog import PullBlogSchema
from project.models import BlogModel

@app.route("/api/ping", methods=["GET"])
def ping() -> str:
    return response.ok('pong')


@app.route("/api/postblog", methods=["POST"])
@use_args(BlogSchema())
def postblog(args) -> Response:
    new_blog = BlogModel(title=args.title, tag=args.tag, text=args.text)
    db.session.add(new_blog)
    db.session.commit()

    return response.ok();


@app.route("/api/getblog", methods=["GET"])
@use_args(PullBlogSchema())
def getblog(args) -> Response:
    last_update = parser.parse(args.date)
    last_update += timedelta(hours=23, minutes=59, seconds=59)
    blogs = db.session.query(BlogModel)\
        .filter(BlogModel.last_update <= last_update)\
        .order_by(BlogModel.last_update.desc())\
        .limit(args.limit)
    ret = [BlogSchema().dump(blog).data for blog in blogs]

    return response.ok(ret)
