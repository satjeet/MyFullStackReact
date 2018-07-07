import 'materialize-css/dist/css/materialize.min.css';
//puedo importar en css en cualquier js , como no le puse / , asume que es un npm module
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import reduxThunk from 'redux-thunk';
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);

console.log('la llave de stripe es', process.env.REACT_APP_STRIPE_KEY);
