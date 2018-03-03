from datetime import datetime
from flask import request, Response, g
from roject import app
from webargs.flaskparser import use_args

from roject.views import response
from roject.schema.Message import MessageObject, MessageSchema

@app.route("/api/ping", methods=["GET"])
def ping() -> str:
    return response.ok('pong')

@app.route("/api/postmsg", methods=["POST"])
@use_args(MessageSchema())
def postmsg(args) -> str:
    return response.ok(args.msg)

