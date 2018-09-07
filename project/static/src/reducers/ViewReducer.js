import _ from 'lodash';
import { definition } from '../actions/ViewActions';

const initialState = {
  currentView: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case definition.CHANGE_VIEW:
      return _.assignIn(state, {
        currentView: action.payload
      });
    default:
      return state;
  }
};