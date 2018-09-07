import { definition, getAllBlogsSuccess } from '../actions/BlogActions';
import { put, takeLatest } from 'redux-saga/effects';

function *getAllBlogsSaga() {
  yield put(getAllBlogsSuccess('blogs'));
}

function *watcher() {
  yield takeLatest(definition.GET_ALL_BLOGS, getAllBlogsSaga)
}

export default [watcher];