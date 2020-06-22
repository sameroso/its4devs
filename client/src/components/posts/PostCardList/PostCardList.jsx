import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import PostCard from '../PostCard/PostCard';
import './PostCardList.scss';

function PostCardList({ postsData }) {
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

export default connect(mapStateToProps)(PostCardList);
