const homeSelector = (state) => state.HomeReducer;

export const blogsSelector = state => homeSelector(state).blogs;
export const uiSelector = state => homeSelector(state).ui;

export default {
  blogsSelector,
  uiSelector,
};