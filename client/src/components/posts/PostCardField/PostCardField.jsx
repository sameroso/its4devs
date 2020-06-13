import React from 'react';

function InitialFormField({
  postCardFieldMode,
  input,
  label,
  meta: { touched, error },
}) {
  console.log(postCardFieldMode);
  const inputType = (
    <textarea
      {...input}
      className="initial-form-text-area mx-auto"
      readOnly={postCardFieldMode}
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
    <div className="pb-3">
      <span className="font initial-form-label-position">{label}</span>
      <div className="row">{inputType}</div>
      {renderError()}
    </div>
  );
}

export default InitialFormField;
