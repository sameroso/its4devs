import React, { useState } from 'react';
import CommentField from '../CommentField/CommentField';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import { editComment } from '../../../../actions';
import CommentBtns from '../CommentBtns/CommentBtns';
import './Comment.scss';

function Comment({
  comment,
  handleSubmit,
  reset,
  myUserId,
  editComment,
  postId,
}) {
  const [commentMode, setCommentMode] = useState(true);
  const deleteComment = () => {
    console.log('deletar...');
  };
  const updateComment = (formValues) => {
    editComment({ ...formValues, commentId: comment.commentId, postId });
  };
  const showbtns =
    myUserId === comment.userId ? (
      <CommentBtns
        onUpdateComment={handleSubmit(updateComment)}
        onDeleteComment={deleteComment}
        commentMode={commentMode}
        onReadMode={setCommentMode}
        reset={reset}
      />
    ) : null;
  return (
    <form onSubmit={handleSubmit(updateComment)} className="my-2">
      <img src={comment.profilePic} alt="" className="comment-img" />
      <Field
        name="commentFormPosted"
        component={CommentField}
        commentMode={commentMode}
      />
      {showbtns}
    </form>
  );
}

function validate(values) {
  const errors = {};
  if (!values.commentFormPosted) {
    errors.commentFormPosted = 'NÃO PODE COMENTARIO VAZIO VAZIO';
  }

  return errors;
}

const mapStateToProps = (state) => {
  return { myUserId: state.user._id };
};

export default reduxForm({
  enableReinitialize: true,
  validate,
})(connect(mapStateToProps, { editComment })(Comment));
