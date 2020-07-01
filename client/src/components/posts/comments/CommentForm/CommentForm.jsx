import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import CommentFormField from '../CommentFormField/CommentFormField';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { createComment } from '../../../../actions';

import './CommentForm.scss';

function CommentForm({
  handleSubmit,
  createComment,
  postId,
  user,
  reset,
  setShowComments,
}) {
  const commentSubmit = (formValues) => {
    createComment({
      ...formValues,
      postId,
      ...user,
    });
    setShowComments(true);
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(commentSubmit)} className="_CommentForm">
        <div className="row">
          <Field
            postId={postId}
            name="commentForm"
            component={CommentFormField}
          />
        </div>
        <div className="d-flex justify-content-end">
          <button className="comment-form-btn font mr-4" type="submit">
            comentar
          </button>
        </div>
      </form>
    </>
  );
}
function validate(values) {
  const errors = {};
  if (!values.commentForm) {
    errors.commentForm = 'NÃO PODE COMENTARIO VAZIO VAZIO';
  }

  return errors;
}
const mapStateToProps = (state) => {
  return { user: state.user, postsData: state.postsData };
};

export default reduxForm({
  enableReinitialize: true,
  validate,
})(connect(mapStateToProps, { createComment })(CommentForm));
