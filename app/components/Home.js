import React from 'react';
import { Link } from 'react-router-dom';
import store from '../store';

const Home = () => {
    
    return (
        <div>
            <h1 className='container'>Welcome to Interplanetary Academy of Javascript</h1>
            <ul>
                <li><Link to={`/students`}>Students</Link></li>
                <li><Link to={`/campuses`}>Campuses</Link></li>
            </ul>
        </div>
    );
}

export default Home;