from typing import List, Dict
from datetime import datetime
from project import db

from project.models import BlogModel
from .exceptions import BlogNotFoundException

def add_blog(author_id: int, title: str, tag: str, text: str) -> BlogModel:
    new_blog_model = BlogModel(
        author_id=author_id,
        title=title,
        text=text,
        last_update=datetime.utcnow()
    )
    db.session.add(new_blog_model)
    db.session.commit()
    return new_blog_model


def get_all_blogs() -> List[BlogModel]:
    blogs = db.session.query(BlogModel).all()
    return blogs


def get_blog_by_id(id: int) -> BlogModel:
    blog = db.session.query(BlogModel).filter(
        BlogModel.id == id
    ).first()
    if not blog:
        raise BlogNotFoundException
    return blog


def serialise_blogs(blogs: List[BlogModel]) -> Dict[str, any]:
    result = {}
    result['blogs'] = []
    for blog in blogs:
        result['blogs'].append({
            'id': blog.id,
            'author_id': blog.author_id,
            'title': blog.title,
            'text': blog.text,
            'update_date': blog.last_update
        })
    return result