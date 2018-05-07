import Blog from '../constants/BlogConstants';

export const changeTitle = (title) => ({
  type: Blog.CHANGE_TITLE,
  payload: title,
});

export const changeTag = (tag) => ({
  type: Blog.CHANGE_TAG,
  payload: tag,
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
