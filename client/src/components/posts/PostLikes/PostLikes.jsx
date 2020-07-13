import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';

import LikeList from '../LikeList/LikeList';
import { addLike } from '../../../actions';
import { toggleLike } from '../../../actions';
import { emptyUsers } from '../../../actions';
import gates from '../../../assets/billi.jpg';
import zuck from '../../../assets/zuck.jpg';
import jobs from '../../../assets/jobs.jpg';
import './PostLikes.scss';
import bindUnbindEvent from '../../../functions/bindUnbindEvent';

function PostLikes({ currentUserId, addLike, post, toggleLike, emptyUsers }) {
  const like1Ref = useRef(null);
  const like2Ref = useRef(null);
  const like3Ref = useRef(null);

  const wasAlreadyLikedByCurrentUser = post.likes.some(
    (like) => like.userId === currentUserId
  );
  const addingLike = wasAlreadyLikedByCurrentUser
    ? (likeType) =>
        toggleLike({ postId: post._id, userId: currentUserId, likeType })
    : (likeType) =>
        addLike({ postId: post._id, userId: currentUserId, likeType });

  const react1type = post.likes.filter((like) => {
    return like.likeType === 'lula';
  });
  const react2type = post.likes.filter((like) => {
    return like.likeType === 'dilma';
  });
  const react3type = post.likes.filter((like) => {
    return like.likeType === 'gates';
  });

  const [showLikeList1, setShowLikeList1] = useState(false);
  const likeList1 = showLikeList1 ? (
    <LikeList likes={react1type} className="_LikeList1" />
  ) : null;
  const [showLikeList2, setShowLikeList2] = useState(false);
  const likeList2 = showLikeList2 ? <LikeList likes={react2type} /> : null;
  const [showLikeList3, setShowLikeList3] = useState(false);
  const likeList3 = showLikeList3 ? <LikeList likes={react3type} /> : null;

  function handleClick1Outside(event) {
    if (like1Ref.current && !like1Ref.current.contains(event.target)) {
      setShowLikeList1(false);
      emptyUsers();
    }
    bindUnbindEvent(handleClick1Outside);
  }
  function handleClick2Outside(event) {
    if (like2Ref.current && !like2Ref.current.contains(event.target)) {
      setShowLikeList2(false);
      emptyUsers();
    }
    bindUnbindEvent(handleClick2Outside);
  }
  function handleClick3Outside(event) {
    if (like3Ref.current && !like3Ref.current.contains(event.target)) {
      setShowLikeList3(false);
      emptyUsers();
    }
    bindUnbindEvent(handleClick3Outside);
  }

  return (
    <div className="row">
      <div ref={like1Ref} onClick={(e) => handleClick1Outside(e)}>
        <div>
          <img
            onClick={() => {
              addingLike('lula');
            }}
            src={zuck}
            className="like-img-size mx-1"
          />
          <span className="_PostLikes_React_1_Value">{react1type.length}</span>
          {likeList1}
        </div>
        <div
          onClick={() => setShowLikeList1(true)}
          className="text-center PostLIkes-arrow _PostLikes_Arrow"
        >
          &darr;
        </div>
      </div>
      <div ref={like2Ref} onClick={(e) => handleClick2Outside(e)}>
        <div>
          <img
            onClick={() => addingLike('dilma')}
            src={jobs}
            className="like-img-size mx-1"
          />
          {react2type.length}
          {likeList2}
        </div>
        <div
          onClick={() => setShowLikeList2(true)}
          className="text-center PostLIkes-arrow"
        >
          &darr;
        </div>
      </div>
      <div ref={like3Ref} onClick={(e) => handleClick3Outside(e)}>
        <div>
          <img
            onClick={() => addingLike('gates')}
            src={gates}
            className="like-img-size mx-1"
          />
          {react3type.length}
          {likeList3}
        </div>
        <div
          onClick={() => setShowLikeList3(true)}
          className="text-center PostLIkes-arrow"
        >
          &darr;
        </div>
      </div>
    </div>
  );
}

export default connect(null, { addLike, toggleLike, emptyUsers })(PostLikes);
