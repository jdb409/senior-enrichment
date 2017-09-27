import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import StudentForm from './StudentForm';
import { delStudent } from '../reducers/studentStore';


const Students = (props) => {
    const { students } = props;
    return (
        <div className='container'>
            <p><Link to='/'>Home</Link></p>
            <h1>Students</h1>
            <StudentForm />
            <ul>
                {
                    students.map(student => {
                        return (
                            <div key={student.id}>
                                <li><Link to={`/students/${student.id}`} >{student.name}</Link></li>
                                <p className='btn btn-sm btn-danger' onClick={() => props.deleteStudent(student.id, students)}>Delete Student</p>
                            </div>
                        )
                    })
                }
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        students: state.student.students
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteStudent: (studentId, students) => {
            dispatch(delStudent(studentId, students));
        }
    }
}

const StudentsContainer = connect(mapStateToProps, mapDispatchToProps)(Students);
export default StudentsContainer;