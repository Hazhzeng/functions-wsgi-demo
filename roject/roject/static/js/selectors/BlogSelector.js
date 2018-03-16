const blogSelector = (state) => state.BlogReducer;

export const textSelector = state => blogSelector(state).text;
