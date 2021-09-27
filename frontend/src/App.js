import React from 'react';
import './App.css';
import Body from './components/body.js';
import Header from './components/header.js';
import Register from './components/register.js';
import Login from './components/login.js';
import { useSelector, useDispatch } from 'react-redux';

const App = () => {
  const currentPage = useSelector(state => state.currentPage);
  
  return (
      <>
        <Header />
        {currentPage === 'homepage' ? <Body /> :
         currentPage === 'register' ? <Register /> :
         currentPage === 'login' ? <Login /> :
        <Body />}
      </>
    );
}

export default App;
