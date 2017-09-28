import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateStudent, fetchStudent } from '../reducers/studentStore';
import loremIpsum from 'lorem-ipsum';
import EditStudent from './EditStudent';

class SingleStudent extends Component {
    constructor() {
        super();
        this.deleteCampus = this.deleteCampus.bind(this);
    }

    componentDidMount() {
        const studentId = this.props.match.params.studentId * 1;
        this.props.fetchStudent(studentId)
    }

    deleteCampus(ev) {
        ev.preventDefault();
        this.props.updateStudent(this.props.student.id)
    }

    render() {
        const { student } = this.props;
        const { deleteCampus } = this;
        const lorem = loremIpsum({ units: 'paragraphs' });
        return (
            <div className='student'>
                <div className='row'>
                    <div className='col-sm-6'>
                        <div>
                            <h1>{student.name}</h1>
                            <h3>Email: {student.email}</h3>
                            {
                                //Check to see if Student has a campus

                                student.campus ?
                                    <h2>Campus: <Link to={`/campuses/${student.campus.id}`}>{student.campus.name}</Link></h2>
                                    :
                                    <h2>{student.name} has not been asigned a campus</h2>
                            }
                            <button onClick={deleteCampus} className='btn btn-xs btn-danger'>Remove Campus</button>

                            <div className='panel panel-default'>
                                <p className='panel panel-heading'>Biography</p>
                                <p className='panel panel-body'>{student.bio || lorem}</p>
                            </div>
                        </div>
                    </div>

                    <div className='col-sm-6'>
                        <EditStudent bio={lorem} name={student.name} />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ student }) => {

    return {
        student: student.student,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchStudent: (studentId) => {
            dispatch(fetchStudent(studentId))
        }, updateStudent: (studentId, campusId) => {
            dispatch(updateStudent(studentId, campusId));
        }
    }
}

const SingleStudentContainer = connect(mapStateToProps, mapDispatchToProps)(SingleStudent);
export default SingleStudentContainer;
