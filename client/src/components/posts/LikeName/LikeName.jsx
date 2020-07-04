import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';

import { fetchUser } from '../../../actions';
import { Link } from 'react-router-dom';
import './LikeName.scss';

function LikeName({ userId, fetchUser, user, users }) {
  useEffect(() => {
    fetchUser({ id: userId });
  }, []);
  if (users.length === 0 || !user) {
    return (
      <div className="_LikeName_Loader">
        <Loader type="ThreeDots" color="#9e9493" height={12} width={60} />
      </div>
    );
  } else {
    return (
      <Link to={`/profile/${userId}`}>
        <div className="LikeName-style _LikeName_User">{user.profileName}</div>
      </Link>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    users: state.users,
    user: state.users.find((user) => user._id === ownProps.userId),
  };
};
export default connect(mapStateToProps, { fetchUser })(LikeName);
