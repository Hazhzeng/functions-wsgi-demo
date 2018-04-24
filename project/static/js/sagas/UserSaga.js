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
  try {
    const identity = yield select(identitySelector);
    yield call(API.authenticate, identity);
    yield put(authSuccess());
    window.location.assign('/home');
  } catch (error) {
    yield put(authFailure());
  }
}

function *watcher() {
  yield takeLatest(UserConstants.TRIGGER, authenticateSaga);
}

export default [watcher];
