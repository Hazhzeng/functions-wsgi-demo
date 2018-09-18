import { combineReducers } from 'redux';
import BlogReducer from './reducers/BlogReducer';
import ViewReducer from './reducers/ViewReducer';
import UiReducer from './reducers/UiReducer';
import AccountReducer from './reducers/AccountReducer';

export const ApplicationState = combineReducers({
  blog: BlogReducer,
  view: ViewReducer,
  ui: UiReducer,
  account: AccountReducer,
});
