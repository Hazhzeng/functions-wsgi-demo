import User from '../constants/UserConstants';

export const changeUsername = username => ({
  type: User.CHANGE_USERNAME,
  payload: username,
});

export const changePassword = password => ({
  type: User.CHANGE_PASSWORD,
  payload: password,
});

export const authTrigger = () => ({
  type: User.TRIGGER,
});

export const authRequest = () => ({
  type: User.REQUEST,
});

export const authSuccess = () => ({
  type: User.SUCCESS,
});

export const authFailure = () => ({
  type: User.FAILURE,
});

export const logout = () => ({
  type: User.LOGOUT_TRIGGER,
});