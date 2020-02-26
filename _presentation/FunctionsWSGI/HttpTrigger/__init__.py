import logging

import azure.functions as func

from ..FlaskApp.wsgi import wsgi_app

def main(req: func.HttpRequest, context: func.Context) -> func.HttpResponse:
    return func.WsgiMiddleware(wsgi_app).handle(req, context)
