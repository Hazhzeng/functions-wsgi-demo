import { get_request, response_handler } from './utils';

export default {
  getAllBlogs: () => get_request('/api/blog')
    .then(response_handler),
    
  getAccountEmail: email => get_request(`/api/account/${email}`)
    .then(response_handler),
}