import { get_json, post_json, delete_json, patch_json } from './utils/request';
import { errorHandler } from './utils/errors';

export default class API {
  static postBlog(title, tags, text) {
    const request_body = {
      title: title,
      tag: JSON.stringify(tags),
      text: text,
    };
    return post_json('/api/postblog', {}, request_body).then(errorHandler);
  }

  static getBlog(date=null, limit=null, tag=null) {
    const query = {}
    if (date) query['date'] = date;
    if (limit) query['limit'] = limit;
    if (tag) query['tag'] = tag;
    return get_json('/api/getblog', {}, query)
      .then(errorHandler)
      .then(response => response.json())
      .then(data => Promise.resolve(data))
      .catch(error => Promise.reject(error));
  }

  static deleteBlog(blogId) {
    return delete_json('/api/deleteblog', {}, {
      blog_id: blogId,
    }).then(errorHandler);
  }

  static updateBlog(blogId, title, tags, text) {
    const request_body = {
      id: blogId,
      title: title,
      tag: JSON.stringify(tags),
      text: text,
    };
    return patch_json('/api/updateblog', {}, request_body).then(errorHandler);
  }

  static authenticate(identity) {
    return post_json('/api/login', {}, identity).then(errorHandler);
  }

  static register(identity) {
    return post_json('/api/register', {}, identity).then(errorHandler);
  }

  static logout() {
    return get_json('/api/logout').then(errorHandler);
  }
}
