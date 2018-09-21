import { call, put, select, takeLatest } from 'redux-saga/effects';
import Api from '../api';
import {
  definition as account,
  checkEmailSuccess, checkEmailFailure, checkEmailOnHold,
  loginSuccess, loginFailure,
  registerSuccess, registerFailure,
} from '../actions/AccountActions';
import { pushProgress } from '../actions/UiActions';
import { emailValidator } from '../validators';

function *checkEmailSaga(action) {
  yield put(pushProgress(0));

  try {
    const email = action.payload.email;
    if (email && emailValidator(email)) {
      const data = yield call(Api.getAccountEmail, email);
      yield put(pushProgress(30));
      yield put(checkEmailSuccess(data.status));
    } else {
      yield put(checkEmailOnHold());
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
      yield put(loginSuccess(data))
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
      yield put(registerSuccess(data));
    }
  } catch (error) {
    yield put(registerFailure(error));
  }
  yield put(pushProgress(50));
}

function *postRegisterLogin() {
  const email = yield select(state => state.account.tempEmail);
  const password = yield select(state => state.account.tempPassword);
  try {
    const data = yield call(Api.loginAccount, email, password);
    yield put(pushProgress(70));
    yield put(loginSuccess(data))
  } catch (error) {
    yield put(loginFailure(error))
  }
  yield put(pushProgress(100));
}

export default [
  takeLatest(account.CHECK_EMAIL, checkEmailSaga),
  takeLatest(account.LOGIN, loginSaga),
  takeLatest(account.REGISTER, registerSaga),

  takeLatest(account.REGISTER_SUCCESS, postRegisterLogin),
];