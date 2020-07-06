import React, { useState } from 'react';
import Comment from '../Comment/Comment';

import './CommentsList.scss';

function CommentsList({
  post,
  setShowCommentForm,
  setShowComments,
  showComments,
}) {
  const [commentCounter, setCommentCounter] = useState(
    post.comments.length - 3
  );

  const renderShowMoreBtn =
    commentCounter <= 0 ? null : (
      <div className="row">
        <button
          className="CommentList-show-more-btn"
          onClick={() => setCommentCounter(commentCounter - 3)}
        >
          mostrar mais
        </button>
      </div>
    );
  const commentsList = post.comments.map((comment, index) => {
    if (index < commentCounter) {
      return null;
    }
    return (
      <Comment
        className="_Comment_Component"
        postId={post._id}
        comment={comment}
        key={comment._id}
        initialValues={{
          commentFormPosted: comment.body,
        }}
        form={comment._id}
      />
    );
  });

  const commentBtn = (
    <label
      htmlFor={post._id + '123'}
      onClick={() => {
        setShowCommentForm(true);
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
            setShowCommentForm(false);
          }}
        >
          <span className="font">esconder comentarios</span>
        </button>
        {commentBtn}
      </div>
      {renderShowMoreBtn}
      <div>{commentsList}</div>
    </>
  ) : (
    <div className="bg-comment-list-bottom-top py-2 d-flex justify-content-around">
      <button
        className="ui-95 ml-2"
        onClick={() => {
          setShowComments(true);
          setShowCommentForm(true);
        }}
      >
        <span className="font _ShowComments_btn">mostrar comentarios</span>
      </button>
      {commentBtn}
    </div>
  );
  return <div className="mb-2 pb-2">{toggle}</div>;
}

export default CommentsList;
