import {
  get_request,
  post_request,
  response_handler,
  patch_request,
} from './utils';

export default {
  getAllBlogs: () => {
    return get_request('/api/blog')
      .then(response_handler)
  },

  getAccountEmail: email => {
    return get_request(`/api/account/${email}`)
      .then(response_handler);
  },

  registerAccount: (email, password) => {
    const body = {
      email,
      password,
    };
    return post_request('/api/account', {}, body)
      .then(response_handler);
  },

  loginAccount: (email, password) => {
    const body = {
      password,
    };
    return post_request(`/api/account/${email}`, {}, body)
      .then(response_handler);
  },

  logoutAccount: email => {
    const body = {
      action: 'logout'
    };
    return patch_request(`/api/account/${email}`, {}, body)
      .then(response_handler);
  },
}