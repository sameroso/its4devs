import React from 'react';
import { connect } from 'react-redux';

import InitialForm from '../InitialForm/InitialForm';

function MainPage({ user }) {
  if (!user.InitialFormFilled) {
    const userData = {
      userName: user.profileName,
      facebookLink: user.facebookLink,
      gitHub: user.gitHub,
      description: user.description,
      whatsApp: user.whatsApp,
    };
    return <InitialForm pic={user.profilePic} initialValues={userData} />;
  }
  return (
    <div>
      <div className="container">
        <div className="row">
          <img src={user.profilePic} />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps)(MainPage);
