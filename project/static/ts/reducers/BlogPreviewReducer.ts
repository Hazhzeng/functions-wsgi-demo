import IActionBase from '../actions/ActionBase';

export interface IBlogPreview {
  title: string,
  tags: string[],
  text: string,
  update: string,
}

const initialState = (): IBlogPreview => ({
  title: undefined,
  tags: undefined,
  text: undefined,
  update: undefined,
});

export default (state = initialState(), action: IActionBase) => {
  switch (action.type) {
    default:
      return state;
  }
};