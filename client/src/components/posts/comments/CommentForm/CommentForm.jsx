import React from 'react';
import CommentField from '../CommentField/CommentField';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { createComment } from '../../../../actions';

function CommentForm({
  handleSubmit,
  createComment,
  postId,
  user,
  postsData,
  reset,
}) {
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
        <Field
          name="commentForm"
          placeholder="Gira a postagem gira comentario"
          component={CommentField}
        />
        <button type="submit">comentar</button>
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
  console.log(state.user);
  return { user: state.user, postsData: state.postsData };
};

export default reduxForm({
  enableReinitialize: true,
  validate,
})(connect(mapStateToProps, { createComment })(CommentForm));
