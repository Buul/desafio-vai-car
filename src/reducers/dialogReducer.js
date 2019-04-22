import { DIALOG_ADD, DIALOG_REMOVE } from '../helpers/constants';

export default function(state = [], action) {
  switch (action.type) {
    case DIALOG_ADD:
      return [...state, action.payload];
    case DIALOG_REMOVE:
      return [];
    default:
  }

  return state;
}
