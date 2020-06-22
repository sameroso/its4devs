import React from 'react';
import { Link } from 'react-router-dom';

function UserPostHeader({ comment }) {
  return (
    <>
      <Link to={`profile/${comment.userId}`}>
        <div>
          <img
            src={comment.profilePic}
            alt=""
            className="comment-img px-1 py-1"
          />
          <span className="text-white ml-1 comment-profile-name-font-size">
            {comment.profileName}
          </span>
        </div>
      </Link>
    </>
  );
}

export default UserPostHeader;
