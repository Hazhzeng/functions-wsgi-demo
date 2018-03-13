import Blog from '../constants/BlogConstants';

const initialState = {
  title: '',
  content: '',
};

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case Blog.CHANGE_TITLE:
      return {
        ...state,
        title: action.payload,
      };
    default:
      return state;
  }
};

export default blogReducer;
