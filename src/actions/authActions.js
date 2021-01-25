import AsyncStorage from '@react-native-async-storage/async-storage';
import { SIGN_IN, SIGN_OUT, ADD_ERROR, CLEAR_ERROR_MESSAGE } from './types';
import leadUpApi from '../api/leadUp';
import * as RootNavigation from '../routes/RootNavigation';

export const tryLocalSignin = () => async dispatch => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    dispatch({ type: SIGN_IN, payload: token });
    RootNavigation.navigate('CardList');
  } else {
    RootNavigation.navigate('Signup');
  }
};

export const signup = ({ email, password }) => async dispatch => {
  try {
    const response = await leadUpApi.post('/signup', { email, password });
    await AsyncStorage.setItem('token', response.data.token);
    dispatch({ type: SIGN_IN, payload: response.data.token });

    RootNavigation.navigate('CardList');
  } catch (err) {
    dispatch({
      type: ADD_ERROR,
      payload: 'Ops! Tivemos um problema com o seu registro',
    });
  }
};

export const signin = ({ email, password }) => async dispatch => {
  try {
    const response = await leadUpApi.post('/signin', { email, password });
    await AsyncStorage.setItem('token', response.data.token);
    dispatch({ type: SIGN_IN, payload: response.data.token });

    RootNavigation.navigate('CardList');
  } catch (err) {
    dispatch({
      type: ADD_ERROR,
      payload: 'Email ou senha incorretos',
    });
  }
};

export const signout = () => async dispatch => {
  await AsyncStorage.removeItem('token');
  dispatch({ type: SIGN_OUT });
  RootNavigation.navigate('Signup');
};

export const clearErrorMessage = () => {
  return { type: CLEAR_ERROR_MESSAGE };
};
