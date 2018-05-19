const homeSelector = (state) => state.HomeReducer;

export const blogsSelector = state => homeSelector(state).blogs;
export const uiSelector = state => homeSelector(state).ui;

export const blogSelector = (id) => state => {
  const blogs = homeSelector(state).blogs.filter(b => b.id === id);
  return blogs[0];
}

export const availableTagsSelector =
  state => homeSelector(state).availableTags;

export const isMenuShownSelector = state => homeSelector(state).ui.menu;

export default {
  blogSelector,
  blogsSelector,
  uiSelector,
  isMenuShownSelector,
  availableTagsSelector,
};