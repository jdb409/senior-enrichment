import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import createLogger from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk
import axios from 'axios';

const initialState = {
    students: [],
    campuses: [],
    student: {},
    campus: {}
}

//action types
const GET_CAMPUSES = 'GET_CAMPUSES';
const GET_CAMPUS = 'GET_CAMPUS';
const POST_CAMPUS = 'POST_CAMPUS';
const PUT_CAMPUS = 'PUT_CAMPUS';
const DELETE_CAMPUS = 'DELETE_CAMPUS';

const POST_STUDENT = 'POST_STUDENT'
const GET_STUDENTS = 'GET_STUDENT';
const GET_STUDENT = 'GET_STUDENT';


//action creators

export function getStudents(students) {
    return {
        type: GET_STUDENTS,
        students
    }
}

export function getStudent(student) {
    return {
        type: GET_STUDENT,
        student
    }
}

export function postStudent(student) {
    return {
        type: POST_STUDENT,
        student
    }
}


export function getCampuses(campuses) {
    return {
        type: GET_CAMPUSES,
        campuses
    }
}

export function getCampus(campus) {
    return {
        type: GET_CAMPUS,
        campus
    }
}


export function postCampus(campus) {
    return {
        type: POST_CAMPUS,
        campus
    }
}
export function putCampus(campus) {
    return {
        type: PUT_CAMPUS,
        campus
    }
}

export function deleteCampus(campus) {
    return {
        type: DELETE_CAMPUS,
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

export function fetchStudent(studentId) {

    return function thunk(dispatch) {
        return axios.get(`/api/students/${studentId}`)
            .then(res => res.data)
            .then(student => {
                const action = getStudent(student);
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


export function fetchCampus(campusId) {

    return function thunk(dispatch) {
        return axios.get(`/api/campuses/${campusId}`)
            .then(res => res.data)
            .then(campus => {
                const action = getCampus(campus);
                dispatch(action);
            })
    }
}

export function newStudent(student) {
    return function thunk(dispatch) {
        return axios.post(`/api/students`, student)
            .then(res => res.data)
            .then(student => {
                const action = postStudent(student);
                dispatch(action);
            })
    }
}

export function newCampus(campus) {
    return function thunk(dispatch) {
        return axios.post('/api/campuses', campus)
            .then(res => res.data)
            .then(campus => {
                const action = postCampus(campus);
                dispatch(action);
            })
    }
}

export function updateCampus(campusId, studentId, del) {
    return function thunk(dispatch) {
        return axios.put(`/api/campuses/${campusId}`, { studentId, del })
            .then(res => res.data)
            .then(campus => {
                const action = putCampus(campus);
                dispatch(action);
            })
    }
}

export function delCampus(campusId) {
    return function thunk(dispatch) {
        return axios.delete(`/api/campuses/${campusId}`)
            .then(res => res.data)
            .then(campuses => {
                const action = deleteCampus(campuses);
                dispatch(action);
            })
    }
}


//reducer

function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_STUDENTS:
            return Object.assign({}, state, { students: action.students });
        case GET_STUDENT:
            return Object.assign({}, state, { student: action.student })
        case POST_STUDENT:
            return Object.assign({}, state, { students: [...state.students, action.student] });

        case GET_CAMPUSES:
            return Object.assign({}, state, { campuses: action.campuses });
        case GET_CAMPUS:
            return Object.assign({}, state, { campus: action.campus });
        case POST_CAMPUS:
            return Object.assign({}, state, { campuses: [...state.campuses, action.campus] });
        case PUT_CAMPUS:
            return Object.assign({}, state, { campus: action.campus });
        case DELETE_CAMPUS:
            return Object.assign({}, state, { campuses: action.campuses });
        default:
            return state;
    }
}


export default createStore(reducer, applyMiddleware(thunkMiddleware, createLogger()))