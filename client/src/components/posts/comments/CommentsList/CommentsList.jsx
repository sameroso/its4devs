import React, { useState } from 'react';
import Comment from '../Comment/Comment';

import './CommentsList.scss';

function CommentsList({ post }) {
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

  const toggle = showComments ? (
    <>
      <button className="ui-95" onClick={() => setShowComments(false)}>
        <span className="font">esconder comentarios</span>
      </button>
      <div>{commentsList}</div>
    </>
  ) : (
    <button className="ui-95" onClick={() => setShowComments(true)}>
      <span className="font">mostrar comentarios</span>
    </button>
  );
  return <div className="mb-2 bg-comment-list-bottom-top pb-2">{toggle}</div>;
}

export default CommentsList;
