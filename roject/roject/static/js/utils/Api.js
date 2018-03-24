const _fetch = (method, url, head = {}, body = null) => {
    const request_data = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        method: method,
    }
    if (head) {
        request_data.headers = Object.assign({}, request_data.headers, head);
    }
    if (body) {
        request_data.body = JSON.stringify(body)
    }

    return fetch(url, request_data);
}

const post_json = (url, header = {}, body = null) => {
    return _fetch('POST', url, header, body);
}

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
