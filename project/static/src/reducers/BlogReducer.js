import _ from 'lodash';
import { definition } from '../actions/BlogActions';

const initialState = {
  blogById: {},
  draftById: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case definition.GET_ALL_BLOGS_SUCCESS: {
      const newBlogById = {};
      action.payload.response.blogs.map(blog => {
        newBlogById[blog.id] = {
          id: blog.id,
          authorId: blog.author_id,
          text: blog.text,
          title: blog.title,
          updateDate: blog.update_date,
        }
      });
      return _.assignIn(state, {
        blogById: newBlogById,
      });
    }
    case definition.CHANGE_BLOG_TITLE: {
      const oldDraft = state.draftById[action.payload.id] || {};
      oldDraft.title = action.payload.title;
      return _.assignIn(state, {
        draftById: {
          [action.payload.id]: oldDraft,
        }
      });
    }
    case definition.CHANGE_BLOG_TEXT: {
      const oldDraft = state.draftById[action.payload.id] || {};
      oldDraft.text = action.payload.text;
      return _.assignIn(state, {
        draftById: {
          [action.payload.id]: oldDraft,
        }
      });
    }
    default:
      return state;
  }
};