import Home from '../constants/HomeConstants';

export const pullBlog = date => ({
  type: Home.PULL_BLOG,
  payload: {
    date: date
  },
});

export const pullBlogSuccess = blogs => ({
  type: Home.PULL_BLOG_SUCCESS,
  payload: blogs,
});

export const pullBlogFailure = error => ({
  type: Home.PULL_BLOG_FAILURE,
  payload: { error: error },
});

export const pullBlogLoading = () => ({
  type: Home.PULL_BLOG_LOADING,
});

export const toggleMenu = () => ({
  type: Home.TOGGLE_MENU,
});