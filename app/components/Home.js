import React from 'react';
import { Link } from 'react-router-dom';
import loremIpsum from 'lorem-ipsum';

const Home = () => {
    const lorem = loremIpsum({ count: 5, units: 'paragraphs' });
    return (
        <div>
            <h1 className='container'>Welcome to Interplanetary Academy of Javascript</h1>
            <br/>
            <h5>{lorem}</h5>
        </div>
    );
}

export default Home;