from flask import Response, jsonify, make_response
from typing import Any, Tuple

def _response(result:Any, code:int) -> Response:
    ret = make_response(
        jsonify(result),
        code
    )
    return ret

def is_success(code:int):
    return code >= 200 and code <= 299

def ok(result:Any={}, code:int=200):
    return _response(result, code)

def accepted(result:Any={}, code:int=202):
    return _response(result, code)

def created(result:Any={}, code:int=201):
    return _response(result, code)

def bad_request(result:Any={}, code:int=400):
    return _response({ 'error': result }, code)

def unauthorized(result:Any={}, code:int=401):
    return _response({ 'error': result }, code)

def forbidden(result:Any={}, code:int=403):
    return _response({ 'error': result }, code)

def not_found(result:Any={}, code:int=404):
    return _response({ 'error': result }, code)

def unprocessable_entity(result:Any={}, code:int=422):
    return _response({ 'error': result } , code)
