const userSelector = (state) => state.UserReducer;

export const identitySelector = state => userSelector(state).identity;
export const uiSelector = state => userSelector(state).ui;

export default {
  identitySelector,
  uiSelector,
};
