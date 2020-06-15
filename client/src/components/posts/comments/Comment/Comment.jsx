import React, { useState } from 'react';
import CommentField from '../CommentField/CommentField';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import { editComment } from '../../../../actions';
import { deleteComment } from '../../../../actions';
import CommentBtns from '../CommentBtns/CommentBtns';
import './Comment.scss';

function Comment({
  comment,
  handleSubmit,
  reset,
  myUserId,
  editComment,
  deleteComment,
  postId,
}) {
  const [commentMode, setCommentMode] = useState(true);
  const onDeleteComment = () => {
    deleteComment({ postId, commentId: comment.commentId });
  };
  const updateComment = (formValues) => {
    editComment({ ...formValues, commentId: comment.commentId, postId });
  };
  const showbtns =
    myUserId === comment.userId ? (
      <CommentBtns
        onUpdateComment={handleSubmit(updateComment)}
        onDeleteComment={(e) => {
          e.preventDefault();
          onDeleteComment();
        }}
        commentMode={setCommentMode}
        reset={reset}
      />
    ) : null;
  return (
    <form className="my-2">
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
})(connect(mapStateToProps, { editComment, deleteComment })(Comment));
