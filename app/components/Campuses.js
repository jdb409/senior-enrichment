import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Campuses = (props) => {
    const { campuses } = props;
    return (
        <div className='container'>
            <p><Link to='/'>Home</Link></p>
            <h1>Campuses</h1>
            <ul>
                {
                    campuses.map(campus => {
                        return (
                            <div key={campus.id}>
                                <li>{campus.name}</li>
                            </div>
                        )
                    })
                }
            </ul>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        campuses: state.campuses
    }
}

const CampusesContainer = connect(mapStateToProps, null)(Campuses)
export default CampusesContainer;
