import Blog from '../constants/BlogConstants';

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
    case Blog.SUBMIT_BLOG_LOADING:
      return state;
    case Blog.SUBMIT_BLOG_SUCCESS:
      return {
        title: '',
        tag: '',
        text: '',
      };
    case Blog.SUBMIT_BLOG_FAILURE:
      return state;
    default:
      return state;
  }
};

export default blogReducer;
