import { all } from 'redux-saga/effects';
import BlogSaga from './BlogSaga';
import RouteSaga from './RouteSaga';
import AccountSaga from './AccountSaga';
import ErrorSaga from './ErrorSaga';

export default function *rootSaga() {
  yield all([
    ...BlogSaga,
    ...RouteSaga,
    ...AccountSaga,
    ...ErrorSaga,
  ]);
}