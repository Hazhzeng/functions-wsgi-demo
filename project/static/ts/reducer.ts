import { combineReducers } from 'redux';
import BlogPreviewReducer, { IBlogPreview } from './reducers/BlogPreviewReducer';
import ViewReducer, { IView } from './reducers/ViewReducer';

export interface IApplicationState {
  blogPreview: IBlogPreview,
  view: IView,
};

export const ApplicationState = combineReducers<IApplicationState>({
  blogPreview: BlogPreviewReducer,
  view: ViewReducer,
});
