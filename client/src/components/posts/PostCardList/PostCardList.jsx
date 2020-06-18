import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import PostCard from '../PostCard/PostCard';
import './PostCardList.scss';

function PostCardList({ postsData }) {
  let renderPostCardList;
  if (postsData.length !== 0) {
    renderPostCardList = postsData.posts.reverse().map((post) => (
      <div key={post._id} className="my-2">
        <PostCard
          post={post}
          form={post._id}
          initialValues={{
            postCardBody: post.body,
          }}
        />
      </div>
    ));
  } else {
    renderPostCardList = <div>nada</div>;
  }
  return <div className="my-3">{renderPostCardList}</div>;
}

const mapStateToProps = (state) => {
  return { postsData: state.postsData };
};

export default connect(mapStateToProps)(PostCardList);
