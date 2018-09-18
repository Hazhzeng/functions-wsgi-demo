const prefix = 'Account';

export const definition = {
  CHANGE_EMAIL: `[${prefix}]CHANGE_EMAIL`,
  CHANGE_PASSWORD: `[${prefix}]CHANGE_PASSWORD`,

  CHECK_EMAIL: `[${prefix}]CHECK_EMAIL`,
  CHECK_EMAIL_SUCCESS: `[${prefix}]CHECK_EMAIL->SUCCESS`,
  CHECK_EMAIL_FAILURE: `[${prefix}]CHECK_EMAIL->FAILURE`,
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

export const checkEmailSuccess = emailStatus => ({
  type: definition.CHECK_EMAIL_SUCCESS,
  payload: {
    status: emailStatus
  }
});

export const checkEmailFailure = () => ({
  type: definition.CHECK_EMAIL_FAILURE,
})