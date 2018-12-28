import moment from 'moment';
import urlUtil from 'url';
import MobileDetect from 'mobile-detect';

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
    request_data.headers = Object.assign(request_data.headers, head);
  }
  if (body) {
    request_data.body = JSON.stringify(body)
  }

  return fetch(url, request_data);
};

export const get_request = (url, header = {}, body = null) => {
  const urlString = urlUtil.format({
    hostname: window.location.hostname,
    port: window.location.port,
    pathname: url,
    query: body
  });
  return _fetch('GET', urlString, header);
};

export const post_request = (url, header = {}, body = null) => {
  return _fetch('POST', url, header, body);
};

export const patch_request = (url, header = {}, body = null) => {
  return _fetch('PATCH', url, header, body);
};

export const delete_request = (url, header = {}, body = null) => {
  return _fetch('DELETE', url, header, body);
};

export const response_handler = (response) => {
  if (!response.ok) {
    return Promise.reject(new Error(response.status));
  }

  const ContentType = response.headers.get('content-type');
  if (ContentType.indexOf('application/json') !== -1) {
    return Promise.resolve(response.json());
  } else {
    throw Promise.reject(new Error('Unknown response type'));
  }
};

const md = new MobileDetect(window.navigator.userAgent);

export const isPhone = Boolean(md.phone());

export const formatDate = (utcISO, momentFormat) => {
  const localTime = moment.utc(utcISO).local();
  return localTime.format(momentFormat);
}

export const localStorage = {
  get: (field) => {
    const value = window.localStorage.getItem(field);
    if (value === null) {
      return undefined;
    }
    return value;
  },

  set: (field, value) => {
    window.localStorage.setItem(field, value);
  },

  clear: (field) => {
    window.localStorage.clear(field);
  }
};