import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import InitialForm from '../InitialForm/InitialForm';
import PostCardList from '../posts/PostCardList/PostCardList';
import PostForm from '../posts/PostForm/PostForm';
import Header from '../Header/Header';
import { fetchPosts } from '../../actions/index';

function MainPage({ user, fetchPosts }) {
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
      <div className="mt-5 container">
        <PostForm postData={postData} />
        <PostCardList />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps, { fetchPosts })(MainPage);
