from datetime import datetime
from flask import render_template
from roject import app

@app.route("/api/postmsg")
def postmsg(msg: str) -> None:
    raise NotImplementedError

@app.route("/api/getmsg")
def getmsg() -> None:
    raise NotImplementedError