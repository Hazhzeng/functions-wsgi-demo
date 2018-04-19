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

    static getBlog() {
      return get_json('/api/getblog', {})
        .then(errorHandler)
        .then(response => response.json())
        .then(data => Promise.resolve(data))
        .catch(error => Promise.reject(error));
    }
}
