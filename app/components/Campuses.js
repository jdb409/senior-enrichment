import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import CampusForm from './CampusForm';
import { delCampus } from '../store';

const Campuses = (props) => {
    const { campuses } = props;
    return (
        <div className='container'>
            <p><Link to='/'>Home</Link></p>
            <h1>Campuses</h1>
            <CampusForm />
            <ul>
                {
                    campuses.map(campus => {
                        return (
                            <div key={campus.id}>
                                <li><Link to={`/campuses/${campus.id}`}>{campus.name}</Link></li>
                                <p className='btn btn-xs btn-danger' onClick={() => props.deleteCampus(campus.id, campuses)}>Delete Campus</p>
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

const mapDispatchToProps = (dispatch) => {
    return {
        deleteCampus: (campusId, campuses) => {
            dispatch(delCampus(campusId, campuses));
        }
    }
}

const CampusesContainer = connect(mapStateToProps, mapDispatchToProps)(Campuses)
export default CampusesContainer;
