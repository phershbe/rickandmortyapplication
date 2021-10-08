import react from 'react';
import './header.css';
import { useSelector, useDispatch } from 'react-redux';
import { homepage } from '../index.js';
import { favorites } from '../index.js';
import RegisterLoginLinks from './registerloginlinks.js';
import UsernameAndLogout from './usernameandlogout.js';

const Header = () => {
    const userLoggedIn = useSelector(state => state.loggedIn);
    const dispatch = useDispatch();
    return (
        <nav class="navbar navbar-dark py-2 fixed-top justify-content-around bg-primary mr-2 ml-2">
            <a className="text-white h3 ml-3" href="#" onClick={() => dispatch(homepage())}>Home</a>
            <a className="text-white h3 ml-3" href="#" onClick={() => dispatch(favorites())}>Check Favorites</a>
            <ul className="ml-auto mt-2">
                {userLoggedIn ? <UsernameAndLogout /> : <RegisterLoginLinks />}
            </ul>
        </nav>
    );
};

export default Header;
