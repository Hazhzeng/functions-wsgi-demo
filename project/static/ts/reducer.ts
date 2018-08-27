import { combineReducers } from 'redux';
import { IBlogPreview } from './models';
import BlogPreviewReducer from './reducers/BlogPreviewReducer';

export interface IApplicationState {
  blogPreview: IBlogPreview
};

export const ApplicationState = combineReducers<IApplicationState>({
  blogPreview: BlogPreviewReducer,
});
