import { call, put, select, takeLatest } from 'redux-saga/effects';
import Api from '../api';
import {
  definition as blog,
  disgardAllDrafts,
  getAllTagsSuccess, getAllTagsFailure,
  getAllBlogsSuccess, getAllBlogsFailure,
  submitBlogSuccess, submitBlogFailure,
  deleteBlogSuccess, deleteBlogFailure,
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

function *getAllTagsSaga() {
  yield put(pushProgress(0));
  try {
    const data = yield call(Api.getAllTags);
    yield put(pushProgress(30));
    yield put(getAllTagsSuccess(data));
  } catch (error) {
    yield put(getAllTagsFailure(error))
  }
  yield put(pushProgress(100));
}

function *submitBlogSaga(action) {
  yield put(pushProgress(0));
  try {
    const { id } = action.payload;
    const { title, tags, text } = yield select(state => state.blog.draftById[id]);
    yield put(pushProgress(30));
    const data = yield call(Api.submitBlog, title, tags, text);
    yield put(pushProgress(70));
    yield put(submitBlogSuccess(data));
  } catch (error) {
    yield put(submitBlogFailure(error));
  }
  yield put(pushProgress(100));
}

function *deleteDraftSaga() {
  yield put(disgardAllDrafts());
}

function *deleteBlogSaga(action) {
  yield put(pushProgress(0));
  try {
    const { id } = action.payload;
    yield call(Api.deleteBlog, id);
    yield put(pushProgress(70));
    yield put(deleteBlogSuccess(id));
  } catch (error) {
    yield put(deleteBlogFailure(error));
  }
  yield put(pushProgress(100));
}

export default [
  takeLatest(blog.GET_ALL_TAGS, getAllTagsSaga),
  takeLatest(blog.GET_ALL_BLOGS, getAllBlogsSaga),
  takeLatest(blog.SUBMIT_BLOG, submitBlogSaga),
  takeLatest(blog.DELETE_BLOG, deleteBlogSaga),

  takeLatest(blog.SUBMIT_BLOG_SUCCESS, deleteDraftSaga),
];