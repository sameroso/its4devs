import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';

import { fetchUserPostProfile } from '../../../actions';

function UserPostHeader({ post, fetchUserPostProfile, postHeader }) {
  console.log(postHeader);
  useEffect(() => {
    fetchUserPostProfile({ id: post.postedBy.userId });
  }, []);
  if (postHeader.length === 0) {
    return (
      <>
        <Loader type="ThreeDots" color="#9e9493" height={12} width={60} />
      </>
    );
  }
  return (
    <>
      <Link to={`profile/${post.postedBy.userId}`}>
        <img
          src={postHeader[0].profilePic}
          className="img-card-size my-auto ml-1 py-1 px-1"
        ></img>
        <span className="text-white ml-2 my-auto mx-auto">
          {postHeader[0].profileName}
        </span>
      </Link>
    </>
  );
}
const mapStateToProps = (state, ownProps) => {
  return {
    postHeader: state.postHeader.filter(
      (user) => user._id === ownProps.post.postedBy.userId
    ),
  };
};
export default connect(mapStateToProps, { fetchUserPostProfile })(
  UserPostHeader
);
