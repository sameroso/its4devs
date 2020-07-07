import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import './CommentField.scss';

function CommentField({
  commentId,
  commentMode,
  input,
  meta: { touched, error },
}) {
  const inputStyle = commentMode
    ? 'readonly-commentField-input-style'
    : 'edit-commentField-input-style';
  const inputType = (
    <div className={`row`}>
      <TextareaAutosize
        id={commentId + '321'}
        {...input}
        className={`CommentField-font initial-form-text-area mx-auto  _CommentField_textarea ${inputStyle}`}
        readOnly={commentMode}
      />
    </div>
  );

  const renderError = () => {
    if (touched && error) {
      return (
        <div className="mx-auto">
          <small
            className="form-text mx-auto text-center"
            style={{ color: 'red' }}
          >
            {error}
          </small>
        </div>
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
