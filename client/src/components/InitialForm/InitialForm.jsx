import React from 'react';
import { Field, reduxForm } from 'redux-form';

import InitialFormField from '../InitialFormField/InitialFormField';
import InitialFormFieldTxtArea from '../InitialFormFieldTxtArea/InitialFormFieldTxtArea.jsx';
import './InitialForm.scss';

function InitialForm({ pic, handleSubmit }) {
  const saveUser = () => {
    console.log('oi');
  };

  return (
    <div className="container">
      <div className="card-header text-center text-white font">
        Coloque seus Dados
      </div>
      <div className="card card-secondary">
        <form onSubmit={handleSubmit(saveUser)} data-test="initial-form">
          <div className="row">
            <div className="col-12 col-sm-4 d-flex mx-auto my-auto">
              <img
                src={pic}
                className="form-pic mr-4 mb-3 mx-auto mt-1"
                alt=""
              />
            </div>
            <div className="col-12 col-sm-8 mx-auto">
              <Field
                name="userName"
                component={InitialFormField}
                label="nome"
              />
            </div>
          </div>
          <Field
            name="description"
            component={InitialFormFieldTxtArea}
            label="Bio"
          />
          <Field
            name="facebookLInk"
            component={InitialFormField}
            label="facebook"
          />
          <Field
            name="whatsApp"
            component={InitialFormField}
            label="whatsapp"
          />
          <Field name="gitHub" component={InitialFormField} label="giihub" />
          <div className="d-flex justify-content-end mr-5 mb-3">
            <button type="submit" className="initial-form-btn-save font">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default reduxForm({
  form: 'subscribe',
  enableReinitialize: true,
})(InitialForm);
