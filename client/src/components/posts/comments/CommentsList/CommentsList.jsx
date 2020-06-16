import React, { useState } from 'react';
import Comment from '../Comment/Comment';

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
      <button onClick={() => setShowComments(false)}>
        <span className="font">mostrar comentarios</span>
      </button>
      <div>{commentsList}</div>
    </>
  ) : (
    <button onClick={() => setShowComments(true)}>
      <span className="font">esconder comentarios</span>
    </button>
  );
  return <div className="mb-2 bg-primary">{toggle}</div>;
}

export default CommentsList;
