import sqlite3
from flask import g

def connect_db():
    db_connection = sqlite3.connect(app.config['DATABASE'])
    db_connection.row_factory = sqlite3.Row
    return db_connection

def get_db():
    if not hasattr(g, 'sqlite_db'):
        g.sqlite_db = connect_db()
    return g.sqlite_db

def close_db(error):
    if hasattr(g, 'sqlite_db'):
        g.sqlite_db.close()

def init_db():
    db = get_db()
    with app.open_resource(app.config['DATABASE_INIT_SQL']):
        db.cursor().executescript(f.read())
    db.commit()
