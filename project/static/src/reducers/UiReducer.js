import _ from 'lodash';
import { definition } from '../actions/UiActions';

const initialState = {
  loadingSemaphore: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case definition.START_LOADING:
      return _.assignIn(state, {
        loadingSemaphore: state.loadingSemaphore + 1,
      });
    case definition.STOP_LOADING:
      return _.assignIn(state, {
        loadingSemaphore: Math.max(0, state.loadingSemaphore - 1),
      });
    default:
      return state;
  }
};