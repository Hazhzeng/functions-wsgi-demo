import Blog from '../constants/BlogConstants';

const initialState = {
  title: '',
  tags: [],
  text: '',
  id: undefined,
  amendment: false,
};

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case Blog.SET_AMENDMENT:
      return {
        ...state,
        id: action.payload,
        amendment: true,
      };
    case Blog.INITIALISE:
      return initialState;
    case Blog.CHANGE_TITLE:
      return {
        ...state,
        title: action.payload,
      };
    case Blog.CHANGE_PROCESSED_TAGS:
      return {
        ...state,
        tags: action.payload,
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
        tags: [],
        text: '',
      };
    case Blog.SUBMIT_BLOG_FAILURE:
      return state;
    default:
      return state;
  }
};

export default blogReducer;
