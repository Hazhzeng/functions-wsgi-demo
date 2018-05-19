import Blog from '../constants/BlogConstants';

export const changeTitle = (title) => ({
  type: Blog.CHANGE_TITLE,
  payload: title,
});

export const changeTag = (tag) => ({
  type: Blog.CHANGE_TAG,
  payload: tag,
});

export const changeProcessedTags = (tags) => ({
  type: Blog.CHANGE_PROCESSED_TAGS,
  payload: tags,
});

export const changeText = (text) => ({
  type: Blog.CHANGE_TEXT,
  payload: text,
});

export const submitBlog = () => ({
  type: Blog.SUBMIT_BLOG,
});

export const submitBlogLoading = () => ({
  type: Blog.SUBMIT_BLOG_LOADING,
});

export const submitBlogSuccess = () => ({
  type: Blog.SUBMIT_BLOG_SUCCESS,
});

export const submitBlogFailure = () => ({
  type: Blog.SUBMIT_BLOG_Failure,
});

export const deleteBlog = (blogId) => ({
  type: Blog.DELETE_BLOG,
  payload: blogId,
});

export const deleteBlogSuccess = (blogId) => ({
  type: Blog.DELETE_BLOG_SUCCESS,
  payload: blogId,
});

export const deleteBlogFailure = () => ({
  type: Blog.DELETE_BLOG_FAILURE,
});

export const setAdmentment = (blogId) => ({
  type: Blog.SET_AMENDMENT,
  payload: blogId,
});

export const initialise = () => ({
  type: Blog.INITIALISE,
});