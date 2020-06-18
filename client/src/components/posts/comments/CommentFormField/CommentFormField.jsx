import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import './CommentFormField.scss';

function CommentField({
  postId,
  commentMode,
  input,
  meta: { touched, error },
}) {
  const inputType = (
    <TextareaAutosize
      id={postId.toString()}
      {...input}
      className="initial-form-text-area margin-comment-form-field mb-2"
      readOnly={commentMode}
    />
  );

  const renderError = () => {
    if (touched && error) {
      return (
        <small className="form-text mx-auto" style={{ color: 'red' }}>
          {error}
        </small>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      {inputType}
      {renderError()}
    </>
  );
}

export default CommentField;
