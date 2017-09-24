import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import createLogger from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk
import axios from 'axios';

const initialState = {
    students: [],
    campuses: []
}

//action types
const GET_STUDENTS = 'GET_STUDENTS_FROM_SERVER';
const GET_CAMPUSES = 'GET_CAMPUSES_FROM_SERVER';

//action creators

export function getStudents(students) {
    return {
        type: GET_STUDENTS,
        students
    }
}

export function getCampuses(campuses) {
    return {
        type: GET_CAMPUSES,
        campuses
    }
}

//thunks

export function fetchStudents() {

    return function thunk(dispatch) {
        return axios.get('/api/students')
            .then(res => res.data)
            .then(students => {
                const action = getStudents(students);
                dispatch(action);
            })
    }
}

export function fetchCampuses() {
    return function thunk(dispatch) {
        return axios.get('/api/campuses')
            .then(res => res.data)
            .then(campuses => {
                const action = getCampuses(campuses);
                dispatch(action);
            })
    }
}
//reducer

function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_STUDENTS:
            return Object.assign({}, state, { students: action.students });
        case GET_CAMPUSES:
            return Object.assign({}, state, { campuses: action.campuses });
        default:
            return state;
    }
}


export default createStore(reducer, applyMiddleware(thunkMiddleware, createLogger()))