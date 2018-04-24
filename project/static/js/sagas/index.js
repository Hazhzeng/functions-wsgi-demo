import { fork } from 'redux-saga/effects';
import BlogSaga from './BlogSaga';
import UserSaga from './UserSaga';

const sagas = [
  ...BlogSaga,
  ...UserSaga,
];

export default function *root() {
  yield sagas.map(saga => fork(saga));
}
