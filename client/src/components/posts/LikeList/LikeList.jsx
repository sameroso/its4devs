import React from 'react';
import LikeName from '../LikeName/LikeName';
import './LikeList.scss';

function LikeList({ likes }) {
  console.log(likes);
  const likeList = likes.map((like) => (
    <LikeName key={like._id} userId={like.userId} />
  ));
  return <div className="like-list-style">{likeList}</div>;
}

export default LikeList;
