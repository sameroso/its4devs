import React, { useState, useRef, useEffect } from 'react';
import CommentField from '../CommentField/CommentField';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import { editComment } from '../../../../actions';
import { deleteComment } from '../../../../actions';
import CommentBtns from '../CommentBtns/CommentBtns';
import UserCommentHeader from '../UserCommentHeader/UserCommentHeader';
import dateHelper from '../../../../helpers/dateHelper';
import { toast } from 'react-toastify';
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
  const refCommentCard = useRef(null);
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [commentbtnMode, setCommentbtnMode] = useState(false);
  const [commentMode, setCommentMode] = useState(true);

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

  const onDeleteComment = async () => {
    try {
      setDeleting(true);
      await deleteComment({ postId, commentId: comment._id });
      toast.success('comentário deletado!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch {
      toast.error('Erro! Tente mais tarde', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setDeleting(false);
    }
  };
  const updateComment = async (formValues) => {
    try {
      setEditing(true);
      await editComment({ ...formValues, commentId: comment._id, postId });
      setCommentbtnMode(false);
      setCommentMode(true);
      setEditing(false);
      toast.success('comentário editado!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      reset();
    } catch {
      toast.error('Erro! Tente mais tarde', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setEditing(false);
    }
  };
  const showbtns =
    myUserId === comment.userId ? (
      <CommentBtns
        className="_CommentBtns"
        deleting={deleting}
        editing={editing}
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
      className="mt-2 comment-commentcard-width align-center _Comment"
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
