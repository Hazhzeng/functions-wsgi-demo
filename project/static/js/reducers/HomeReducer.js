import Home from '../constants/HomeConstants';
import API from '../API';

const initialState = {
  blogs: [],
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case Home.PULL_BLOGS:
      API.getblog();
      return state;
    default:
      return state;
  }
};

export default homeReducer;
