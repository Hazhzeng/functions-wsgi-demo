import _ from 'lodash';
import { definition, status } from '../actions/AccountActions';

const initialState = {
  accountStatus: status.LOGGED_OUT,
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
    default:
      return state;
  }
};