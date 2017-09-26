import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { updateCampus, fetchCampus } from '../store';

class SingleCampus extends Component {
    constructor() {
        super();
        this.state = { studentId: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const campusId = this.props.match.params.campusId * 1;
        this.props.fetchCampus(campusId)
    }

    handleChange(ev) {
        console.log(ev.target.value);
        this.setState({ studentId: ev.target.value });
    }

    handleSubmit(ev) {
        ev.preventDefault();
        this.props.updateCampus(this.props.campus.id, this.state)
    }

    render() {
        const { campus, students } = this.props;
        const { handleChange, handleSubmit } = this;
        
        return (
            <div>
                <p><Link to='/'>Home</Link></p>
                <h1>{campus.name}</h1>
                <div className='row'>
                    <div className='col-sm-6'>
                        <h2>The following students attend {campus.name}</h2>
                        <ul>
                            {
                                campus.students && campus.students.map(student => {
                                    return (
                                        <li key={student.id}><Link to={`/students/${student.id}`}>{student.name}</Link></li>
                                    );
                                })
                            }
                        </ul>
                    </div>

                    <div className='col-sm-6'>
                        <h1>Add new Student</h1>
                        <form onSubmit={handleSubmit}>
                            <select value={this.state.studentId} onChange={handleChange}>
                                {
                                    students && students.map(student => {
                                        return (
                                            <option value={student.id} key={student.id}>{student.name}</option>
                                        );
                                    })
                                }
                            </select>
                            <br />
                            <button className='btn btn-xs btn-primary'>Add Student</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ campus, students }, ownProps) => {
    const campusId = ownProps.match.params.campusId * 1;
    return {
        campus: campus,
        students
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateCampus: (campusId, student) => {
            dispatch(updateCampus(campusId, student));
        },
        fetchCampus: (campusId) => {
            dispatch(fetchCampus(campusId))
        }
    }
}

const SingleCampusContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleCampus));
export default SingleCampusContainer;