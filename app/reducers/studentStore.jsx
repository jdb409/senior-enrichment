import axios from 'axios';

const initialState = {
    students: [],
    student: {}
}

//action types

const GET_STUDENTS = 'GET_STUDENTS';
const GET_STUDENT = 'GET_STUDENT';
const POST_STUDENT = 'POST_STUDENT'
const PUT_STUDENT = 'PUT_STUDENT';
const DELETE_STUDENT = 'DELETE_STUDENT';
const UPDATE_BIO = 'UPDATE_BIO';


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

export function updateStudent(studentId, state) {
    return function thunk(dispatch) {
        return axios.put(`/api/students/${studentId}`, state)
            .then(res => res.data)
            .then(student => {
                const action = putStudent(student);
                dispatch(action);
            });
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
            })
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
        default:
            return state;
    }
}

