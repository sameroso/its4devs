import React, { useState } from 'react';
import CommentField from '../CommentField/CommentField';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import { editComment } from '../../../../actions';
import { deleteComment } from '../../../../actions';
import CommentBtns from '../CommentBtns/CommentBtns';
import dateHelper from '../../../../helpers/dateHelper';
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
    <div className="mt-2">
      <div className="bg-commment-top">
        <img
          src={comment.profilePic}
          alt=""
          className="comment-img px-1 py-1"
        />
        <span className="text-white ml-1">{comment.profileName}</span>
      </div>
      <div className="bg-card-comment">
        <div className="row">
          <form className="mx-auto form-comment-size d-flex">
            <Field
              name="commentFormPosted"
              component={CommentField}
              commentMode={commentMode}
            />
            {showbtns}
          </form>
        </div>
        <div className="row justify-content-end py-1 margin-date-comment">
          <small className="">{dateHelper(comment.dateCreated)}</small>
        </div>
      </div>
    </div>
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
