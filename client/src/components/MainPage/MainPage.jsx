import React from 'react';
import { connect } from 'react-redux';

import InitialForm from '../InitialForm/InitialForm';
import Header from '../Header/Header';

function MainPage({ user }) {
  const userData = {
    profileName: user.profileName,
    facebookLink: user.facebookLink,
    gitHub: user.gitHub,
    description: user.description,
    whatsApp: user.whatsApp,
  };
  if (!user.initialFormFilled) {
    return (
      <InitialForm profilePic={user.profilePic} initialValues={userData} />
    );
  }
  return (
    <>
      <Header data={{ ...userData, profilePic: user.profilePic }} />
    </>
  );
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps)(MainPage);
