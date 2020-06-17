import React, { useState } from 'react';
import Comment from '../Comment/Comment';

import './CommentsList.scss';

function CommentsList({ post, onSetPostForm, cbRef }) {
  const [showComments, setShowComments] = useState(false);

  const commentsList = post.comments.map((comment) => (
    <Comment
      postId={post.postId}
      comment={comment}
      key={comment.commentId}
      initialValues={{
        commentFormPosted: comment.body,
      }}
      form={comment.commentId.toString()}
    />
  ));
  const focus = () => {
    onSetPostForm(true);
    if (cbRef === null) {
      return;
    } else {
      cbRef.focus();
    }
  };
  const comment = (
    <button
      onClick={() => {
        focus();
      }}
      className="ui-95 ml-2"
    >
      <span className="font">comentar</span>
    </button>
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
