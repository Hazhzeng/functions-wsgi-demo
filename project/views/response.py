from flask import Response, jsonify, make_response
from typing import Any, Tuple

def _response(result:Any, code:int) -> Response:
    ret = make_response(
        jsonify(result),
        code
    )
    return ret

def ok(result:Any={}, code:int=200):
    return _response(result, code)

def bad_request(result:Any={}, code:int=400):
    return _response(result, code)

def forbidden(result:Any={}, code:int=403):
    return _response(result, code)

def not_found(result:Any={}, code:int=404):
    return _response(result, code)

