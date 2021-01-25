import {
  ADD_ERROR,
  SIGN_IN,
  SIGN_OUT,
  CLEAR_ERROR_MESSAGE,
} from '../actions/types';

const INITIAL_STATE = {
  token: null,
  errorMessage: '',
};

export default function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_ERROR:
      return { ...state, errorMessage: action.payload };
    case CLEAR_ERROR_MESSAGE:
      return { ...state, errorMessage: '' };
    case SIGN_IN:
      return { errorMessage: '', token: action.payload };
    case SIGN_OUT:
      return { token: null, errorMessage: '' };
    default:
      return state;
  }
}