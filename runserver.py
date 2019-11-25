import importlib
from importlib import (machinery, util)
import os
import sys


APP_NAMESPACE = '__app__'
FLASK_PROJECT_PATH = os.fspath(os.path.join(os.path.dirname(__file__)))

if __name__ == '__main__':
    ns_spec = machinery.ModuleSpec(APP_NAMESPACE, None)
    ns_spec.submodule_search_locations = [FLASK_PROJECT_PATH]
    ns_pkg = util.module_from_spec(ns_spec)
    sys.modules[APP_NAMESPACE] = ns_pkg

    from __app__.project import app
    app.run(host='0.0.0.0', port=9527, debug=True)
