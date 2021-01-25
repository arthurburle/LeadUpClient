import { FETCH_CARDS } from '../actions/types';

const INITIAL_STATE = [];

export default function cardsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_CARDS:
      return action.payload;
    default:
      return state;
  }
}
