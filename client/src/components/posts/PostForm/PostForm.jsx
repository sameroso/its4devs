import React from 'react';
import { Field, reduxForm, submit } from 'redux-form';
import { connect } from 'react-redux';
import { sendPost } from '../../../actions';
import InitialFormField from '../../InitialFormField/InitialFormField';

function PostForm({
  handleSubmit,
  postData: { profileName, profilePic },
  sendPost,
  reset,
}) {
  const postData = {
    profileName,
    profilePic,
    id: '1',
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
        <button type="submit">lansa a braba caraio</button>
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
