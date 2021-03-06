import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchMyUser } from '../../actions';
import { BrowserRouter, Route } from 'react-router-dom';

import LandingPage from '../LandingPage/LandingPage';
import Profile from '../Profile/Profile';

import './App.scss';

function App({ fetchMyUser }) {
  useEffect(() => {
    fetchMyUser();
  }, []);
  return (
    <BrowserRouter>
      <Route exact path="/" component={LandingPage} />
      <Route path="/profile/:id" component={Profile} />
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { fetchMyUser })(App);
