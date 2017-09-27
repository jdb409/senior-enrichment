import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import CampusForm from './CampusForm';
import { delCampus } from '../reducers/campusStore';

const Campuses = (props) => {
    const { campuses } = props;
    console.log(campuses);
    return (
        <div className='container box'>
            <h1>Campuses</h1>
            <CampusForm />
            <ul>
                {
                    campuses.map(campus => {
                        return (
                            <div key={campus.id}>
                                <li><h4><Link to={`/campuses/${campus.id}`}>{campus.name}</Link></h4></li>
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
    console.log(state)
    return {
        campuses: state.campus.campuses
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
