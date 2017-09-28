import axios from 'axios';
import store from '../store';

const initialState = {
    students: [],
    student: {},
    err: ''
}

//action types

const GET_STUDENTS = 'GET_STUDENTS';
const GET_STUDENT = 'GET_STUDENT';
const POST_STUDENT = 'POST_STUDENT'
const PUT_STUDENT = 'PUT_STUDENT';
const DELETE_STUDENT = 'DELETE_STUDENT';
const UPDATE_BIO = 'UPDATE_BIO';
const ERR = 'ERR'


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

export function putStudent(student) {
    return {
        type: PUT_STUDENT,
        student
    }
}

export function postStudent(student) {
    return {
        type: POST_STUDENT,
        student
    }
}

export function deleteStudent(students) {
    return {
        type: DELETE_STUDENT,
        students
    }
}

export function updateBio(student) {
    return {
        type: UPDATE_BIO,
        student
    }
}

export function err(err) {
    return {
        type: ERR,
        err
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
            }).catch(console.log)
    }
}

export function fetchStudent(studentId) {

    return function thunk(dispatch) {
        return axios.get(`/api/students/${studentId}`)
            .then(res => res.data)
            .then(student => {
                const action = getStudent(student);
                dispatch(action);
            }).catch(console.log)
    }
}

export function newStudent(student) {
    return function thunk(dispatch) {
        return axios.post(`/api/students`, student)
            .then(res => res.data)
            .then(student => {
                const action = postStudent(student);
                dispatch(action);
            }).catch(error => {
                const action = err('Enter a valid name');
                dispatch(action);
            })
    }
}

export function updateStudent(studentId, state) {
    return function thunk(dispatch) {
        return axios.put(`/api/students/${studentId}`, state)
            .then(res => res.data)
            .then(student => {
                const action = putStudent(student);
                dispatch(action);
            }).catch(console.log)
    }
}

export function delStudent(studentId, students) {
    return function thunk(dispatch) {
        return axios.delete(`/api/students/${studentId}`)
            .then(res => res.data)
            .then(() => {
                const filtered = students.filter(student => student.id !== studentId);
                const action = deleteStudent(filtered);
                dispatch(action);
            }).catch(console.log)
    }
}


//reducer

export default function studentReducer(state = initialState, action) {
    switch (action.type) {
        case GET_STUDENTS:
            return Object.assign({}, state, { students: action.students });
        case GET_STUDENT:
            return Object.assign({}, state, { student: action.student });
        case POST_STUDENT:
            return Object.assign({}, state, { students: [...state.students, action.student] });
        case PUT_STUDENT:
            return Object.assign({}, state, { student: action.student });
        case DELETE_STUDENT:
            return Object.assign({}, state, { students: action.students });
        case UPDATE_BIO:
            return Object.assign({}, state, { student: action.student });
        case ERR:
            return Object.assign({}, state, { err: action.err });
        default:
            return state;
    }
}

