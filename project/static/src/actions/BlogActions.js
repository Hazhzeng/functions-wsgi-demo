const prefix = 'Blog';

export const definition = {
  COMMIT_BLOG_TAG: `[${prefix}]COMMIT_BLOG_TAG`,
  DELETE_BLOG_TAG: `[${prefix}]DELETE_BLOG_TAG`,
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

  GET_ALL_TAGS: `[${prefix}]GET_ALL_TAGS`,
  GET_ALL_TAGS_SUCCESS: `[${prefix}]GET_ALL_TAGS->SUCCESS`,
  GET_ALL_TAGS_FAILURE: `[${prefix}]GET_ALL_TAGS->FAILURE`,

  SUBMIT_BLOG: `[${prefix}]SUBMIT_BLOG`,
  SUBMIT_BLOG_SUCCESS: `[${prefix}]SUBMIT_BLOG->SUCCESS`,
  SUBMIT_BLOG_FAILURE: `[${prefix}]SUBMIT_BLOG->FAILURE`,

  DELETE_BLOG: `[${prefix}]DELETE_BLOG`,
  DELETE_BLOG_SUCCESS: `[${prefix}]DELETE_BLOG->SUCCESS`,
  DELETE_BLOG_FAILURE: `[${prefix}]DELETE_BLOG->FAILURE`,

  SAVE_BLOG_TO_DRAFT: `[${prefix}]SAVE_BLOG_TO_DRAFT`,
  LOAD_BLOG_FROM_DRAFT: `[${prefix}LOAD_BLOG_FROM_DRAFT]`,
};

export const deleteBlog = id => ({
  type: definition.DELETE_BLOG,
  payload: {
    id
  }
});

export const deleteBlogSuccess = (id) => ({
  type: definition.DELETE_BLOG_SUCCESS,
  payload: {
    id
  }
});

export const deleteBlogFailure = () => ({
  type: definition.DELETE_BLOG_FAILURE,
});

export const deleteBlogTag = (id=null, tag=null) => ({
  type: definition.DELETE_BLOG_TAG,
  payload: {
    id,
    tag
  }
});

export const commitBlogTag = (id=null) => ({
  type: definition.COMMIT_BLOG_TAG,
  payload: {
    id
  }
});

export const submitBlog = (id=null) => ({
  type: definition.SUBMIT_BLOG,
  payload: {
    id
  }
});

export const submitBlogSuccess = () => ({
  type: definition.SUBMIT_BLOG_SUCCESS,
});

export const submitBlogFailure = () => ({
  type: definition.SUBMIT_BLOG_FAILURE,
});

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

export const getAllTags = () => ({
  type: definition.GET_ALL_TAGS,
});

export const getAllTagsSuccess = (data) => ({
  type: definition.GET_ALL_TAGS_SUCCESS,
  payload: {
    response: data
  },
});

export const getAllTagsFailure = (data) => ({
  type: definition.GET_ALL_TAGS_FAILURE,
  payload: {
    response: data
  },
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

export const editBlog = (id) => ({
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

export const saveBlogToDraft = () => ({
  type: definition.SAVE_BLOG_TO_DRAFT
});

export const loadBlogFromDraft = () => ({
  type: definition.LOAD_BLOG_FROM_DRAFT
});