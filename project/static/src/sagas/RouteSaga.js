import { put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router'
import { definition as route } from '../actions/RouteActions';
import { definition as account } from '../actions/AccountActions';

function *changeRouteSaga(action) {
  const routePath = action.payload.route;
  yield put(push(routePath));
}

function *routeLoginSuccessSaga() {
  yield put(push('/articles'));
}

export default [
  takeLatest(route.CHANGE_ROUTE, changeRouteSaga),

  takeLatest(account.LOGIN_SUCCESS, routeLoginSuccessSaga),
];