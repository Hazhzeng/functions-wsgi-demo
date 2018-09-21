import _ from 'lodash';
import { definition, status } from '../actions/AccountActions';

const initialState = {
  status: status.LOGGED_OUT,
  tempEmail: null,
  tempPassword: null,
  loggedInUserById: {},
};

if (window.context && window.context.user) {
  const user = window.context.user;
  initialState.status = status.LOGGED_IN,
  initialState.tempEmail = user.username,
  initialState.loggedInUserById[user.id] = {
    id: user.id,
    email: user.username,
    loginDate: user.login_date,
    expiryDate: user.login_expiry,
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case definition.CHANGE_EMAIL:
      return _.assignIn(state, {
        tempEmail: action.payload.email
      });
    case definition.CHANGE_PASSWORD:
      return _.assignIn(state, {
        tempPassword: action.payload.password
      });
    case definition.CHECK_EMAIL_ON_HOLD:
      return _.assignIn(state, {
        status: status.LOGGED_OUT,
      });
    case definition.CHECK_EMAIL_SUCCESS:
      return _.assignIn(state, {
        status:
          action.payload.status === 'registered' ?
            status.AWAITING_LOGIN :
            status.AWAITING_REGISTER
      });
    case definition.CHECK_EMAIL_FAILURE:
      return _.assignIn(state, {
        status: status.LOGGED_OUT,
      });
    case definition.LOGIN_SUCCESS: {
      const user = action.payload.response;
      const newLoggedInUserById = {};
      newLoggedInUserById[user.id] = {
        id: user.id,
        email: user.email,
        loginDate: user.login,
        expiryDate: user.expiry,
      };
      return _.assignIn(state, {
        status: status.LOGGED_IN,
        loggedInUserById: newLoggedInUserById,
      });
    }
    case definition.LOGOUT_SUCCESS:
      return _.assignIn(state, {
        status: status.LOGGED_OUT,
        loggedInUserById: {},
      });
    default:
      return state;
  }
};