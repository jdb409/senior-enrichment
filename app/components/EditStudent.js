import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateStudent, updateBio } from '../reducers/studentStore';
import loremIpsum from 'lorem-ipsum';

class EditStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            campusId: '',
            bio: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(ev) {
        switch (ev.target.name) {
            case 'campusId':
                this.setState({ campusId: ev.target.value })
                break;
            case 'email':
                this.setState({ email: ev.target.value })
                break;
            case 'bio':
                this.setState({ bio: ev.target.value })
                break;
        }

    }

    handleSubmit(ev) {
        ev.preventDefault();
        this.props.updateStudent(this.props.student.id, this.state);
        this.setState({
            email: '',
            bio: ''
        })
    }


    render() {
        const { handleChange, handleSubmit } = this;
        const { campuses } = this.props;
        
        return (
            <div>
                <h1>Edit</h1>
                <form onSubmit={handleSubmit}>
                    <h4>E-mail</h4>
                    <input name='email' type='text' onChange={handleChange} value={this.state.email} />
                    <h4>Biography</h4>
                    <textarea name='bio' type='textarea' onChange={handleChange} value={this.state.bio} />
                    <h1>Change Campus</h1>
                    <select name='campusId' value={this.state.campustId} onChange={handleChange}>
                        <option>Pick a campus!</option>
                        {
                            //List all campuses
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
        );
    }
}

const mapStateToProps = ({ student, campus }) => {
    return {
        student: student.student,
        campuses: campus.campuses
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateStudent: (studentId, campusId) => {
            dispatch(updateStudent(studentId, campusId));
        },
        updateBio: (student) => {
            student.bio = this.state.bio;
            dispatch(updateBio(student));
        }
    }
}
const EditStudentContainer = connect(mapStateToProps, mapDispatchToProps)(EditStudent)
export default EditStudentContainer;