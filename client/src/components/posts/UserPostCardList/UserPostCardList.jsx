import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import PostCard from '../PostCard/PostCard';
import Loader from 'react-loader-spinner';

import { fetchPosts } from '../../../actions';
import { emptyUserPostProfile } from '../../../actions';
import { clearPostState } from '../../../actions';
import './UserPostCardList.scss';

function PostCardList({
  postsDatabase,
  userProfile,
  fetchPosts,
  emptyUserPostProfile,
  clearPostState,
}) {
  useEffect(() => {
    emptyUserPostProfile();
    fetchPosts();
    return () => {
      clearPostState();
    };
  }, []);
  const postsToRenderFirstOnScreen = 4;
  const [numberOfPostsOnScreen, setNumberOfPostsOnScreen] = useState(
    postsToRenderFirstOnScreen
  );

  const renderBtnShowMore = () => {
    const userPosts = postsDatabase.posts.filter(
      (post) => post.postedBy.userId === userProfile._id
    );

    const isShowMoreBtnShowing =
      numberOfPostsOnScreen >= userPosts.length ? null : (
        <div className="row mt-3">
          <button
            className="PostCardList-show-more-btn"
            onClick={() => setNumberOfPostsOnScreen(numberOfPostsOnScreen + 4)}
          >
            mostrar mais
          </button>
        </div>
      );
    return isShowMoreBtnShowing;
  };

  const renderPostCardList = () => {
    const userPosts = postsDatabase.posts.filter(
      (post) => post.postedBy.userId === userProfile._id
    );

    const postsList = userPosts
      .slice(0)
      .reverse()
      .map((post, index) => {
        if (index > numberOfPostsOnScreen) {
          return null;
        }
        return (
          <div key={post._id} className="my-2 _UserPostCardList_PostCard">
            <PostCard
              post={post}
              form={post._id}
              initialValues={{
                postCardBody: post.body,
              }}
            />
          </div>
        );
      });

    return postsList;
  };

  const renderLoaderOrPosts = () => {
    if (postsDatabase.length !== 0) {
      return (
        <>
          {renderPostCardList()}
          {renderBtnShowMore()}
        </>
      );
    } else {
      return (
        <div className="row _UserPostCardList_Loader">
          <div className="mx-auto">
            <Loader type="ThreeDots" color="#454040" height={80} width={80} />
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <div className="my-3">{renderLoaderOrPosts()}</div>
    </>
  );
}

const mapStateToProps = (state) => {
  return { postsDatabase: state.postsData };
};

export default connect(mapStateToProps, {
  fetchPosts,
  emptyUserPostProfile,
  clearPostState,
})(PostCardList);
