import { combineReducers } from 'redux';

import BlogReducer from './BlogReducer';
import HomeReducer from './HomeReducer';
import UserReducer from './UserReducer';

export default combineReducers({
  BlogReducer,
  HomeReducer,
  UserReducer,
});
