import { call, put, select, takeLatest } from 'redux-saga/effects';
import Api from '../api';
import {
  definition as account,
  checkEmailSuccess, checkEmailFailure, checkEmailOnHold,
  loginSuccess, loginFailure,
  logoutSuccess, logoutFailure,
  registerSuccess, registerFailure,
} from '../actions/AccountActions';
import { startLoading, stopLoading } from '../actions/UiActions';
import { emailValidator } from '../validators';

function *checkEmailSaga(action) {
  yield put(startLoading());

  try {
    const email = action.payload.email;
    if (email && emailValidator(email)) {
      const data = yield call(Api.getAccountEmail, email);
      yield put(checkEmailSuccess(data.status));
    } else {
      yield put(checkEmailOnHold());
    }
  } catch (error) {
    yield put(checkEmailFailure(error));
  }
  yield put(stopLoading());
}

function *loginSaga(action) {
  yield put(startLoading());

  try {
    const { email, password } = action.payload;
    if (email && password) {
      const data = yield call(Api.loginAccount, email, password);
      yield put(loginSuccess(data))
    }
  } catch (error) {
    yield put(loginFailure(error));
  }
  yield put(stopLoading());
}

function *registerSaga(action) {
  yield put(startLoading());

  try {
    const { email, password } = action.payload;
    if (email && password) {
      const data = yield call(Api.registerAccount, email, password);
      yield put(registerSuccess(data));
    }
  } catch (error) {
    yield put(registerFailure(error));
  }
  yield put(stopLoading());
}

function *postRegisterLogin() {
  yield put(startLoading());

  const email = yield select(state => state.account.tempEmail);
  const password = yield select(state => state.account.tempPassword);
  try {
    const data = yield call(Api.loginAccount, email, password);
    yield put(loginSuccess(data))
  } catch (error) {
    yield put(loginFailure(error))
  }
  yield put(stopLoading());
}

function *logoutSaga() {
  yield put(startLoading());

  try {
    const loggedInUser = yield select(state => state.account.loggedInUserById);
    const user = Object.values(loggedInUser)[0];
    if (user) {
      yield call(Api.logoutAccount, user.email);
      yield put(logoutSuccess());
    }
  } catch (error) {
    yield put(logoutFailure(error));
  }
  yield put(stopLoading());
}

export default [
  takeLatest(account.CHECK_EMAIL, checkEmailSaga),
  takeLatest(account.LOGIN, loginSaga),
  takeLatest(account.REGISTER, registerSaga),
  takeLatest(account.LOGOUT, logoutSaga),

  takeLatest(account.REGISTER_SUCCESS, postRegisterLogin),
];