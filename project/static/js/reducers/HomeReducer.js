import Home from '../constants/HomeConstants';
import API from '../API';

const initialState = {
  blogs: [],
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case Home.PULL_BLOG:
      return {
        ...state,
        blogs: API.getblog(),
      };
    default:
      return state;
  }
};

export default homeReducer;
