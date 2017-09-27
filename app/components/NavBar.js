import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {

    return (
        <nav className="navbar navbar-default">
            <ul className="nav navbar-nav">
                <li><Link to='/'>Home</Link></li>
                <li><Link to={`/students`}>Students</Link></li>
                <li><Link to={`/campuses`}>Campuses</Link></li>
            </ul>
        </nav>
    );
}

export default NavBar;