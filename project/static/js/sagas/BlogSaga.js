import { call, put, select, takeLatest } from 'redux-saga/effects';
import HomeConstants from '../constants/HomeConstants';
import BlogConstants from '../constants/BlogConstants';
import {
  pushBlog,
  pushBlogSuccess,
  pullBlogLoading,
  pullBlogSuccess,
  pullBlogFailure,
} from '../actions/HomeActions';
import {
  changeProcessedTags,
  submitBlogLoading,
  submitBlogSuccess,
  submitBlogFailure,
  deleteBlogSuccess,
  deleteBlogFailure,
} from '../actions/BlogActions';
import {
  titleSelector,
  textSelector,
  tagsSelector,
  blogIdSelector,
  isAmendmentSelector,
} from '../selectors/BlogSelector';
import { blogsSelector } from '../selectors/HomeSelector';
import API from '../API';

function *postBlogSaga() {
  yield put(submitBlogLoading());
  try {
    const title = yield select(titleSelector);
    const text = yield select(textSelector);
    const tags = yield select(tagsSelector);
    const id = yield select(blogIdSelector);
    const isAmendment = yield select(isAmendmentSelector);
    if (isAmendment) {
      yield call(API.updateBlog, id, title, tags, text);
    } else {
      yield call(API.postBlog, title, tags, text);
    }
    yield put(submitBlogSuccess());

    if (isAmendment) {
      yield put(pushBlog(id, title, tags, text));
    } else {
      window.location.assign('/home');
    }
  } catch (error) {
    yield put(submitBlogFailure());
  }
}

function *pushBlogSaga(action) {
  const blogs = yield select(blogsSelector);
  const newBlogs = [...blogs];
  const modifiedBlog = newBlogs.filter(b => b.id === action.payload.id)[0];
  if (modifiedBlog) {
    modifiedBlog.title = action.payload.title;
    modifiedBlog.tag = action.payload.tag;
    modifiedBlog.text = action.payload.text;
    yield put(pushBlogSuccess(newBlogs));
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

function *processTagSaga(action) {
  const tags = action.payload.substring(0, 50);
  const tagsEndWithSpace = action.payload.endsWith(' ');
  const sanitisedTags = tags.replace(/(?!\\_|\\-)\W/g, ' ');
  const tagTrim = sanitisedTags.trim().toLowerCase();
  const tagWithSpace = tagsEndWithSpace ? tagTrim + ' ' : tagTrim;
  const tagArray = tagWithSpace.split(' ').slice(0, 5);
  const tagArrayUnique = [...new Set(tagArray)];
  yield put(changeProcessedTags(tagArrayUnique));
}

function *watcher() {
  yield takeLatest(HomeConstants.PUSH_BLOG, pushBlogSaga);
  yield takeLatest(HomeConstants.PULL_BLOG, getBlogSaga);
  yield takeLatest(BlogConstants.SUBMIT_BLOG, postBlogSaga);
  yield takeLatest(BlogConstants.DELETE_BLOG, deleteBlogSaga);
  yield takeLatest(BlogConstants.CHANGE_TAG, processTagSaga);
}

export default [watcher];