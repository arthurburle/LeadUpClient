import leadUpApi from '../api/leadUp';
import { FETCH_CARDS } from './types';
import * as RootNavigation from '../routes/RootNavigation';

export const fetchCards = () => async dispatch => {
  const response = await leadUpApi.get('/cards');
  dispatch({ type: FETCH_CARDS, payload: response.data });
};

export const createCard = (title, description) => async dispatch => {
  await leadUpApi.post('/cards', { title, description });

  RootNavigation.navigate('CardList');
};

export const editCard = (title, description, _id) => async dispatch => {
  await leadUpApi.put(`/cards/${_id}`, { title, description });
  RootNavigation.navigate('CardList');
};

export const deleteCard = _id => async dispatch => {
  await leadUpApi.delete(`/cards/${_id}`);
  RootNavigation.navigate('CardList');
};
