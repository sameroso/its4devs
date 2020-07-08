import React, { useState } from 'react';
import { connect } from 'react-redux';

import PostCard from '../PostCard/PostCard';
import Loader from 'react-loader-spinner';
import './PostCardList.scss';

function PostCardList({ postsDatabase }) {
  const [indexValue, setIndexValue] = useState(4);

  const renderPostCardList = () => {
    if (postsDatabase.length !== 0) {
      const postqnt =
        indexValue >= postsDatabase.posts.length - 1 ? null : (
          <div className="row mt-3">
            <button
              className="PostCardList-show-more-btn"
              onClick={() => setIndexValue(indexValue + 4)}
            >
              mostrar mais
            </button>
          </div>
        );
      const postsList = postsDatabase.posts
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
                  postCardYoutubeLink: post.youtubeLink,
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
      return (
        <div className="row">
          <div className="mx-auto">
            <Loader type="ThreeDots" color="#454040" height={80} width={80} />
          </div>
        </div>
      );
    }
  };
  return (
    <>
      <div className="my-3">{renderPostCardList()}</div>
    </>
  );
}

const mapStateToProps = (state) => {
  return { postsDatabase: state.postsData };
};

export default connect(mapStateToProps)(PostCardList);
