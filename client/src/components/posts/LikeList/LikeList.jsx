import React, { useEffect } from 'react';
import LikeName from '../LikeName/LikeName';
import './LikeList.scss';

function LikeList({ likes }) {
  const likeList = likes.map((like) => (
    <LikeName key={like.userId} userId={like.userId} />
  ));
  return <>{likeList}</>;
}

export default LikeList;
