import Home from '../constants/HomeConstants';

export const pullBlog = () => ({
  type: Home.PULL_BLOG,
});

export const pullBlogSuccess = blogs => ({
  type: Home.PULL_BLOG_SUCCESS,
  payload: blogs,
});

export const pullBlogFailure = error => ({
  type: Home.PULL_BLOG_FAILURE,
  payload: { error: error },
});
