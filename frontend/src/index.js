import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

let initialState = {
  currentPage: 'homepage'
}

// reducer
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'HOMEPAGE':
      return {
        ...state,
        currentPage: 'homepage',
      };
    case 'REGISTER':
      return {
        ...state,
        currentPage: 'register',
      };
    case 'LOGIN':
      return {
        ...state,
        currentPage: 'login',
      };
    default:
      return state;
  }
}

// actions
export const homepage = () => {
  return {
    type: 'HOMEPAGE'
  };
}

export const register = () => {
  return {
    type: 'REGISTER'
  };
}

export const login = () => {
  return {
    type: 'LOGIN'
  };
}

// store
let myStore = createStore(reducer);

ReactDOM.render(
  <Provider store={myStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);
