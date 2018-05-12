import validator from 'password-validator';

const userSelector = (state) => state.UserReducer;

export const identitySelector = state => userSelector(state).identity;
export const uiSelector = state => userSelector(state).ui;
export const statusesSelector = state => userSelector(state).statuses;

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