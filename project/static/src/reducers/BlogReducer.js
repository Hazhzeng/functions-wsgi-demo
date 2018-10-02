import _ from 'lodash';
import { definition } from '../actions/BlogActions';

const initialState = {
  blogById: {},
  draftById: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case definition.DISGARD_ALL_DRAFTS: {
      const drafts = state.draftById;
      delete drafts[null];
      return _.assignIn(state, {
        draftById: drafts
      });
    }
    case definition.DELETE_BLOG_TAG: {
      const oldDraft = state.draftById[action.payload.id] || {};
      const tagsSet = new Set(oldDraft.tags || []);
      tagsSet.delete(action.payload.tag);
      oldDraft.tags = Array.from(tagsSet);
      return _.assignIn(state, {
        draftById: {
          [action.payload.id]: oldDraft,
        }
      });
    }
    case definition.DELETE_BLOG_SUCCESS: {
      const blogs = state.blogById;
      delete blogs[action.payload.id];
      return _.assignIn(state, {
        draftById: blogs
      });
    }
    case definition.COMMIT_BLOG_TAG: {
      const oldDraft = state.draftById[action.payload.id] || {};
      if (oldDraft.tag) {
        const tagsSet = new Set(oldDraft.tags || []);
        tagsSet.add(oldDraft.tag);
        oldDraft.tags = Array.from(tagsSet);
        oldDraft.tag = '';
      }
      return _.assignIn(state, {
        draftById: {
          [action.payload.id]: oldDraft,
        }
      });
    }
    case definition.GET_ALL_BLOGS_SUCCESS: {
      const newBlogById = {};
      action.payload.response.blogs.map(blog => {
        newBlogById[blog.id] = {
          id: blog.id,
          authorId: blog.author_id,
          tags: blog.tags,
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
    case definition.CHANGE_BLOG_TAG: {
      const oldDraft = state.draftById[action.payload.id] || {};
      oldDraft.tag = action.payload.tag;
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