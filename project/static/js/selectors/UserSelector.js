const userSelector = (state) => state.UserReducer;

export const identitySelector = state => userSelector(state).identity;
export const uiSelector = state => userSelector(state).ui;
export const statusesSelector = state => userSelector(state).statuses;

export const isUsernamePasswordTouched = state => {
  const statuses = statusesSelector(state);
  return statuses.username_touched && statuses.password_touched;
}

export default {
  identitySelector,
  uiSelector,
  statusesSelector,
  isUsernamePasswordTouched,
};
