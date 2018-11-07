import _ from 'lodash';
import { definition } from '../actions/UiActions';

const initialState = {
  loadingMutex: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case definition.START_LOADING:
      return _.assignIn(state, {
        loadingMutex: 1,
      });
    case definition.STOP_LOADING:
      return _.assignIn(state, {
        loadingMutex: 0,
      });
    default:
      return state;
  }
};