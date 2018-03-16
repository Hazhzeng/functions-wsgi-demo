import Blog from '../constants/BlogConstants';

const initialState = {
  title: '',
  text: '',
};

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case Blog.CHANGE_TITLE:
      return {
        ...state,
        title: action.payload,
      };
    case Blog.CHANGE_TEXT:
      return {
        ...state,
        text: action.payload,
      };
    default:
      return state;
  }
};

export default blogReducer;
