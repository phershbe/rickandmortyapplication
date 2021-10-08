import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUserMessage } from '../index.js';
import { logInOut } from '../index.js';
import { homepage } from '../index.js';
import { setUser } from '../index.js';
import { favoritesFromDatabase } from '../index.js';
import { loggedIn } from '../index.js';
import { updateUser } from '../index.js';

const Login = () => {
    const user = useSelector(state => state.currentUser);
    const userLoggedIn = useSelector(state => state.loggedIn);
    const dispatch = useDispatch();
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const readUsername = (e) => {
        setUsername(e.target.value);
    };

    const readPassword = (e) => {
        setPassword(e.target.value);
    }

    const sendData = async (e) => {
        e.preventDefault();
        const fetchData = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
        });
        const jsonData = await fetchData.json();
        const setMessage = dispatch(setUserMessage(jsonData.message));
        if (setMessage.payload === 'Username not found') {
            setErrorMessage('Username not found');
        } else if (setMessage.payload === 'Login unsuccessful') {
            setErrorMessage('Login unsuccessful');
        } else {
            dispatch(setUser(jsonData.user));
            dispatch(logInOut());
            dispatch(favoritesFromDatabase(jsonData.favorites));
            dispatch(homepage());
            setErrorMessage('');
        }
        setUsername('');
        setPassword('');
    };

    return (
        <>
        <h1 className="text-center mt-5 pt-4">Login</h1>
        <form className="text-center">
            <input placeholder="username" type="text" className="h4" onChange={readUsername} value={username} />
            <input placeholder="password" type="password" className="h4" onChange={readPassword} value={password} />
            <button onClick={sendData}>Submit</button>
        </form>
        <h3 className="text-center">{errorMessage}</h3>
        
        </>
    );
}

export default Login;
