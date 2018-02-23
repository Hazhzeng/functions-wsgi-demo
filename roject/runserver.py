"""
This script runs the roject application using a development server.
"""

from roject import app

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
