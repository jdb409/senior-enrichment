import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { updateStudent, fetchStudent } from '../store';

class SingleStudent extends Component {
    constructor() {
        super();
        this.state = { campusId: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteCampus = this.deleteCampus.bind(this);
    }

    componentDidMount() {
        const studentId = this.props.match.params.studentId * 1;
        this.props.fetchStudent(studentId)
    }

    handleChange(ev) {
        console.log(ev.target.value);
        this.setState({ campusId: ev.target.value });
    }

    handleSubmit(ev) {
        ev.preventDefault();
        console.log(this.props.student.id);
        this.props.updateStudent(this.props.student.id, this.state.campusId)
    }

    deleteCampus(ev) {
        ev.preventDefault();
        this.props.updateStudent(this.props.student.id)
    }

    render() {
        const { student, campuses } = this.props;
        console.log(this.props);
        const { handleChange, handleSubmit, deleteCampus } = this;

        return (
            <div className='row'>
                <div className='col-sm-6'>
                    <div>
                        <p><Link to='/'>Home</Link></p>
                        <h1>{student.name}</h1>
                        {student.campus ?
                            <h2>{student.name} goes to <Link to={`/campuses/${student.campus.id}`}>{student.campus.name}</Link></h2>
                            :
                            <h2>{student.name} has not been asigned a campus</h2>
                        }
                        <button onClick={deleteCampus} className='btn btn-xs btn-danger'>Remove Campus</button>
                    </div>
                </div>

                <div className='col-sm-6'>
                    <h1>Change Campus</h1>
                    <form onSubmit={handleSubmit}>
                        <select value={this.state.campustId} onChange={handleChange}>
                            <option>Pick a campus!</option>
                            {
                                campuses && campuses.map(campus => {
                                    return (
                                        <option value={campus.id} key={campus.id}>{campus.name}</option>
                                    );
                                })
                            }
                        </select>
                        <br />
                        <button className='btn btn-xs btn-primary'>Change Campus</button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ student, campuses }) => {
    return {
        student,
        campuses
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateStudent: (studentId, campusId) => {
            dispatch(updateStudent(studentId, campusId));
        },
        fetchStudent: (studentId) => {
            dispatch(fetchStudent(studentId))
        }
    }
}

const SingleStudentContainer = connect(mapStateToProps, mapDispatchToProps)(SingleStudent);
export default SingleStudentContainer;
