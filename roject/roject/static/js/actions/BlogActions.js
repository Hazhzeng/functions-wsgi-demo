import Blog from '../constants/BlogConstants';

export const changeTitle = (title) => ({
  type: Blog.CHANGE_TITLE,
  payload: title,
});

export const changeText = (text) => ({
  type: Blog.CHANGE_TEXT,
  payload: text,
});
