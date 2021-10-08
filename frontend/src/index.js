import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

let initialState = {
  currentPage: 'homepage',
  currentMessage: '',
  currentUser: '',
  favoritesList: [],
  loggedIn: false,
};

// reducer
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'HOMEPAGE':
      return {
        ...state,
        currentPage: 'homepage',
      };
    case 'FAVORITES':
      return {
        ...state,
        currentPage: 'favorites',
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
    case 'USERMESSAGE':
      return {
        ...state,
        currentMessage: action.payload,
      };
    case 'USERNOW':
      return {
        ...state,
        currentUser: action.payload,
      };
    case 'ADDFAVORITE':
      return {
        ...state,
        favoritesList: [...state.favoritesList, action.payload]
      };
    case 'DELETEFAVORITE':
      return {
        ...state,
        favoritesList: state.favoritesList.filter(item => action.payload !== item[0]),
      };
    case 'LOGINOUT':
      console.log(state.loggedIn);
      return {
        ...state,
        loggedIn: !state.loggedIn,
      };
    case 'FAVORITESFROMDATABASE':
      return {
        ...state,
        favoritesList: action.payload,
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

export const favorites = () => {
  return {
    type: 'FAVORITES'
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

export const setUserMessage = (username) => {
  return {
    type: 'USERMESSAGE',
    payload: username,
  };
}

export const setUser = (username) => {
  return {
    type: 'USERNOW',
    payload: username,
  };
}

export const addFavorite = (character) => {
  return {
    type: 'ADDFAVORITE',
    payload: character,
  };
}

export const deleteFavorite = (character) => {
  return {
    type: 'DELETEFAVORITE',
    payload: character,
  };
}

export const logInOut = () => {
  return {
    type: 'LOGINOUT',
  };
}

export const favoritesFromDatabase = (array) => {
  return {
    type: 'FAVORITESFROMDATABASE',
    payload: array,
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
