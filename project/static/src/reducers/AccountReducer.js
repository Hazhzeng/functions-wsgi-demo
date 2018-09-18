import _ from 'lodash';
import { definition, status } from '../actions/AccountActions';

const initialState = {
  status: status.LOGGED_OUT,
  tempEmail: null,
  tempPassword: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case definition.CHANGE_EMAIL:
      return _.assignIn(state, {
        tempEmail: action.payload.email
      });
    case definition.CHANGE_PASSWORD:
      return _.assignIn(state, {
        tempPassword: action.payload.password
      })
    case definition.CHECK_EMAIL_SUCCESS:
      return _.assignIn(state, {
        status:
          action.payload.status === 'registered' ?
            status.AWAITING_LOGIN :
            status.AWAITING_REGISTER
      })
    default:
      return state;
  }
};