import { IBlogPreview } from '../models';
import IActionBase from '../actions/ActionBase';

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