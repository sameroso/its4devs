import React, { useEffect, useState } from 'react';
import { fetchUser } from '../../../actions';

import { connect } from 'react-redux';

function LikeName({ userId, fetchUser, user, users }) {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchUser({ id: userId });
  }, []);
  if (users.length === 0 || !user) {
    return <div>loading</div>;
  } else {
    return <div>{user.profileName}</div>;
  }
}
const mapStateToProps = (state, ownProps) => {
  console.log(state);
  console.log(ownProps);
  return {
    users: state.users,
    user: state.users.find((user) => user._id === ownProps.userId),
  };
};
export default connect(mapStateToProps, { fetchUser })(LikeName);
