from typing import List, Dict
from datetime import datetime
from __app__.project import db

from __app__.project.models import BlogModel, TagModel, BlogTagAssociation
from .exceptions import BlogNotFoundException


def get_tags(tags: List[str]) -> List[TagModel]:
    tags_set = set(tags)
    existing_tags = {
        tag for (tag, ) in db.session.query(TagModel.tag).filter(
            TagModel.tag.in_(tags_set)
        ).all()
    }
    non_existing_tags = tags_set ^ existing_tags
    new_tag_models = [
        TagModel(tag=tag, date_added=datetime.utcnow())
        for tag in non_existing_tags
    ]
    db.session.bulk_save_objects(new_tag_models)
    db.session.commit()
    return db.session.query(TagModel).filter(TagModel.tag.in_(tags_set)).all()


def add_blog(
    author_id: int,
    title: str,
    tags: List[str],
    text: str
) -> BlogModel:
    new_blog_model = BlogModel(
        author_id=author_id,
        title=title,
        text=text,
        last_update=datetime.utcnow()
    )
    db.session.add(new_blog_model)
    db.session.commit()

    tag_models = get_tags([tag.lower() for tag in tags])
    new_blog_tag_associations = [
        BlogTagAssociation(blog_id=new_blog_model.id, tag_id=tag_model.id)
        for tag_model in tag_models
    ]
    db.session.bulk_save_objects(new_blog_tag_associations)

    return new_blog_model


def get_all_blogs() -> List[BlogModel]:
    blogs = db.session.query(
        BlogModel
    ).order_by(
        BlogModel.last_update.desc()
    ).all()
    return blogs


def get_all_tags() -> List[TagModel]:
    tags = db.session.query(
        BlogTagAssociation
    ).order_by(
        BlogTagAssociation.date_added.desc()
    ).all()
    return tags


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
        tags = [t.tag for t in blog.tags]
        result['blogs'].append({
            'id': blog.id,
            'author_id': blog.author_id,
            'title': blog.title,
            'tags': tags,
            'text': blog.text,
            'update_date': blog.last_update.isoformat()
        })
    return result


def serialise_tags(associations: List[BlogTagAssociation]) -> Dict[str, any]:
    result = {}
    result['tags'] = []
    for association in associations:
        result['tags'].append({
            'name': association.tag.tag,
            'update_date': association.date_added.isoformat()
        })
    return result


def delete_blog_by_model(blog_model: BlogModel) -> None:
    db.session.query(BlogTagAssociation).filter(
        BlogTagAssociation.blog_id == blog_model.id
    ).delete()

    db.session.delete(blog_model)
    return


def update_blog_by_model(
    blog_model: BlogModel,
    tags: List[str],
    text: str
) -> BlogModel:
    blog_model.text = text
    db.session.add(blog_model)

    db.session.query(BlogTagAssociation).filter(
        BlogTagAssociation.blog_id == blog_model.id
    ).delete()

    tag_models = get_tags([tag.lower() for tag in tags])
    new_blog_tag_associations = [
        BlogTagAssociation(blog_id=blog_model.id, tag_id=tag_model.id)
        for tag_model in tag_models
    ]
    db.session.bulk_save_objects(new_blog_tag_associations)

    return blog_model
