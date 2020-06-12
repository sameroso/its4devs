import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import './PostCardList.scss';

function PostCardList({ postsData }) {
  let renderPostCardList;
  if (postsData.length !== 0) {
    renderPostCardList = postsData.posts.map((post) => (
      <div className="container" key={post._id}>
        <div className="bg-primary">
          <img src={post.postedBy.profilePic} className="img-card-size"></img>
          <p>{post.postedBy.profileName}</p>
          <p>{post.body}</p>
          <p>{post.dateCreated}</p>
        </div>
      </div>
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
