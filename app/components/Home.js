import React from 'react';
import { Link } from 'react-router-dom';
import loremIpsum from 'lorem-ipsum';

const Home = () => {
    const lorem = loremIpsum({ count: 5, units: 'paragraphs' });
    return (
        <div>
            <div className='banner'>
                <h1>Welcome to The Interplanetary Academy of Javascript</h1>
            </div>
            <div className='row content'>
                <div className='col-sm-6'>
                    <Link to={`/students`}><h3>Students</h3>
                        <img src='http://redkingsingh.tv/wp-content/uploads/2017/08/Good-Business-Short-Film.jpg' />
                    </Link>
                </div>
                <div className='col-sm-6'>
                    <Link to={`/campuses`}><h3>Campuses</h3>
                        <img src='http://study.com/cimages/multimages/16/charybdis_whirlpool.jpg' />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;