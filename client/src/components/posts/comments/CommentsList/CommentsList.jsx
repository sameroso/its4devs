import React, { useState } from 'react';
import Comment from '../Comment/Comment';

import './CommentsList.scss';

function CommentsList({ post, onSetPostForm, setShowComments, showComments }) {
  const commentsList = post.comments.map((comment) => (
    <Comment
      postId={post._id}
      comment={comment}
      key={comment._id}
      initialValues={{
        commentFormPosted: comment.body,
      }}
      form={comment._id}
    />
  ));
  const focus = () => {
    onSetPostForm(true);
  };
  const comment = (
    <label
      htmlFor={post._id}
      onClick={() => {
        focus();
      }}
      className="ml-2 comment-btn-comment-list d-flex m-0"
    >
      <span className="font comment-list-span-position">comentar</span>
    </label>
  );
  const toggle = showComments ? (
    <>
      <div className="bg-comment-list-bottom-top py-2 d-flex justify-content-around">
        <button
          className="ui-95 ml-2"
          onClick={() => {
            setShowComments(false);
            onSetPostForm(false);
          }}
        >
          <span className="font">esconder comentarios</span>
        </button>
        {comment}
      </div>
      <div>{commentsList}</div>
    </>
  ) : (
    <div className="bg-comment-list-bottom-top py-2 d-flex justify-content-around">
      <button
        className="ui-95 ml-2"
        onClick={() => {
          setShowComments(true);
          onSetPostForm(true);
        }}
      >
        <span className="font">mostrar comentarios</span>
      </button>
      {comment}
    </div>
  );
  return <div className="mb-2 pb-2">{toggle}</div>;
}

export default CommentsList;
