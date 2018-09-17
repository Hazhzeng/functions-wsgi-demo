const prefix = 'Route';

export const definition = {
  CHANGE_ROUTE: `[${prefix}]CHANGE_ROUTE`,
};

export const changeRoute = routePath => ({
  type: definition.CHANGE_ROUTE,
  payload: {
    route: routePath,
  }
});