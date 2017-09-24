import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import Students from './Students';
import Campuses from './Campuses';
import store, { fetchStudents, fetchCampuses } from '../store';

export default class Root extends Component {

  componentDidMount() {
    store.dispatch(fetchStudents());
    store.dispatch(fetchCampuses());
  }

  render() {

    return (
      <Router>
        <div>
          <Route exact path='/' component={Home} />
          <Route exact path='/students' component={Students} />
          <Route exact path='/campuses' component={Campuses} />
        </div>
      </Router>
    )
  }
}