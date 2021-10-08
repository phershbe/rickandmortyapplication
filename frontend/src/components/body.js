import React, { useState, useEffect } from 'react';
import logo from '../rickandmortylogo.png';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite } from '../index.js';

const Body = () => {
  const [characters, setCharacters] = useState([]);
  const [currentName, setCurrentName] = useState('Placeholder');
  const [nameInput, setNameInput] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [loading, setLoading] = useState(true);

  const favorites = useSelector(state => state.favoritesList);
  const userNow = useSelector(state => state.currentUser);
  const loggedIn = useSelector(state => state.loggedIn);
  const dispatch = useDispatch();
  
  useEffect(() => {
      let isMounted = true;
      let url = 'https://rickandmortyapi.com/api/character/';
      let array = [];
      const getData = async () => {
        for (let i = 1; i < 4; i++) {
          let response = await fetch(url);
          let data = await response.json();
          for (let j = 0; j < 20; j++) {
          array.push(data.results[j]);
          }
          url = data.info.next;
        }
        if (isMounted) {
          setCharacters(array);
          setLoading(false);
        }}
      getData();
      return () => {
        isMounted = false;
      }
  }, []);

  const readInput = (e) => {
      setNameInput(e.target.value);
  }

  const readLocationInput = (e) => {
      setLocationInput(e.target.value);
  }

  const addData = (a, b, c, d) => {
    const array = [a, b, c, d];
    const favoritesCopy = [...favorites];
    favoritesCopy.push(array);
    dispatch(addFavorite(array));
    if (loggedIn === true) {
      fetch('/addFavorite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          favoritesCopy,
          username: userNow,
        }),
      });
    }
  };

  return (
    <div className="pt-5">
    <div className="text-center mt-5">
      <img src={logo} className="img-fluid" />
    </div>
    <h2>Click on a character here to add them to your favorites. Choose "Check Favorites" in the menu bar to see your favorites and "Search Characters" to come back.</h2>
      <div className="all">
        <h4>Search by name:</h4>
        <input onChange={readInput} />
        <h4>Search by location:</h4>
        <input onChange={readLocationInput} />
        <br />
        <div className="row m-1">
        
        {loading ? 'Loading can take a few seconds. Your Rick and Morty experience will be ready soon!' : characters.filter((item) => {
          if (nameInput == "") {
            return item;
          } else {
            if (item.name.toLowerCase().includes(nameInput.toLowerCase())) {
              return item;
            }
          }
        }).filter((item) => {
          if (locationInput == "") {
            return item;
          } else {
            if (item.location.name.toLowerCase().includes(locationInput.toLowerCase())) {
              return item;
            }
          }
        }).map((item, id) => {
          return (
          <>
              <div className="col-md-4 border border-dark rounded" id="square" onClick={() => addData(item.name, item.image, item.location.name, item.status)}>
              <h2>{item.name}</h2>
              <img src={item.image} className="border rounded" />
              <h4>Location: {item.location.name}</h4>
              <h4>Status: {item.status}</h4>
              </div>
          </>
          )
        })}
        </div>
      </div>
    </div>
  );
};

export default Body;
