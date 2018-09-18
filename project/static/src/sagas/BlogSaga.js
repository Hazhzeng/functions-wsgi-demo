import { call, put, takeLatest } from 'redux-saga/effects';
import Api from '../api';
import { definition as blog, getAllBlogsSuccess } from '../actions/BlogActions';
import { pushProgress } from '../actions/UiActions';

function *getAllBlogsSaga() {
  yield put(pushProgress(0));
  const data = yield call(Api.getAllBlogs);
  yield put(pushProgress(50));
  yield put(getAllBlogsSuccess(data));
  yield put(pushProgress(100));
}

export default [
  takeLatest(blog.GET_ALL_BLOGS, getAllBlogsSaga)
];