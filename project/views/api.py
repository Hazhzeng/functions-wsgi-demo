from flask import request, Response, g
from project import app, db
from webargs.flaskparser import use_args

from project.views import response
from project.schema.Blog import BlogSchema
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
def getblog() -> Response:
    old_blogs = BlogModel.query.order_by(BlogModel.last_update.desc())
    ret = [BlogSchema().dump(old_blog).data for old_blog in old_blogs]

    return response.ok(ret)
