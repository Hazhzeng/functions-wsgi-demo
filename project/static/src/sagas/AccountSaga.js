import { call, put, takeLatest } from 'redux-saga/effects';
import Api from '../api';
import {
  definition as account,
  checkEmailSuccess,
  checkEmailFailure,
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

export default [
  takeLatest(account.CHECK_EMAIL, checkEmailSaga)
];