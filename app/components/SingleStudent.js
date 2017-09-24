import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'router';

const SingleStudent = (props) => {
    return (
        <h1>Student</h1>
    )
}

const SingleStudentContainer = connect(null,null)(SingleStudent);
export default SingleStudentContainer;