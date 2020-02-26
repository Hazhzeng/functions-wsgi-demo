from flask import Flask, request

app = Flask(__name__)


@app.route('/', methods=['GET'])
def index():
    return "This is index /"

@app.route('/urlparam/<int:p>', methods=['GET'])
def urlparam(p: int):
    return f"This is /urlparam (p = {p})"

@app.route('/queryparam', methods=['GET'])
def queryparam():
    return f"This is /queryparam {request.args.get('q')}"

@app.route('/postbody', methods=['POST'])
def postbody():
    return f"This is /postbody {request.get_json()}"

if __name__ == '__main__':
    app.run()