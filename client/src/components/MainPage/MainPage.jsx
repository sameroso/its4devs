import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import InitialForm from '../InitialForm/InitialForm';
import PostCardList from '../posts/PostCardList/PostCardList';
import PostForm from '../posts/PostForm/PostForm';
import Header from '../Header/Header';
import { fetchPosts } from '../../actions/index';
import './MainPage.scss';

function MainPage({ user, fetchPosts, postsData }) {
  useEffect(() => {
    fetchPosts();
  }, []);
  const userData = {
    profileName: user.profileName,
    facebookLink: user.facebookLink,
    gitHub: user.gitHub,
    description: user.description,
    whatsApp: user.whatsApp,
  };
  const postData = {
    profileName: user.profileName,
    profilePic: user.profilePic,
    sequenceId: postsData.sequenceId,
  };
  if (!user.initialFormFilled) {
    return (
      <InitialForm profilePic={user.profilePic} initialValues={userData} />
    );
  }
  return (
    <div>
      <div className="fixed-top">
        <Header data={{ ...userData, profilePic: user.profilePic }} />
      </div>
      <div className="margin-from-header container">
        <PostForm postData={postData} />
        <PostCardList />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { user: state.user, postsData: state.postsData };
};

export default connect(mapStateToProps, { fetchPosts })(MainPage);
