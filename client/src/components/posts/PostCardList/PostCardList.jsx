import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import PostCard from '../PostCard/PostCard';
import './PostCardList.scss';
import { useReducer } from 'react';

function PostCardList({ postsData }) {
  console.log(postsData);
  let renderPostCardList;
  if (postsData.length !== 0) {
    renderPostCardList = postsData.posts.map((post) => (
      <PostCard key={post._id} post={post} />
    ));
  } else {
    renderPostCardList = <div>nada</div>;
  }
  return <div>{renderPostCardList}</div>;
}

const mapStateToProps = (state) => {
  return { postsData: state.postsData };
};

export default connect(mapStateToProps)(PostCardList);
