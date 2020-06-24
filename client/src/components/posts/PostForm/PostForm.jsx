import React, { useState } from 'react';
import { Field, reduxForm, submit } from 'redux-form';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner';

import { sendPost } from '../../../actions';
import InitialFormField from '../../InitialFormField/InitialFormField';

import './PostForm.scss';

function PostForm({
  handleSubmit,
  postData: { profileName, profilePic },
  sendPost,
  reset,
}) {
  const postData = {
    profileName,
    profilePic,
    databasePostId: '1',
  };
  const [posting, setPosting] = useState(false);
  const isPosting = posting ? (
    <Loader type="ThreeDots" color="#000000" height={12} width={40} />
  ) : (
    'postar'
  );

  const submitForm = async (formValues) => {
    try {
      setPosting(true);
      await sendPost({ ...postData, ...formValues });
      toast.success('Postado com sucesso', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setPosting(false);
      reset();
    } catch {
      toast.error('Erro! Tente mais tarde', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setPosting(false);
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
            <span className="postform-btn-text">{isPosting}</span>
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
