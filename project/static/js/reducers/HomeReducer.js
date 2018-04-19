import Home from '../constants/HomeConstants';

const initialState = {
  blogs: [
    /* {
     *  title:
     *  tag:
     *  last_update:
     *  text:
     * }
     */
  ],
  error: null,
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case Home.PULL_BLOG_SUCCESS:
      return {
        ...state,
        blogs: action.payload
      };
    case Home.PULL_BLOG_FAILURE:
      return {
        ...state,
        error: action.payload.error
      };
    default:
      return state;
  }
};

export default homeReducer;
