const prefix = 'View';

export const definition = {
  CHANGE_VIEW: `[${prefix}]CHANGE_VIEW`,
};

export const view = {
  BLOG_VIEW: 'BLOG_VIEW',
  EDIT_VIEW: 'EDIT_VIEW',
  ACCOUNT_VIEW: 'ACCOUNT_VIEW',
  ROADMAP_VIEW: 'ROADMAP_VIEW',
  INFO_VIEW: 'INFO_VIEW',
};

export const changeView = viewName => ({
  type: definition.CHANGE_VIEW,
  payload: {
    view: viewName,
  }
});