import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUserProfile, updateUser } from '../../actions';
import { Field, reduxForm } from 'redux-form';
import InitialFormField from '../InitialFormField/InitialFormField';
import { Link } from 'react-router-dom';

function Profile({
  match: { params },
  fetchUserProfile,
  userProfile,
  updateUser,
  handleSubmit,
  myUser,
}) {
  useEffect(() => {
    fetchUserProfile(params);
  }, []);

  const onSubmit = (formValues) => {
    updateUser(formValues);
  };

  if (userProfile.length === 0 || myUser === null) {
    return <div>Profile</div>;
  } else {
    const showbtn =
      myUser._id === userProfile._id ? (
        <>
          <Link to="/">
            <button type="text" className="initial-form-btn-save font">
              voltar
            </button>
          </Link>
          <button type="submit" className="initial-form-btn-save font">
            salvar
          </button>
        </>
      ) : (
        <Link to="/">
          <button type="text" className="initial-form-btn-save font">
            voltar
          </button>
        </Link>
      );
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
                  src={userProfile.profilePic}
                  className="form-pic mr-4 mb-3 mx-auto mt-1"
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
              {showbtn}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.profileName) {
    errors.profileName = 'O nome é obrigatório';
  }

  return errors;
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    userProfile: state.userProfile,
    myUser: state.user,
    initialValues: {
      profileName: state.userProfile.profileName,
      description: state.userProfile.description,
      facebookLink: state.userProfile.facebookLink,
      whatsApp: state.userProfile.whatsApp,
      gitHub: state.userProfile.gitHub,
    },
  };
};

export default connect(mapStateToProps, { fetchUserProfile, updateUser })(
  reduxForm({
    form: 'Profile',
    enableReinitialize: true,
    validate,
  })(Profile)
);
