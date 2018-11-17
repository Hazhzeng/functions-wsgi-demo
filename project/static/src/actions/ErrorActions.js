const prefix = 'Error';

export const definition = {
  USERNAME_PASSWORD_COMBINATION: 'USERNAME_PASSWORD_COMBINATION',

  SET_ERROR: `[${prefix}]SET_ERROR`,
  CLEAR_ERROR: `[${prefix}]CLEAR_ERROR`,
};

export const setError = (field, message) => ({
  type: definition.SET_ERROR,
  payload: {
    field: field,
    error: message,
  }
});

export const clearError = (field) => ({
  type: definition.SET_ERROR,
  payload: {
    field: field
  }
});
