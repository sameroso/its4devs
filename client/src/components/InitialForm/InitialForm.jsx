import React from 'react';
import { Field, reduxForm } from 'redux-form';

import InitialFormField from '../InitialFormField/InitialFormField';
import './InitialForm.scss';

function InitialForm({ pic }) {
  return (
    <div className="container card card-secondary">
      <form>
        <div className="card-header text-center text-white font">
          Coloque seus Dados
        </div>
        <img src={pic} className="form-pic mr-4 mb-3" />
        <Field name="userName" component={InitialFormField} label="nome" />
        <Field name="description" component={InitialFormField} label="Bio" />
        <Field
          name="facebookLInk"
          component={InitialFormField}
          label="facebook"
        />
        <Field name="whatsApp" component={InitialFormField} label="whatsapp" />
        <Field name="gitHub" component={InitialFormField} label="giihub" />
      </form>
    </div>
  );
}

export default reduxForm({
  form: 'subscribe',
  enableReinitialize: true,
})(InitialForm);
