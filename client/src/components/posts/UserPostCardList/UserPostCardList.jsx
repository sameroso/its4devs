import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import PostCard from '../PostCard/PostCard';

import { fetchPosts } from '../../../actions';
import { emptyUserPostProfile } from '../../../actions';
import { clearPostState } from '../../../actions';
import './UserPostCardList.scss';

function PostCardList({
  postsData,
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
  const [indexValue, setIndexValue] = useState(4);
  const renderPostCardList = () => {
    if (postsData.length !== 0) {
      const postqnt =
        indexValue >= postsData.posts.length ? null : (
          <button onClick={() => setIndexValue(indexValue + 4)}>
            show more
          </button>
        );
      const postsList = postsData.posts
        .filter((post) => post.postedBy.userId === userProfile._id)
        .slice(0)
        .reverse()
        .map((post, index) => {
          if (index > indexValue) {
            return null;
          }
          return (
            <div key={post._id} className="my-2">
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
      return (
        <>
          {postsList}
          {postqnt}
        </>
      );
    } else {
      return <div>nada</div>;
    }
  };
  return (
    <>
      <div className="my-3">{renderPostCardList()}</div>
    </>
  );
}

const mapStateToProps = (state) => {
  return { postsData: state.postsData };
};

export default connect(mapStateToProps, {
  fetchPosts,
  emptyUserPostProfile,
  clearPostState,
})(PostCardList);
