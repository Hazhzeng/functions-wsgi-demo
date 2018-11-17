import _ from 'lodash';
import { definition } from '../actions/ErrorActions';

const initialState = {
  USERNAME_PASSWORD_COMBINATION: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case definition.SET_ERROR:
      return _.assign(state, {
        [action.payload.field]: action.payload.error
      });
    case definition.CLEAR_ERROR:
      return _.assign(state, {
        [action.payload.field]: null
      });
    default:
      return state;
  }
};