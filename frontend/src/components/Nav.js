import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

function Nav() {
    return (
        <nav>
            <ul className="nav-links">
                <Link to='/resources'>
                    <button className="">Resources</button>
                </Link>
                <Link to='/journal'>
                    <button className="">Journal</button>
                </Link>
            </ul>
        </nav>
    )
}
export default Nav;