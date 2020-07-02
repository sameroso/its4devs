import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import InitialFormField from '../InitialFormField/InitialFormField';
import { updateUser } from '../../actions/index';
import './InitialForm.scss';

function InitialForm({ profilePic, handleSubmit, updateUser }) {
  const onSubmit = (formValues) => {
    updateUser(formValues);
  };

  return (
    <div className="container">
      <div className="card-header text-center text-white font">
        Coloque seus Dados
      </div>
      <div className="card card-secondary">
        <form onSubmit={handleSubmit(onSubmit)} data-test="initial-form">
          <div className="row">
            <div className="col-12 col-sm-3 d-flex mx-auto my-auto">
              <img
                src={profilePic}
                className="form-pic mr-4 mb-3 mx-auto mt-1 _PofilePIcInitialFormField"
                alt=""
              />
            </div>
            <div className="col-12 col-sm-9 mx-auto">
              <Field
                name="profileName"
                component={InitialFormField}
                label="nome"
                type="input"
              />
            </div>
          </div>
          <Field
            name="description"
            component={InitialFormField}
            label="Bio"
            type="textarea"
          />
          <Field
            name="facebookLink"
            component={InitialFormField}
            label="facebook"
            type="input"
          />
          <Field
            name="whatsApp"
            component={InitialFormField}
            label="whatsapp"
            type="input"
          />
          <Field
            name="gitHub"
            component={InitialFormField}
            label="giihub"
            type="input"
          />
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

function validate(values) {
  const errors = {};
  if (!values.profileName) {
    errors.profileName = 'O nome é obrigatório';
  }

  return errors;
}

export default reduxForm({
  form: 'subscribe',
  enableReinitialize: true,
  validate,
})(connect(null, { updateUser })(InitialForm));
