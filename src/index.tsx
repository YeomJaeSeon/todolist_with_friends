import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import rootReducer from './modules/index';
import AuthService from './services/auth_service';
import Database from './services/data_service';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers());

const authService = new AuthService();
const databaseService = new Database();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App authService={authService} databaseService={databaseService} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
