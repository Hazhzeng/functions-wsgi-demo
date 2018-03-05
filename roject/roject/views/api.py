from flask import request, Response, g
from roject import app, db, models
from webargs.flaskparser import use_args

from roject.views import response
from roject.schema.Message import MessageObject, MessageSchema

@app.route("/api/ping", methods=["GET"])
def ping() -> str:
    return response.ok('pong')

@app.route("/api/postmsg", methods=["POST"])
@use_args(MessageSchema())
def postmsg(args) -> str:
    new_message = models.MessageModel(content=args.msg)
    db.session.add(new_message)
    db.session.commit()

    ret_message = (
        models.MessageModel.query.order_by(
            models.MessageModel.id.desc()
        ).first()
    )
    ret = {}
    if ret_message:
        ret = str(ret_message.last_update)
        print(ret, flush=True)

    return response.ok(ret)

