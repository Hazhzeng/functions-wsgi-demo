const prefix = 'Ui';

export const definition = {
  START_LOADING: `[${prefix}]START_LOADING`,
  STOP_LOADING: `[${prefix}]STOP_LOADING`,
};

export const startLoading = () => ({
  type: definition.START_LOADING,
});

export const stopLoading = () => ({
  type: definition.STOP_LOADING,
})