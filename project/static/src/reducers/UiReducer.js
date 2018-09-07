import _ from 'lodash';
import { definition } from '../actions/UiActions';

const initialState = {
  progress: 100,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case definition.PUSH_PROGRESS:
      return _.assignIn(state, {
        progress: action.payload.percentage
      });
    default:
      return state;
  }
};