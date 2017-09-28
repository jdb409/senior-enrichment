import React, { Component } from 'react';
import { connect } from 'react-redux';
import { newStudent, err } from '../reducers/studentStore';


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
        this.props.error('');
        this.setState({name: ''})
        
    }

    render() {
        const { name } = this.state;
        const { handleChange, handleSubmit } = this;
        
        return (
            <div>

                {this.props.err && <h4 className='well'>{this.props.err}</h4>}
                <form onSubmit={handleSubmit} >
                    <input
                        type='text'
                        name='studentName'
                        className='form-control'
                        value={name}
                        onChange={handleChange}
                    />
                    <br />
                    <button className='btn btn-primary'>Submit</button>
                </form>
            </div>

        );
    }
}

const mapStateToProps = ({ student }) => {
    return {
        err: student.err
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        newStudent: (student) => {
            dispatch(newStudent(student));
        },
        error: (error) => {
            dispatch(err(error))
        }
    };
}

const StudentFormContainer = connect(mapStateToProps, mapDispatchToProps)(StudentForm);
export default StudentFormContainer;