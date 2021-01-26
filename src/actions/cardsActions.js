import leadUpApi from '../api/leadUp';
import { FETCH_CARDS } from './types';

export const fetchCards = () => async dispatch => {
  const response = await leadUpApi.get('/cards');
  dispatch({ type: FETCH_CARDS, payload: response.data });
};

export const createCard = (title, description) => async () => {
  await leadUpApi.post('/cards', { title, description });
};

export const editCard = (title, description, _id) => async () => {
  await leadUpApi.put(`/cards/${_id}`, { title, description });
};

export const deleteCard = _id => async () => {
  await leadUpApi.delete(`/cards/${_id}`);
};
