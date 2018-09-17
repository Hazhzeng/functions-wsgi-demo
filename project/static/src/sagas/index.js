import { all } from 'redux-saga/effects';
import BlogSaga from './BlogSaga';
import RouteSaga from './RouteSaga';

export default function *rootSaga() {
  yield all([
    ...BlogSaga,
    ...RouteSaga,
  ]);
}