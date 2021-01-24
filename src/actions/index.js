import axios from 'axios';
import { FETCH_USER, TEST } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const test = a => dispatch => {
  dispatch({ type: TEST, payload: a });
};
