import _ from 'lodash';
import { definition } from '../actions/BlogActions';
import { formatDate } from '../utils';

const initialState = {
  focusId: null,
  blogById: {},
  draftById: {},
  tagsByDate: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case definition.EDIT_BLOG_BY_ID: {
      const newState = Object.assign({}, state);
      newState.draftById[action.payload.id] = state.blogById[action.payload.id];
      newState.focusId = action.payload.id;
      return newState;
    }
    case definition.GET_ALL_TAGS_SUCCESS: {
      const tagsByDate = Object.assign({}, state.tagsByDate);
      action.payload.response.tags.map(tag => {
        const datetime = formatDate(tag.update_date, 'YYYY-MM');
        const tagsSet = new Set(tagsByDate[datetime]);
        tagsSet.add(tag.name);
        tagsByDate[datetime] = Array.from(tagsSet);
      });
      return _.assignIn(state, {
        tagsByDate: tagsByDate
      });
    }
    case definition.SUBMIT_BLOG_SUCCESS: {
      const newState = Object.assign({}, state);
      delete newState.draftById[state.focusId];
      newState.focusId = null;
      return newState;
    }
    case definition.DELETE_BLOG_SUCCESS: {
      const blogs = state.blogById;
      delete blogs[action.payload.id];
      return _.assignIn(state, {
        draftById: blogs
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
        draftById: _.assignIn(state.draftById, {
          [action.payload.id]: oldDraft,
        })
      });
    }
    case definition.CHANGE_BLOG_TAG: {
      const oldDraft = state.draftById[action.payload.id] || {};
      oldDraft.tag = action.payload.tag;
      return _.assignIn(state, {
        draftById: _.assignIn(state.draftById, {
          [action.payload.id]: oldDraft,
        })
      });
    }
    case definition.CHANGE_BLOG_TEXT: {
      const oldDraft = state.draftById[action.payload.id] || {};
      oldDraft.text = action.payload.text;
      return _.assignIn(state, {
        draftById: _.assignIn(state.draftById, {
          [action.payload.id]: oldDraft,
        })
      });
    }
    case definition.COMMIT_BLOG_TAG: {
      const oldDraft = state.draftById[action.payload.id] || {};
      if (oldDraft.tag) {
        const tagsSet = new Set(oldDraft.tags || []);
        tagsSet.add(oldDraft.tag.toLowerCase());
        oldDraft.tags = Array.from(tagsSet);
        oldDraft.tag = '';
      }
      return _.assignIn(state, {
        draftById: _.assignIn(state.draftById, {
          [action.payload.id]: oldDraft,
        })
      });
    }
    case definition.DELETE_BLOG_TAG: {
      const oldDraft = state.draftById[action.payload.id] || {};
      const tagsSet = new Set(oldDraft.tags || []);
      tagsSet.delete(action.payload.tag);
      oldDraft.tags = Array.from(tagsSet);
      return _.assignIn(state, {
        draftById: _.assignIn(state.draftById, {
          [action.payload.id]: oldDraft,
        })
      });
    }
    case definition.DISGARD_ALL_DRAFTS: {
      return _.assignIn(state, {
        draftById: {}
      });
    }
    default:
      return state;
  }
};