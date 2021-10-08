import React from 'react';
import logo from '../rickandmortylogo.png';
import { useSelector, useDispatch } from 'react-redux';
import { deleteFavorite } from '../index.js';

const Favorites = () => {
    const theFavorites = useSelector(state => state.favoritesList);
    const userNow = useSelector(state => state.currentUser);
    const loggedIn = useSelector(state => state.loggedIn);
    const dispatch = useDispatch();

    const deleteData = (theItemAndIndex) => {
        dispatch(deleteFavorite(theItemAndIndex));
        const favoritesCopy = [...theFavorites];
        let theData = [];
        for (let i = 0; i < favoritesCopy.length; i++) {
            if (favoritesCopy[i][0] !== theItemAndIndex) {
                theData.push(favoritesCopy[i]);
            }
        }
        if (loggedIn === true) {
            fetch('/deleteFavorite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    theData,
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
            <h2>Here are your favorites!</h2>
            <h2>Click on the character to remove her or him from your favorites!</h2>
            <div className="row m-1">
            {theFavorites.length === 0 ?
            <>
            <div className="col"></div>
            <div className="col"><h2>Choose some favorites!</h2></div>
            <div className="col"></div>
            </>
            :
            theFavorites.map((item, id) => {
                return (
                    <div className="col-md-4 border border-dark rounded" id="square" onClick={() => deleteData(item[0])}>
                    <h2>{item[0]}</h2>
                    <img src={item[1]} className="border rounded" />
                    <h4>Location: {item[2]}</h4>
                    <h4>Status: {item[3]}</h4>
                    </div>
                );
            })}
            </div>
        </div>
    );
};

export default Favorites;
