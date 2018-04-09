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

export const post_json = (url, header = {}, body = null) => {
  return _fetch('POST', url, header, body);
}

export const get_json = (url, header = {}) => {
  return _fetch('GET', url, header);
}

export default {
  post_json,
  get_json,
};
