import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logInOut } from '../index.js';
import { setUserMessage } from '../index.js';
import { setUser } from '../index.js';
import { favoritesFromDatabase } from '../index.js';

const UsernameAndLogout = () => {
    const theUser = useSelector(state => state.currentMessage);
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(logInOut());
        dispatch(setUserMessage(''));
        dispatch(setUser(''));
        dispatch(favoritesFromDatabase(''));
    };

    return (
        <>
            <li className="float-right mr-3"><a href="#" className="text-white h3" onClick={logout}>Logout</a></li>
            <li className="float-right mr-3 text-white h3">{theUser}</li>
        </>
    );
};

export default UsernameAndLogout;
