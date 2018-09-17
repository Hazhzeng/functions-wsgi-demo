import { put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router'
import { definition as route } from '../actions/RouteActions';

function *changeRouteSaga(action) {
  const routePath = action.payload.route;
  yield put(push(routePath));
}

export default [
  takeLatest(route.CHANGE_ROUTE, changeRouteSaga)
];