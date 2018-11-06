import {
  get_request,
  post_request,
  response_handler,
  patch_request,
  delete_request,
} from './utils';

export default {
  submitBlog: (title, tags, text) => {
    const body = {
      title,
      tags,
      text,
    };
    return post_request('/api/blog', {}, body)
      .then(response_handler)
  },

  updateBlog: (id, title, tags, text) => {
    const body = {
      tags,
      text,
    };
    return patch_request(`/api/blog/${id}`, {}, body)
      .then(response_handler)
  },

  deleteBlog: id => {
    return delete_request(`/api/blog/${id}`)
      .then(response_handler);
  },

  getAllTags: () => {
    return get_request('/api/tag')
      .then(response_handler)
  },

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