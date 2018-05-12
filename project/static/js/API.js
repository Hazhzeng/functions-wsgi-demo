import { get_json, post_json } from './utils/request';
import { errorHandler } from './utils/errors';

export default class API {
  static postBlog(title, tag, text) {
    const request_body = {
      title: title,
      tag: tag,
      text: text,
    };

    return post_json('/api/postblog', {}, request_body);
  }

  static getBlog(date, limit=10) {
    return get_json('/api/getblog', {}, {
      date: date,
      limit: limit,
    })
      .then(errorHandler)
      .then(response => response.json())
      .then(data => Promise.resolve(data))
      .catch(error => Promise.reject(error));
  }

  static authenticate(identity) {
    return post_json('/api/login', {}, identity)
      .then(errorHandler);
  }

  static register(identity) {
    return post_json('/api/register', {}, identity)
      .then(errorHandler);
  }

  static logout() {
    return get_json('/api/logout')
      .then(errorHandler);
  }
}
