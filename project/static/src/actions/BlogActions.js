const prefix = 'Blog';

export const definition = {
  PUSH_BLOG_BY_ID: `[${prefix}]PUSH_BLOG_BY_ID`,
  EDIT_BLOG_BY_ID: `[${prefix}]EDIT_BLOG_BY_ID`,
  SAVE_BLOG_BY_ID: `[${prefix}]SAVE_BLOG_BY_ID`,
  DISGARD_ALL_DRAFTS: `[${prefix}]DISGARD_ALL_DRAFTS`,

  CHANGE_BLOG_TITLE: `[${prefix}]CHANGE_BLOG_TITLE`,
  CHANGE_BLOG_TAG: `[${prefix}]CHANGE_BLOG_TAG`,
  CHANGE_BLOG_TEXT: `[${prefix}]CHANGE_BLOG_TEXT`,

  GET_ALL_BLOGS: `[${prefix}]GET_ALL_BLOGS`,
  GET_ALL_BLOGS_SUCCESS: `[${prefix}]GET_ALL_BLOGS->SUCCESS`,
  GET_ALL_BLOGS_FAILURE: `[${prefix}]GET_ALL_BLOGS->FAILURE`,
};

export const changeBlogTitle = (title, id=null) => ({
  type: definition.CHANGE_BLOG_TITLE,
  payload: {
    id,
    title,
  }
});

export const changeBlogTag = (tag, id=null) => ({
  type: definition.CHANGE_BLOG_TAG,
  payload: {
    id,
    tag,
  }
});

export const changeBlogText = (text, id=null) => ({
  type: definition.CHANGE_BLOG_TEXT,
  payload: {
    id,
    text,
  }
});

export const getAllBlogs = () => ({
  type: definition.GET_ALL_BLOGS,
});

export const getAllBlogsSuccess = (data) => ({
  type: definition.GET_ALL_BLOGS_SUCCESS,
  payload: {
    response: data
  },
});

export const getAllBlogsFailure = (errorMessage) => ({
  type: definition.GET_ALL_BLOGS_FAILURE,
  payload: {
    error: errorMessage
  },
});

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