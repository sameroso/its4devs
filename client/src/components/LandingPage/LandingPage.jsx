import React from 'react';
import { connect } from 'react-redux';

import LoginPage from '../LoginPage/LoginPage';
import MainPage from '../MainPage/MainPage';
import LoadingPage from '../LoadingPage/LoadingPage';

function LandinPage({ user }) {
  if (user === false) {
    return (
      <div data-test="login-page">
        <LoginPage />
      </div>
    );
  } else if (user === null) {
    return (
      <div data-test="loading-page">
        <LoadingPage />
      </div>
    );
  }
  return (
    <div data-test="main-page">
      <MainPage />
    </div>
  );
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps)(LandinPage);
