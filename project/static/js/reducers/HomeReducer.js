import Home from '../constants/HomeConstants';
import Blog from '../constants/BlogConstants';
import { isPhoneSelector } from '../selectors/DeviceSelector';

const initialState = {
  blogs: [/*
    "id": 12, 
    "last_update": "2018-05-14T22:21:00.356896+00:00", 
    "tag": "", 
    "text": "\u4f60\u597d\u554a", 
    "title": "Test of UTF8", 
    "user": 1
  */],
  error: null,
  ui: {
    loading: false,
    success: false,
    failure: false,
    menu: !isPhoneSelector(),
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
    case Home.TOGGLE_MENU:
      return {
        ...state,
        ui: {
          ...state.ui,
          menu: !state.ui.menu,
        }
      };
    case Blog.DELETE_BLOG_SUCCESS:
      return {
        ...state,
        blogs: [...state.blogs.filter(blog => blog.id !== action.payload)]
      }
    case Blog.DELETE_BLOG_FAILURE:
      return state;
    default:
      return state;
  }
};

export default homeReducer;
