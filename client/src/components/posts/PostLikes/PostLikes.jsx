import React from 'react';
import { connect } from 'react-redux';

import { addLike } from '../../../actions';
import { removeLike } from '../../../actions';
import lula from '../../../assets/lula.jpeg';
import './PostLikes.scss';

function PostLikes({ myUserId, postId, addLike, post, removeLike }) {
  console.log(post.likes);

  const isAlreadyLiked = post.likes.some((like) => like.userId === myUserId);
  const addingLike = isAlreadyLiked
    ? () => removeLike({ postId, userId: myUserId })
    : () => addLike({ postId, userId: myUserId });

  return (
    <div onClick={addingLike}>
      <img src={lula} className="like-img-size" />
      {post.likes.length}
    </div>
  );
}

export default connect(null, { addLike, removeLike })(PostLikes);
