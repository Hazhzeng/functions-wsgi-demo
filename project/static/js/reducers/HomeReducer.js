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
  ui: {
    loading: false,
    success: false,
    failure: false,
  },
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case Home.PULL_BLOG_LOADING:
      return {
        ...state,
        ui: {
          ...state.ui,
          loading: true,
        },
      }
    case Home.PULL_BLOG_SUCCESS:
      return {
        ...state,
        blogs: action.payload,
        ui: {
          ...state.ui,
          loading: false,
          success: true,
        }
      };
    case Home.PULL_BLOG_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        ui: {
          ...state.ui,
          loading: false,
          failure: true,
        }
      };
    default:
      return state;
  }
};

export default homeReducer;
