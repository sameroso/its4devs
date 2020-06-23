import React from 'react';
import './ProfileField.scss';
import TextareaAutosize from 'react-textarea-autosize';

function InitialFormField({
  isMyProfile,
  input,
  label,
  type,
  meta: { touched, error },
}) {
  const isReadOnly = isMyProfile ? 'ProfileField-readonly-input' : '';
  const inputType =
    type === 'input' ? (
      <input
        type={type}
        {...input}
        className={`initial-form-input ${isReadOnly}`}
        readOnly={isMyProfile}
      />
    ) : (
      <TextareaAutosize
        {...input}
        className={`initial-form-text-area mx-auto ${isReadOnly}`}
        readOnly={isMyProfile}
      />
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
