import React from 'react';
import { Field, reduxForm, submit } from 'redux-form';
import { connect } from 'react-redux';
import { sendPost } from '../../../actions';
import InitialFormField from '../../InitialFormField/InitialFormField';

import './PostForm.scss';

function PostForm({
  handleSubmit,
  postData: { profileName, profilePic, sequenceId },
  sendPost,
  reset,
}) {
  const sequence = sequenceId ? sequenceId + 1 : 1;

  const postData = {
    profileName,
    profilePic,
    databasePostId: '1',
    sequenceId: sequence,
  };
  const submitForm = async (formValues) => {
    await sendPost({ ...postData, ...formValues });
    reset();
  };
  return (
    <div>
      <form onSubmit={handleSubmit(submitForm)}>
        <Field
          name="postForm"
          placeholder="Compartilhe o que Você está Pensando"
          component={InitialFormField}
          type="textarea"
        />
        <div className="row justify-content-end">
          <button type="submit" className="mr-5 font postform-btn">
            <span className="postform-btn-text">Postar</span>
          </button>
        </div>
      </form>
    </div>
  );
}

function validate(values) {
  const errors = {};
  if (!values.postForm) {
    errors.postForm = 'É preciso escrever alguma coisa pra postar';
  }

  return errors;
}

export default reduxForm({
  form: 'postForm',
  enableReinitialize: true,
  validate,
})(connect(null, { sendPost })(PostForm));
