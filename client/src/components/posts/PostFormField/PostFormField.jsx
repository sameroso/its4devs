import React from 'react';
import './PostFormField.scss';
import TextareaAutosize from 'react-textarea-autosize';

function InitialFormField({ input, type, meta: { touched, error } }) {
  const inputType =
    type === 'input' ? (
      <input type={type} {...input} className="initial-form-input" />
    ) : (
      <TextareaAutosize
        {...input}
        className={`initial-form-text-area mx-auto _InitialFormFiel_textarea initialForm-scroll 
        PostForm_Textarea_Borders`}
      />
    );

  const renderError = () => {
    if (touched && error) {
      return (
        <div className="row _Initial_Form_Field_Render_Error">
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
      <div className="row">{inputType}</div>
      {renderError()}
    </div>
  );
}

export default InitialFormField;
