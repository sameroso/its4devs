import React from 'react';

import './InitialFormFieldTxtArea.scss';

function InitialFormFieldTxtArea({ input, label }) {
  return (
    <div className="pb-3">
      <span className="font initial-form-label-text-area">{label}</span>
      <div className="row">
        <textarea {...input} className="initial-form-text-area mx-auto" />
      </div>
    </div>
  );
}

export default InitialFormFieldTxtArea;
