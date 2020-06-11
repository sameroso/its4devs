import React from 'react';
import './InitialFormField.scss';

function InitialFormField({ input, label, type }) {
  const inputType =
    type === 'input' ? (
      <input type={type} {...input} className="initial-form-input" />
    ) : (
      <textarea {...input} className="initial-form-text-area mx-auto" />
    );

  return (
    <div className="pb-3">
      <span className="font initial-form-label-position">{label}</span>
      <div className="row">{inputType}</div>
    </div>
  );
}

export default InitialFormField;
