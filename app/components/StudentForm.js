import React, { Component } from 'react';
import { connect } from 'react-redux';
import { newStudent } from '../reducers/studentStore';


class StudentForm extends Component {
    constructor() {
        super()
        this.state = {
            name: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(ev) {
        this.setState({ name: ev.target.value });
    }

    handleSubmit(ev) {
        ev.preventDefault();
        this.props.newStudent(this.state);
    }

    render() {
        const { name } = this.state;
        const { handleChange, handleSubmit } = this;
        return (
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='studentName'
                    className='form-control'
                    value={name}
                    onChange={handleChange}
                />
                <br/>
                <button className='btn btn-primary'>Submit</button>
            </form>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        newStudent: (student) => {
            dispatch(newStudent(student));
        }
    };
}

const StudentFormContainer = connect(null, mapDispatchToProps)(StudentForm);
export default StudentFormContainer;