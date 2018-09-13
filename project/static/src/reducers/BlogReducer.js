import _ from 'lodash';
import { definition } from '../actions/BlogActions';

const initialState = {
  blogsById: {},
  blogsEditingById: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case definition.GET_ALL_BLOGS_SUCCESS: {
      const newBlogsById = {};
      action.payload.data.blogs.map(blog => {
        newBlogsById[blog.id] = {
          id: blog.id,
          authorId: blog.author_id,
          text: blog.text,
          title: blog.title,
          updateDate: blog.update_date,
        }
      });
      return _.assignIn(state, {
        blogsById: newBlogsById
      });
    }
    default:
      return state;
  }
};