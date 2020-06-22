import React, { useState, useRef, useEffect } from 'react';
import CommentField from '../CommentField/CommentField';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import { editComment } from '../../../../actions';
import { deleteComment } from '../../../../actions';
import CommentBtns from '../CommentBtns/CommentBtns';
import UserCommentHeader from '../UserCommentHeader/UserCommentHeader';
import dateHelper from '../../../../helpers/dateHelper';
import './Comment.scss';
import { Link } from 'react-router-dom';

function Comment({
  comment,
  handleSubmit,
  reset,
  myUserId,
  editComment,
  deleteComment,
  postId,
}) {
  const refCommentCard = useRef(null);
  /**
   * Alert if clicked on outside of element
   */
  function handleClickOutside(event) {
    if (
      refCommentCard.current &&
      !refCommentCard.current.contains(event.target)
    ) {
      setCommentbtnMode(false);
      setCommentMode(true);
      reset();
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }

  const [commentbtnMode, setCommentbtnMode] = useState(false);
  const [commentMode, setCommentMode] = useState(true);

  const onDeleteComment = () => {
    deleteComment({ postId, commentId: comment._id });
  };
  const updateComment = (formValues) => {
    editComment({ ...formValues, commentId: comment._id, postId });
  };
  const showbtns =
    myUserId === comment.userId ? (
      <CommentBtns
        commentbtnMode={commentbtnMode}
        setCommentbtnMode={setCommentbtnMode}
        commentId={comment._id}
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
    <div
      onClick={(e) => handleClickOutside(e)}
      className="mt-2 comment-commentcard-width align-center"
      ref={refCommentCard}
    >
      <div className="bg-commment-top d-flex justify-content-between">
        <UserCommentHeader comment={comment} />
        <div>{showbtns}</div>
      </div>
      <div className="bg-card-comment">
        <div className="row">
          <form className="mx-auto form-comment-size">
            <Field
              commentId={comment._id}
              name="commentFormPosted"
              component={CommentField}
              commentMode={commentMode}
            />
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
    errors.commentFormPosted = 'Escreva alguma coisa para comentar!';
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
