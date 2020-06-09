import React from 'react';
import { connect } from 'react-redux';
import { fetchMyUser } from '../../actions';
import { BrowserRouter, Route } from 'react-router-dom';

import LandingPage from '../LandingPage/LandinPage';

function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={LandingPage} />
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { fetchMyUser })(App);
