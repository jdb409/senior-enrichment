import React, { Component } from 'react';
import { connect } from 'react-redux';
import { newCampus } from '../reducers/campusStore';

class CampusForm extends Component {
    constructor() {
        super()
        this.state = {
            name: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(ev) {
        console.log(this.props);
        this.setState({ name: ev.target.value });
    }

    handleSubmit(ev) {
        ev.preventDefault();
        this.props.newCampus(this.state);
    }

    render() {
        const { name } = this.state;
        const { handleChange, handleSubmit } = this;
        return (
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='campusName'
                    className='form-control'
                    value={name}
                    onChange={handleChange}
                />
                <button className='btn btn-primary'>Submit</button>
            </form>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        newCampus: (campus) => {
            dispatch(newCampus(campus));
        }
    };
}

const CampusFormContainer = connect(null, mapDispatchToProps)(CampusForm);
export default CampusFormContainer;