import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const SingleStudent = (props) => {
    let { student } = props;
    if (student.length < 1) return <div />
    student = student[0];
    console.log(student);
    return (
        <div>
            <p><Link to='/'>Home</Link></p>
            <h1>{student.name}</h1>
            <h2>{student.name} goes to <Link to={`/campuses/${student.campus.id}`}>{student.campus.name}</Link></h2>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    const studentId = ownProps.match.params.studentId * 1;
    return {
        student: state.students.filter(student => student.id === studentId)
    }
}

const SingleStudentContainer = connect(mapStateToProps, null)(SingleStudent);
export default SingleStudentContainer;