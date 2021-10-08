import React from 'react';
import { register } from '../index.js';
import { login } from '../index.js';
import { useDispatch } from 'react-redux';

const RegisterLoginLinks = () => {
    const dispatch = useDispatch();
    return (
        <>
        <li className="float-right mr-3"><a href="#" className="text-white h3" onClick={() => dispatch(login())}>Login</a></li>
        <li className="float-right mr-3"><a href="#" className="text-white h3" onClick={() => dispatch(register())}>Register</a></li>
        </>
    );
};

export default RegisterLoginLinks;
