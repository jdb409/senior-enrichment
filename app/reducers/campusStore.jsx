import axios from 'axios';

const initialState = {
    campuses: [],
    campus: {}
}

//action types
const GET_CAMPUSES = 'GET_CAMPUSES';
const GET_CAMPUS = 'GET_CAMPUS';
const POST_CAMPUS = 'POST_CAMPUS';
const PUT_CAMPUS = 'PUT_CAMPUS';
const DELETE_CAMPUS = 'DELETE_CAMPUS';

//action creators

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

export function deleteCampus(campuses) {
    return {
        type: DELETE_CAMPUS,
        campuses
    }
}

//thunks


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

export function delCampus(campusId, campuses) {
    return function thunk(dispatch) {
        return axios.delete(`/api/campuses/${campusId}`)
            .then(res => res.data)
            .then(() => {
                const filtered = campuses.filter(campus => campus.id !== campusId);
                const action = deleteCampus(filtered);
                dispatch(action);
            })
    }
}


//reducer

export default function campusReducer(state = initialState, action) {
    console.log(state);
    switch (action.type) {
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
