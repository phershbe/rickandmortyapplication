import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../index.js';


const Register = () => {
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const readUsername = (e) => {
        setUsername(e.target.value);
    };

    const readPassword = (e) => {
        setPassword(e.target.value);
    };

    const sendData = (e) => {
        e.preventDefault();
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });
        dispatch(login());
    }

    return (
        <>
        <h1 className="text-center mt-5 pt-4">Register</h1>
        <form className="text-center">
            <input placeholder="username" type="text" className="h4" onChange={readUsername} />
            <input placeholder="password" type="password" className="h4" onChange={readPassword} />
            <button onClick={sendData}>Submit</button>
        </form>
        </>
    )
}

export default Register;