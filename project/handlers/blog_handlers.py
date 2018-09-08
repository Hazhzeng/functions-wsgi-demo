from typing import List, Dict
from project import db

from project.models import BlogModel
from .exceptions import BlogNotFoundException

def get_all_blogs() -> List[BlogModel]:
    blogs = db.session.query(BlogModel).all()
    return blogs

def get_blog_by_id(id: int) -> BlogModel:
    blog = db.session.query(BlogModel).filter(BlogModel.id == id).first()
    if not blog:
        raise BlogNotFoundException
    return blog

def serialise_blogs(blogs: List[BlogModel]) -> Dict[str, any]:
    result = {}
    result['blogs'] = []
    for blog in blogs:
        result['blogs'].append({
            'id': blog.id,
            'author': blog.author_id,
            'text': blog.text,
            'update_date': blog.last_update
        })
    return result