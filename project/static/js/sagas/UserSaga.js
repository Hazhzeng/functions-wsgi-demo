import { call, put, select, takeLatest } from 'redux-saga/effects';
import UserConstants from '../constants/UserConstants';
import {
  authRequest,
  authSuccess,
  authFailure,
} from '../actions/UserActions';
import { identitySelector } from '../selectors/UserSelector';
import API from '../API';

function *authenticateSaga() {
  yield put(authRequest());
  const identity = yield select(identitySelector);
  try {
    yield call(API.authenticate, identity);
    window.location.assign('/home');
    yield put(authSuccess());
  } catch (error) {
    yield call(registerSaga, identity, error);
  }
}

function *registerSaga(identity, error) {
  if (error.status !== 401) {
    yield put(authFailure());
    return;
  }

  try {
    yield call(API.register, identity);
    window.location.assign('/home');
    yield put(authSuccess());
  } catch (error) {
    yield put(authFailure());
  }
}

function *watcher() {
  yield takeLatest(UserConstants.TRIGGER, authenticateSaga);
}

export default [watcher];
