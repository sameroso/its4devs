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
  postsData,
  reset,
  cbChildRef,
}) {
  useEffect(() => {
    cbChildRef(ReactDOM.findDOMNode(inputEl));
  }, []);

  let inputEl = useRef(null);

  const commentSubmit = (formValues) => {
    createComment({
      ...formValues,
      postId,
      ...user,
      commentId: postsData.sequenceId + 1,
    });
    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(commentSubmit)}>
        <div className="row">
          <Field
            ref={(input) => {
              inputEl = input;
            }}
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
    </div>
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
