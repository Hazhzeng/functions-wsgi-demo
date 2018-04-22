import { call, put, takeEvery } from 'redux-saga/effects';
import HomeConstants from '../constants/HomeConstants';
import {
  pullBlogLoading,
  pullBlogSuccess,
  pullBlogFailure,
} from '../actions/HomeActions';
import API from '../API';

function *getBlogSaga(action) {
  yield put(pullBlogLoading());
  try {
    const blogs = yield call(API.getBlog, action.payload.date);
    yield put(pullBlogSuccess(blogs));
  } catch (error) {
    yield put(pullBlogFailure(error));
  }
}

function *watcher() {
  yield takeEvery(HomeConstants.PULL_BLOG, getBlogSaga);
}

export default [watcher];
