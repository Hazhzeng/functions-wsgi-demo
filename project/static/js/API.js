import { post_json } from './utils/request';

export default class API {
    static postblog(title, tag, text) {
      const request_body = {
        title: title,
        tag: tag,
        text: text,
      };
      return post_json('/api/postblog', {}, request_body);
    }
}
