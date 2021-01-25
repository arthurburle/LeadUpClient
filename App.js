import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import StackNavigator from './src/routes/StackNavigator';
import reducers from './src/reducers';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <StackNavigator />
    </Provider>
  );
}
