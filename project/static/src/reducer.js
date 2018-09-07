import { combineReducers } from 'redux';
import BlogReducer from './reducers/BlogReducer';
import ViewReducer from './reducers/ViewReducer';
import UiReducer from './reducers/UiReducer';

export const ApplicationState = combineReducers({
  blog: BlogReducer,
  view: ViewReducer,
  ui: UiReducer,
});
