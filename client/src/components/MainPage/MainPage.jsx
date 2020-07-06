import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import InitialForm from '../InitialForm/InitialForm';
import PostCardList from '../posts/PostCardList/PostCardList';
import PostForm from '../posts/PostForm/PostForm';
import Header from '../Header/Header';
import { fetchPosts } from '../../actions/index';
import { emptyUserPostProfile } from '../../actions/index';
import { clearPostState } from '../../actions/index';
import './MainPage.scss';

function MainPage({ user, fetchPosts, emptyUserPostProfile, clearPostState }) {
  useEffect(() => {
    emptyUserPostProfile();
    fetchPosts();
    return () => {
      clearPostState();
    };
  }, []);
  const userInfoForPost = {
    profileName: user.profileName,
    profilePic: user.profilePic,
  };
  if (!user.initialFormFilled) {
    return (
      <InitialForm
        profilePic={user.profilePic}
        initialValues={{
          profileName: user.profileName,
          facebookLink: user.facebookLink,
          gitHub: user.gitHub,
          description: user.description,
          whatsApp: user.whatsApp,
        }}
        className="_MainPage_InitialForm"
      />
    );
  }
  return (
    <div className="_MainPage_Header_And_Posts">
      <div className="fixed-top">
        <Header currentUser={user} />
      </div>
      <div className="margin-from-header container">
        <PostForm userInfoForPost={userInfoForPost} />
        <PostCardList />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps, {
  fetchPosts,
  emptyUserPostProfile,
  clearPostState,
})(MainPage);
