import React, { useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import notePad from '../../../assets/notepad.png';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';

import { sendPost } from '../../../actions';
import PostFormField from '../PostFormField/PostFormField';
import PostFormDropDown from '../PostFormDropDown/PostFormDropDown';
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
  const [youtubeInput, setYoutubeInput] = useState(false);
  const isLoaderShowing = isPosting ? (
    <Loader type="ThreeDots" color="#FFFFFF" height={12} width={40} />
  ) : (
    'Untitled - Notepad'
  );
  const renderYoutubeInput = youtubeInput ? (
    <Field name="youtubeInput" component="input"></Field>
  ) : null;
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
    <div className="PostForm-container">
      <div className="postForm-header d-flex">
        <img src={notePad} className="PostForm-Notepad" />
        <span className="PostForm-posthead-text ml-3">{isLoaderShowing}</span>
      </div>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="d-flex">
          <PostFormDropDown setYoutubeInput={setYoutubeInput} />
          {renderYoutubeInput}
        </div>
        <Field
          name="postForm"
          placeholder="Compartilhe o que Você está Pensando"
          component={PostFormField}
          type="textarea"
        />
      </form>
    </div>
  );
}

function validate(values) {
  const errors = {};
  if (!values.postForm && !values.youtubeInput) {
    errors.postForm = 'É preciso escrever alguma coisa pra postar';
  }

  return errors;
}

export default reduxForm({
  form: 'postForm',
  enableReinitialize: true,
  validate,
})(connect(null, { sendPost })(PostForm));
