import { call, put, select, takeLatest } from 'redux-saga/effects';
import Api from '../api';
import {
  definition as blog,
  getAllTagsSuccess, getAllTagsFailure,
  getAllBlogsSuccess, getAllBlogsFailure,
  submitBlogSuccess, submitBlogFailure,
  deleteBlogSuccess, deleteBlogFailure,
} from '../actions/BlogActions';
import { startLoading, stopLoading } from '../actions/UiActions';

function *getAllBlogsSaga() {
  yield put(startLoading());
  try {
    const data = yield call(Api.getAllBlogs);
    yield put(getAllBlogsSuccess(data));
  } catch (error) {
    yield put(getAllBlogsFailure(error))
  }
  yield put(stopLoading());
}

function *getAllTagsSaga() {
  yield put(startLoading());
  try {
    const data = yield call(Api.getAllTags);
    yield put(getAllTagsSuccess(data));
  } catch (error) {
    yield put(getAllTagsFailure(error))
  }
  yield put(stopLoading());
}

function *submitBlogSaga(action) {
  yield put(startLoading());
  try {
    const { id } = action.payload;
    const { title, tags, text } = yield select(state => state.blog.draftById[id]);
    let data = null;
    if (!id) {
      data = yield call(Api.submitBlog, title, tags, text);
    } else {
      data = yield call(Api.updateBlog, id, title, tags, text);
    }
    yield put(submitBlogSuccess(data));
  } catch (error) {
    yield put(submitBlogFailure(error));
  }
  yield put(stopLoading());
}

function *deleteBlogSaga(action) {
  yield put(startLoading());
  try {
    const { id } = action.payload;
    yield call(Api.deleteBlog, id);
    yield put(deleteBlogSuccess(id));
  } catch (error) {
    yield put(deleteBlogFailure(error));
  }
  yield put(stopLoading());
}

export default [
  takeLatest(blog.GET_ALL_TAGS, getAllTagsSaga),
  takeLatest(blog.GET_ALL_BLOGS, getAllBlogsSaga),
  takeLatest(blog.SUBMIT_BLOG, submitBlogSaga),
  takeLatest(blog.DELETE_BLOG, deleteBlogSaga),
];