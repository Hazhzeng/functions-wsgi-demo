import { call, put, takeLatest } from 'redux-saga/effects';
import Api from '../api';
import {
  definition as blog,
  getAllBlogsSuccess, getAllBlogsFailure,
} from '../actions/BlogActions';
import { pushProgress } from '../actions/UiActions';

function *getAllBlogsSaga() {
  yield put(pushProgress(0));
  try {
    const data = yield call(Api.getAllBlogs);
    yield put(pushProgress(30));
    yield put(getAllBlogsSuccess(data));
  } catch (error) {
    yield put(getAllBlogsFailure(error))
  }
  yield put(pushProgress(100));
}

export default [
  takeLatest(blog.GET_ALL_BLOGS, getAllBlogsSaga)
];