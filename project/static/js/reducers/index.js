import { combineReducers } from 'redux';

import BlogReducer from './BlogReducer';
import HomeReducer from './HomeReducer';

export default combineReducers({
  BlogReducer,
  HomeReducer,
});
