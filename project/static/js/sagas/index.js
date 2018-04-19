import { fork } from 'redux-saga/effects';
import BlogSaga from './BlogSaga';

const sagas = [
  ...BlogSaga,
];

export default function *root() {
  yield sagas.map(saga => fork(saga));
}
