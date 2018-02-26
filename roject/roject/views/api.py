from datetime import datetime
from flask import request, Response
from roject import app

from roject.schema.Message import MessageObject, MessageSchema
import json

@app.route("/api/ping", methods=["GET"])
def ping() -> str:
    return "pong"

@app.route("/api/postmsg", methods=["POST"])
def postmsg() -> str:
    request_json = request.get_json()
    message_obj = MessageSchema().load(request_json).data
    print(message_obj.msg)
    return 'ok'

@app.route("/api/getmsg")
def getmsg() -> None:
    raise NotImplementedError

@app.route("/api/getmsgs")
def getmsgs(count: int) -> None:
    raise NotImplementedError