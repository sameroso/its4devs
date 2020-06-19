import React, { useState } from 'react';
import { connect } from 'react-redux';

import LikeList from '../LikeList/LikeList';
import { addLike } from '../../../actions';
import { toggleLike } from '../../../actions';
import { emptyUsers } from '../../../actions';
import lula from '../../../assets/lula.jpeg';
import dilma from '../../../assets/dilma.jpg';
import gates from '../../../assets/billi.jpg';
import './PostLikes.scss';

function PostLikes({
  myUserId,
  postId,
  addLike,
  post,
  toggleLike,
  emptyUsers,
}) {
  const isAlreadyLiked = post.likes.some((like) => like.userId === myUserId);
  const addingLike = isAlreadyLiked
    ? (likeType) => toggleLike({ postId, userId: myUserId, likeType })
    : (likeType) => addLike({ postId, userId: myUserId, likeType });

  const react1type = post.likes.filter((like) => {
    return like.likeType === 'lula';
  });
  const react2type = post.likes.filter((like) => {
    return like.likeType === 'dilma';
  });
  const react3type = post.likes.filter((like) => {
    return like.likeType === 'gates';
  });
  console.log(react1type);

  const [showLikeList1, setShowLikeList1] = useState(false);
  const likeList1 = showLikeList1 ? <LikeList likes={react1type} /> : null;
  const [showLikeList2, setShowLikeList2] = useState(false);
  const likeList2 = showLikeList2 ? <LikeList likes={react2type} /> : null;
  const [showLikeList3, setShowLikeList3] = useState(false);
  const likeList3 = showLikeList3 ? <LikeList likes={react3type} /> : null;

  return (
    <div className="row">
      <div className="dropdown show">
        <div
          className="dropdown-toggle"
          onClick={() => addingLike('lula')}
          onMouseEnter={() => setShowLikeList1(true)}
          onMouseOut={() => {
            setShowLikeList1(false);
            emptyUsers();
          }}
        >
          <img src={lula} className="like-img-size mx-1" />
          {react1type.length}
          {likeList1}
        </div>
      </div>
      <div
        onClick={() => addingLike('dilma')}
        onMouseEnter={() => setShowLikeList2(true)}
        onMouseLeave={() => {
          setShowLikeList2(false);
          emptyUsers();
        }}
      >
        <img src={dilma} className="like-img-size mx-1" />
        {react2type.length}
        {likeList2}
      </div>
      <div
        onClick={() => addingLike('gates')}
        onMouseEnter={() => setShowLikeList3(true)}
        onMouseLeave={() => {
          setShowLikeList3(false);
          emptyUsers();
        }}
      >
        <img src={gates} className="like-img-size mx-1" />
        {react3type.length}
        {likeList3}
      </div>
    </div>
  );
}

export default connect(null, { addLike, toggleLike, emptyUsers })(PostLikes);
