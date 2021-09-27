import react from 'react';
import './header.css';
import { useDispatch } from 'react-redux';
import { homepage } from '../index.js';
import { register } from '../index.js';
import { login } from '../index.js';

const Header = () => {
    const dispatch = useDispatch();
    return (
        <nav class="navbar navbar-dark py-3 fixed-top justify-content-around bg-primary mr-2 ml-2">
            <a className="text-white h3" href="#" onClick={() => dispatch(homepage())}>Home</a>
            <ul className="ml-auto mt-2">
                <li className="float-right mr-3"><a href="#" className="text-white h3" onClick={() => dispatch(register())}>Register</a></li>
                <li className="float-right mr-3"><a href="#" className="text-white h3" onClick={() => dispatch(login())}>Login</a></li>
            </ul>
        </nav>
    );
};

export default Header;