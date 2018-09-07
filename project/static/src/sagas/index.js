import { all } from 'redux-saga/effects';
import BlogSaga from './BlogSaga';

export default function *rootSaga() {
  yield all([
    ...BlogSaga
  ]);
}