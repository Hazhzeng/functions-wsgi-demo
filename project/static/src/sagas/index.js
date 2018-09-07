import { all } from 'redux-saga/effects';
import BlogSaga from './BlogSaga';

export default function *root() {
  yield all([
    ...BlogSaga
  ]);
}