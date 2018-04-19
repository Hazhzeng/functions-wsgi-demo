import Blog from '../constants/BlogConstants';
import API from '../API';

const initialState = {
  title: '',
  tag: '',
  text: '',
};

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case Blog.CHANGE_TITLE:
      return {
        ...state,
        title: action.payload,
      };
    case Blog.CHANGE_TAG:
      return {
        ...state,
        tag: action.payload,
      };
    case Blog.CHANGE_TEXT:
      return {
        ...state,
        text: action.payload,
      };
    case Blog.SUBMIT_BLOG:
      API.postBlog(state.title, state.tag, state.text);
      return {
        title: '',
        tag: '',
        text: '',
      };
    default:
      return state;
  }
};

export default blogReducer;
