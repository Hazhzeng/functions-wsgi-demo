import validator from 'password-validator';

const userSelector = (state) => state.UserReducer;

export const identitySelector = state => userSelector(state).identity;
export const uiSelector = state => userSelector(state).ui;
export const statusesSelector = state => userSelector(state).statuses;

export const usernameSelector = () => (
  window.user && window.user.username
);

export const loginExpirySelector = () => (
  window.user && window.user.login_expiry
);

export const loginDateSelector = () => (
  window.user && window.user.login_date
);

export const isUserLoggedinSelector = () => Boolean(window.user);

export const isUsernameValid = state => {
  const schema = new validator();
  schema.is().min(8).is().max(63)
    .has().lowercase()
    .has().not().spaces();
  return (
    statusesSelector(state).username_touched &&
    schema.validate(identitySelector(state).username)
  );
}

export const isPasswordValid = state => {
  const schema = new validator();
  schema.is().min(6).is().max(63)
    .has().lowercase()
    .has().digits()
    .has().not().spaces();
  return (
    statusesSelector(state).password_touched &&
    schema.validate(identitySelector(state).password)
  );
}

export default {
  identitySelector,
  uiSelector,
  statusesSelector,
  usernameSelector,
  loginDateSelector,
  loginExpirySelector,
  isUserLoggedinSelector,
  isUsernameValid,
  isPasswordValid,
};