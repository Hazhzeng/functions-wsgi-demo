import { put, takeLatest } from 'redux-saga/effects';
import {
  definition as error,
  setError,
  clearError,
} from '../actions/ErrorActions';
import { definition as account } from '../actions/AccountActions';

function *loginFailureSaga() {
  yield put(
    setError(
      error.USERNAME_PASSWORD_COMBINATION,
      'Cannot find the combination of email and password'
    )
  );
}

function *loginSuccessSaga() {
  yield put(clearError(error.USERNAME_PASSWORD_COMBINATION));
}

export default [
  takeLatest(account.LOGIN_FAILURE, loginFailureSaga),
  takeLatest(account.LOGIN_SUCCESS, loginSuccessSaga),
];