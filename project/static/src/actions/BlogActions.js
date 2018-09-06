const prefix = 'BlogAction';

export const definition = {
  PUSH_BLOG_BY_ID: `[${prefix}]PUSH_BLOG_BY_ID`,
  EDIT_BLOG_BY_ID: `[${prefix}]EDIT_BLOG_BY_ID`,
  SAVE_BLOG_BY_ID: `[${prefix}]SAVE_BLOG_BY_ID`,
  DISGARD_ALL_DRAFTS: `[${prefix}]DISGARD_ALL_DRAFTS`,
};

export const push_blog_by_id = (id, content) => ({
  action: definition.PUSH_BLOG_BY_ID,
  payload: {
    id,
    content,
  }
});

export const edit_blog_by_id = (id) => ({
  action: definition.EDIT_BLOG_BY_ID,
  payload: {
    id,
  }
});

export const save_blog_by_id = (id) => ({
  action: definition.SAVE_BLOG_BY_ID,
  payload: {
    id,
  }
});

export const disgard_all_drafts = () => ({
  action: definition.DISGARD_ALL_DRAFTS,
});