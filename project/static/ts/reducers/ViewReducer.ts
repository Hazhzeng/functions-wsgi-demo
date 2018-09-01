import { ECurrent } from '../constants/ViewConstants';
import IActionBase from '../actions/ActionBase';

export interface IView {
  current: ECurrent
} 

const initialState = (): IView => ({
  current: ECurrent.initialised,
});

export default (state = initialState(), action: IActionBase) => {
  switch (action.type) {
    default:
      return state;
  }
};