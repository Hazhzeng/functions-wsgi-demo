import { combineReducers } from 'redux';
import BlogPreviewReducer from './reducers/BlogPreviewReducer';
import ViewReducer from './reducers/ViewReducer';

export const ApplicationState = combineReducers({
  blogPreview: BlogPreviewReducer,
  view: ViewReducer,
});
