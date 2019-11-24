import logging
import os
import sys
import azure.functions as func
from azf_wsgi import AzureFunctionsWsgi

from __app__.project.wsgi import application

def main(req: func.HttpRequest, context: func.Context) -> func.HttpResponse:
    return AzureFunctionsWsgi(application).main(req, context)
