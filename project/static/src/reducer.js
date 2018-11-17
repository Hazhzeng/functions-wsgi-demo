import { combineReducers } from 'redux';
import BlogReducer from './reducers/BlogReducer';
import ViewReducer from './reducers/ViewReducer';
import UiReducer from './reducers/UiReducer';
import ErrorReducer from './reducers/ErrorReducer';
import AccountReducer from './reducers/AccountReducer';

export const ApplicationState = combineReducers({
  account: AccountReducer,
  error: ErrorReducer,
  blog: BlogReducer,
  view: ViewReducer,
  ui: UiReducer,
});
