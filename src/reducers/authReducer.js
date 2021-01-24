import { FETCH_USER, TEST } from '../actions/types';

export default function authReducer(state = null, action) {
  switch (action.type) {
    case TEST:
      return { test: action.payload };
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
}
