import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Students = (props) => {
    const { students } = props;
    return (
        <div className='container'>
            <p><Link to='/'>Home</Link></p>
            <h1>Students</h1>
            <ul>
                {
                    students.map(student => {
                        return (
                            <div key={student.id}>
                                <li><Link to={`/students/${student.id}`} >{student.name}</Link></li>
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
        students: state.students
    }
}

const StudentsContainer = connect(mapStateToProps, null)(Students);
export default StudentsContainer;