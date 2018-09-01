import ViewConstants from '../constants/ViewConstants';

const initialState = {
  current: ViewConstants.VIEW_INITIALISED,
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};