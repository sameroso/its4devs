import React from 'react';
import './InitialFormField.scss';

function InitialFormField({ input, label }) {
  return (
    <div className="pb-3">
      <span className="font initial-form-label-position">{label}</span>
      <div className="row">
        <input {...input} className="initial-form-input" />
      </div>
    </div>
  );
}

export default InitialFormField;
