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
      <button onClick={() => setShowComments(false)}>hide comments</button>
      <div>{commentsList}</div>
    </>
  ) : (
    <button onClick={() => setShowComments(true)}>showComments</button>
  );
  return <div>{toggle}</div>;
}

export default CommentsList;
