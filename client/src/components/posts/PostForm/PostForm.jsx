import React, { useState } from 'react';
import { Field, reduxForm, submit } from 'redux-form';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';

import { sendPost } from '../../../actions';
import InitialFormField from '../../InitialFormField/InitialFormField';
import successMessage from '../../../functions/successMessage';
import errorMessage from '../../../functions/errorMessage';

import './PostForm.scss';

function PostForm({
  handleSubmit,
  userInfoForPost: { profileName, profilePic },
  sendPost,
  reset,
}) {
  const additionalPostInfo = {
    profileName,
    profilePic,
    databasePostId: '1',
  };
  const [isPosting, setIsPosting] = useState(false);
  const isLoaderShowing = isPosting ? (
    <Loader type="ThreeDots" color="#000000" height={12} width={40} />
  ) : (
    'postar'
  );

  const submitForm = async (formValues) => {
    try {
      setIsPosting(true);
      await sendPost({ ...additionalPostInfo, ...formValues });
      successMessage('Postado com sucesso');
      setIsPosting(false);
      reset();
    } catch {
      errorMessage('Erro! Tente mais tarde');
      setIsPosting(false);
    }
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
            <span className="postform-btn-text">{isLoaderShowing}</span>
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
