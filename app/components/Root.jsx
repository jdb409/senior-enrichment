import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import store from '../store';
import { fetchStudents } from '../reducers/studentStore';
import { fetchCampuses } from '../reducers/campusStore';
import Home from './Home';
import NavBar from './Navbar';
import Students from './Students';
import Campuses from './Campuses';
import SingleStudent from './SingleStudent';
import SingleCampus from './SingleCampus';


export default class Root extends Component {

  componentDidMount() {
    store.dispatch(fetchStudents());
    store.dispatch(fetchCampuses());
  }

  render() {

    return (
      <Router>
        <div className='container'>
          <Route component={NavBar} />
          <Route exact path='/' component={Home} />
          <Route exact path='/students' component={Students} />
          <Route path='/students/:studentId' component={SingleStudent} />
          <Route exact path='/campuses' component={Campuses} />
          <Route path='/campuses/:campusId' component={SingleCampus} />
        </div>
      </Router>
    )
  }
}

// <Route exact path='/campuses/:campusId' component={Campuses} />