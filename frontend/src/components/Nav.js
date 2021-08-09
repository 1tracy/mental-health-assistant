import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

function Nav() {
    return (
        <nav id="">
            <ul className="nav-links">
                <Link to='/resources'>
                    <button className="">Resources</button>
                </Link>
                <Link to='/'>
                    <button className="">Home</button>
                </Link>
            </ul>
        </nav>
    )
}
export default Nav;