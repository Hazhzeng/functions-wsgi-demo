import Home from '../constants/HomeConstants';
import Blog from '../constants/BlogConstants';
import { isPhoneSelector } from '../selectors/DeviceSelector';

const initialState = {
  blogs: [/*
    "id": 12,
    "last_update": "2018-05-14T22:21:00.356896+00:00",
    "tags": ["tag 1", "tag 2"],
    "text": "\u4f60\u597d\u554a",
    "title": "Test of UTF8",
    "user": 1
  */],
  availableTags: [],
  selectedTag: '',
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
    case Home.ENABLE_TAG:
      return {
        ...state,
        enabledTags: [...new Set([...state.enabledTags, action.payload])],
      };
    case Home.DISABLE_TAG:
      return {
        ...state,
        enabledTags: state.enabledTags.filter(tag => tag !== action.payload),
      };
    case Home.SELECT_TAG:
      return {
        ...state,
        enabledTags: [action.payload],
      };
    case Home.SET_AVAILABLE_TAG:
      return {
        ...state,
        availableTags: action.payload.sort(),
      };
    case Home.PUSH_BLOG_SUCCESS:
      return {
        ...state,
        blogs: action.payload,
      };
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
        blogs: action.payload,
      }
    case Blog.DELETE_BLOG_FAILURE:
      return state;
    default:
      return state;
  }
};

export default homeReducer;
