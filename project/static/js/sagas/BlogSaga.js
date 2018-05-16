import { call, put, select, takeLatest } from 'redux-saga/effects';
import HomeConstants from '../constants/HomeConstants';
import BlogConstants from '../constants/BlogConstants';
import {
  pullBlogLoading,
  pullBlogSuccess,
  pullBlogFailure,
} from '../actions/HomeActions';
import {
  submitBlogLoading,
  submitBlogSuccess,
  submitBlogFailure,
  deleteBlogSuccess,
  deleteBlogFailure,
} from '../actions/BlogActions';
import {
  titleSelector,
  textSelector,
  tagSelector,
} from '../selectors/BlogSelector';
import API from '../API';

function *postBlogSaga() {
  yield put(submitBlogLoading());
  try {
    const title = yield select(titleSelector);
    const text = yield select(textSelector);
    const tag = yield select(tagSelector);
    yield call(API.postBlog, title, tag, text);
    yield put(submitBlogSuccess());
  } catch (error) {
    yield put(submitBlogFailure());
  }
}

function *getBlogSaga(action) {
  yield put(pullBlogLoading());
  try {
    const blogs = yield call(API.getBlog, action.payload.date);
    yield put(pullBlogSuccess(blogs));
  } catch (error) {
    yield put(pullBlogFailure(error));
  }
}

function *deleteBlogSaga(action) {
  try {
    const blogId = action.payload;
    yield call(API.deleteBlog, blogId);
    yield put(deleteBlogSuccess(blogId));
  } catch (error) {
    yield put(deleteBlogFailure());
  }
}

function *watcher() {
  yield takeLatest(HomeConstants.PULL_BLOG, getBlogSaga);
  yield takeLatest(BlogConstants.SUBMIT_BLOG, postBlogSaga);
  yield takeLatest(BlogConstants.DELETE_BLOG, deleteBlogSaga);
}

export default [watcher];
