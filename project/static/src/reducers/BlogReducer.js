import _ from 'lodash';
import { definition } from '../actions/BlogActions';

const initialState = {
  blogsById: {},
  blogsEditingById: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case definition.GET_ALL_BLOGS_SUCCESS:
      return _.assignIn(state, {
        
      });
    default:
      return state;
  }
};