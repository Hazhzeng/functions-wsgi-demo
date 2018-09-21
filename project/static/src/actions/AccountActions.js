const prefix = 'Account';

export const definition = {
  CHANGE_EMAIL: `[${prefix}]CHANGE_EMAIL`,
  CHANGE_PASSWORD: `[${prefix}]CHANGE_PASSWORD`,

  CHECK_EMAIL: `[${prefix}]CHECK_EMAIL`,
  CHECK_EMAIL_ON_HOLD: `[${prefix}]CHECK_EMAIL->ON_HOLD`,
  CHECK_EMAIL_SUCCESS: `[${prefix}]CHECK_EMAIL->SUCCESS`,
  CHECK_EMAIL_FAILURE: `[${prefix}]CHECK_EMAIL->FAILURE`,

  LOGIN: `[${prefix}]LOGIN`,
  LOGIN_SUCCESS: `[${prefix}]LOGIN->SUCCESS`,
  LOGIN_FAILURE: `[${prefix}]LOGIN->FAILURE`,

  REGISTER: `[${prefix}]REGISTER`,
  REGISTER_SUCCESS: `[${prefix}]REGISTER->SUCCESS`,
  REGISTER_FAILURE: `[${prefix}]REGISTER->FAILURE`,

  LOGOUT: `[${prefix}]LOGOUT`,
  LOGOUT_SUCCESS: `[${prefix}]LOGOUT->SUCCESS`,
  LOGOUT_FAILURE: `[${prefix}]LOGOUT->FAILURE`,
};

export const status = {
  LOGGED_OUT: `LOGGED_OUT`,
  LOGGED_IN: `LOGGED_IN`,
  AWAITING_LOGIN: `AWAITING_LOGIN`,
  AWAITING_REGISTER: `AWAITING_REGISTER`,
};

export const changeEmail = email => ({
  type: definition.CHANGE_EMAIL,
  payload: {
    email
  }
});

export const changePassword = password => ({
  type: definition.CHANGE_PASSWORD,
  payload: {
    password
  }
});

export const checkEmail = email => ({
  type: definition.CHECK_EMAIL,
  payload: {
    email
  }
});

export const checkEmailOnHold = () => ({
  type: definition.CHECK_EMAIL_ON_HOLD,
});

export const checkEmailSuccess = emailStatus => ({
  type: definition.CHECK_EMAIL_SUCCESS,
  payload: {
    status: emailStatus
  }
});

export const checkEmailFailure = () => ({
  type: definition.CHECK_EMAIL_FAILURE,
})

export const login = (email, password) => ({
  type: definition.LOGIN,
  payload: {
    email,
    password,
  }
});

export const loginSuccess = (data) => ({
  type: definition.LOGIN_SUCCESS,
  payload: {
    response: data
  },
});

export const loginFailure = () => ({
  type: definition.LOGIN_FAILURE,
});

export const register = (email, password) => ({
  type: definition.REGISTER,
  payload: {
    email,
    password,
  },
});

export const registerSuccess = () => ({
  type: definition.REGISTER_SUCCESS,
});

export const registerFailure = () => ({
  type: definition.REGISTER_FAILURE,
});

export const logout = () => ({
  type: definition.LOGOUT,
});

export const logoutSuccess = () => ({
  type: definition.LOGOUT_SUCCESS,
});

export const logoutFailure = () => ({
  type: definition.LOGOUT_FAILURE,
});
