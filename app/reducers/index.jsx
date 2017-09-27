import { combineReducers } from 'redux'
import student from './studentStore';
import campus from './campusStore';

const rootReducer = combineReducers({
  student, campus
});

export default rootReducer;
