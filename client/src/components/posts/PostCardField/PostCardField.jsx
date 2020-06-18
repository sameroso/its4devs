import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import './PostCardField.scss';

function PostCardField({ postCardFieldMode, input, meta: { touched, error } }) {
  const inputType = (
    <TextareaAutosize
      {...input}
      className="initial-form-text-area mx-auto"
      readOnly={postCardFieldMode}
    />
  );

  const renderError = () => {
    if (touched && error) {
      return (
        <div className="mx-auto ">
          <small className="form-text text-postcardField-Config">{error}</small>
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

export default PostCardField;
