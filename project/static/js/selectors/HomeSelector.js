const homeSelector = (state) => state.HomeReducer;

export const blogsSelector = state => homeSelector(state).blogs;
