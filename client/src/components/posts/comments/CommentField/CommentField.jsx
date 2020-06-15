import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';

function CommentField({ commentMode, input, meta: { touched, error }, reset }) {
  const inputType = (
    <TextareaAutosize
      {...input}
      className="initial-form-text-area mx-auto"
      readOnly={commentMode}
    />
  );

  const renderError = () => {
    if (touched && error) {
      return (
        <small className="form-text" style={{ color: 'red' }}>
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
