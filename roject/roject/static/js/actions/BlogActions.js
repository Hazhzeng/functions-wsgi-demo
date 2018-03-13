import Blog from '../constants/BlogConstants';

const changeTitle = (title) => ({
  type: Blog.CHANGE_TITLE,
  payload: title,
});

export default {
  changeTitle,
};
