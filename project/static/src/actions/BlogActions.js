const prefix = 'Blog';

export const definition = {
  PUSH_BLOG_BY_ID: `[${prefix}]PUSH_BLOG_BY_ID`,
  EDIT_BLOG_BY_ID: `[${prefix}]EDIT_BLOG_BY_ID`,
  SAVE_BLOG_BY_ID: `[${prefix}]SAVE_BLOG_BY_ID`,
  DISGARD_ALL_DRAFTS: `[${prefix}]DISGARD_ALL_DRAFTS`,
};

export const pushBlogById = (id, content) => ({
  type: definition.PUSH_BLOG_BY_ID,
  payload: {
    id,
    content,
  }
});

export const editBlogById = (id) => ({
  type: definition.EDIT_BLOG_BY_ID,
  payload: {
    id,
  }
});

export const saveBlogById = (id) => ({
  type: definition.SAVE_BLOG_BY_ID,
  payload: {
    id,
  }
});

export const disgardAllDrafts = () => ({
  type: definition.DISGARD_ALL_DRAFTS,
});