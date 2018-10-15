import _ from 'lodash';
import { definition } from '../actions/ViewActions';

const initialState = {
  currentView: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case definition.CHANGE_VIEW:
      return _.assignIn(state, {
        currentView: action.payload.view
      });
    default:
      return state;
  }
};