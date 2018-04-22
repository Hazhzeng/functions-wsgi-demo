const blogSelector = (state) => state.BlogReducer;

export const titleSelector = state => blogSelector(state).title;
export const textSelector = state => blogSelector(state).text;
export const tagSelector = state => blogSelector(state).tag;

export const isValidSelector = state => {
  return blogSelector(state).title && blogSelector(state).text;
}

export default {
  titleSelector,
  textSelector,
  tagSelector,
  isValidSelector,
};
