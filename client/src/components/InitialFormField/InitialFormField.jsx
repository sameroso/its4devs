import React from 'react';
import './InitialFormField.scss';
import TextareaAutosize from 'react-textarea-autosize';

function InitialFormField({ input, label, type, meta: { touched, error } }) {
  const inputType =
    type === 'input' ? (
      <input type={type} {...input} className="initial-form-input" />
    ) : (
      <TextareaAutosize {...input} className="initial-form-text-area mx-auto" />
    );

  const renderError = () => {
    if (touched && error) {
      return (
        <div className="row">
          <small className="form-text mx-auto" style={{ color: 'black' }}>
            {error}
          </small>
        </div>
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
