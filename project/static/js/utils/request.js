import urlUtil from 'url';

const _fetch = (method, url, head = {}, body = null) => {
  const request_data = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    credentials: 'include',
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

export const delete_json = (url, header = {}, body = null) => {
  return _fetch('DELETE', url, header, body);
}

export const get_json = (url, header = {}, body = null) => {
  const urlString = urlUtil.format({
    hostname: window.location.hostname,
    port: window.location.hostname === 'dev.rogertsang.info' ? 5001 : 80,
    pathname: url,
    query: {
      ...body,
    }
  });
  return _fetch('GET', urlString, header);
}

export default {
  post_json,
  get_json,
};
