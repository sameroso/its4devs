import React from 'react';
import { connect } from 'react-redux';
import { deletePost } from '../../../actions';

import './PostCard.scss';

function PostCard({ post, deletePost }) {
  const deletecurrentPost = () => {
    deletePost({ postId: post.postId });
  };

  return (
    <div className="postcard-bg">
      <div className="row">
        <img src={post.postedBy.profilePic} className="img-card-size"></img>
        <p>{post.postedBy.profileName}</p>
        <p>{post.body}</p>
        <p>{post.dateCreated}</p>
      </div>
      <button onClick={deletecurrentPost}>deletar</button>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log(state);
  return state;
};

export default connect(mapStateToProps, { deletePost })(PostCard);
