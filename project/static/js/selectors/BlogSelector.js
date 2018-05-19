const blogSelector = (state) => state.BlogReducer;

export const titleSelector = state => blogSelector(state).title;
export const textSelector = state => blogSelector(state).text;
export const tagsSelector = state => blogSelector(state).tags;
export const blogIdSelector = state => blogSelector(state).id;

export const isSubmittableSelector = state => {
  return blogSelector(state).title && blogSelector(state).text;
}

export const isAmendmentSelector = state => {
  return blogSelector(state).amendment;
}

export default {
  titleSelector,
  textSelector,
  tagsSelector,
  blogIdSelector,
  isSubmittableSelector,
  isAmendmentSelector,
};