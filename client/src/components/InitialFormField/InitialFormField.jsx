import React from 'react';
import './InitialFormField.scss';

function InitialFormField({ input, label, type, meta: { touched, error } }) {
  const inputType =
    type === 'input' ? (
      <input type={type} {...input} className="initial-form-input" />
    ) : (
      <textarea {...input} className="initial-form-text-area mx-auto" />
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
