const prefix = 'Ui';

export const definition = {
  PUSH_PROGRESS: `[${prefix}]PUSH_PROGRESS`,
};

export const pushProgress = (percentage) => ({
  type: definition.PUSH_PROGRESS,
  payload: {
    percentage,
  }
});