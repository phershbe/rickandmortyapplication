import React from 'react';
import './App.css';
import Body from './components/body.js';
import logo from './rickandmortylogo.png';

class App extends React.Component {
  render() {
    return (
      <>
      <div className="text-center">
      <img src={logo} className="img-fluid" />
      </div>
      <h2>Click on a character here to add them to your favorites. Choose "Check Favorites" in the menu bar to see your favorites and "Search Characters" to come back.</h2>
      <Body />
      </>
    );
  }
}

export default App;
