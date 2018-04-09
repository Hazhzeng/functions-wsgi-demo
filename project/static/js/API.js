import { get_json, post_json } from './utils/request';
import { errorHandler } from './utils/errors';

export default class API {
    static postblog(title, tag, text) {
      const request_body = {
        title: title,
        tag: tag,
        text: text,
      };

      return post_json('/api/postblog', {}, request_body);
    }

    static getblog() {
      return get_json('/api/getblog', {})
        .then(errorHandler)
        .then(response => response.json());
    }
}
