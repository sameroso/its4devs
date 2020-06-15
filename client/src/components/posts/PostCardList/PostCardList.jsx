import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import PostCard from '../PostCard/PostCard';
import './PostCardList.scss';

function PostCardList({ postsData }) {
  let renderPostCardList;
  if (postsData.length !== 0) {
    renderPostCardList = postsData.posts.reverse().map((post) => (
      <PostCard
        key={post._id}
        post={post}
        form={post._id}
        initialValues={{
          postCardBody: post.body,
        }}
      />
    ));
  } else {
    renderPostCardList = <div>nada</div>;
  }
  return <div className="my-3 bg-primary">{renderPostCardList}</div>;
}

const mapStateToProps = (state) => {
  console.log(state);
  return { postsData: state.postsData };
};

export default connect(mapStateToProps)(PostCardList);
