import React from 'react';

function InitialFormField({ input, label }) {
  return (
    <>
      <span className="font">{label}</span>
      <div>
        <input {...input} className="font" />
      </div>
    </>
  );
}

export default InitialFormField;
