const homeSelector = (state) => state.HomeReducer;

export const blogsSelector = state => homeSelector(state).blogs;
export const uiSelector = state => homeSelector(state).ui;

export const isMenuShownSelector = state => homeSelector(state).ui.menu;

export default {
  blogsSelector,
  uiSelector,
  isMenuShownSelector,
};