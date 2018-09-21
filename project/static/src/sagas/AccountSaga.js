import { call, put, takeLatest } from 'redux-saga/effects';
import Api from '../api';
import {
  definition as account,
  checkEmailSuccess, checkEmailFailure,
  loginSuccess, loginFailure,
  registerSuccess, registerFailure,
} from '../actions/AccountActions';
import { pushProgress } from '../actions/UiActions';

function *checkEmailSaga(action) {
  yield put(pushProgress(0));

  try {
    const email = action.payload.email;
    if (email) {
      const data = yield call(Api.getAccountEmail, email);
      yield put(pushProgress(30));
      yield put(checkEmailSuccess(data.status));
    }
  } catch (error) {
    yield put(checkEmailFailure(error));
  }
  yield put(pushProgress(100));
}

function *loginSaga(action) {
  yield put(pushProgress(0));

  try {
    const { email, password } = action.payload;
    if (email && password) {
      const data = yield call(Api.loginAccount, email, password);
      yield put(pushProgress(30));
      yield put(loginSuccess(data.status))
    }
  } catch (error) {
    yield put(loginFailure(error));
  }
  yield put(pushProgress(100));
}

function *registerSaga(action) {
  yield put(pushProgress(0));

  try {
    const { email, password } = action.payload;
    if (email && password) {
      const data = yield call(Api.registerAccount, email, password);
      yield put(pushProgress(30));
      yield put(registerSuccess(data.status));
    }
  } catch (error) {
    yield put(registerFailure(error));
  }
  yield put(pushProgress(100));
}

export default [
  takeLatest(account.CHECK_EMAIL, checkEmailSaga),
  takeLatest(account.LOGIN, loginSaga),
  takeLatest(account.REGISTER, registerSaga),

  takeLatest(account.REGISTER_SUCCESS, loginSaga),
];