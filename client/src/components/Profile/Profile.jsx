import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { toast } from 'react-toastify';

import { fetchUserProfile, updateUser } from '../../actions';
import ProfileField from '../ProfileField/ProfileField';
import UserPostCardList from '../posts/UserPostCardList/UserPostCardList';

function Profile({
  match: { params },
  fetchUserProfile,
  userProfile,
  updateUser,
  handleSubmit,
  myUser,
  reset,
}) {
  const [saving, setSaving] = useState(false);
  const isSaving = saving ? (
    <Loader type="ThreeDots" color="#000000" height={12} width={40} />
  ) : (
    'salvar'
  );
  useEffect(() => {
    fetchUserProfile(params);
  }, []);

  const onSubmit = async (formValues) => {
    try {
      setSaving(true);
      await updateUser(formValues);
      setSaving(false);
      toast.success('perfil atualizado!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch {
      setSaving(false);
      toast.error('Erro! Tente mais tarde', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  if (userProfile.length === 0 || myUser === null) {
    return (
      <div className="row">
        <div className="mx-auto my-auto">
          <Loader type="ThreeDots" color="#454040" height={80} width={80} />
        </div>
      </div>
    );
  } else {
    const isMyProfile = myUser._id === userProfile._id ? false : true;
    const showbtn =
      myUser._id === userProfile._id ? (
        <>
          <Link to="/">
            <button type="text" className="initial-form-btn-save font mx-5">
              voltar
            </button>
          </Link>
          <button
            disabled={saving}
            type="submit"
            className="initial-form-btn-save font"
          >
            {isSaving}
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
      <>
        <div className="container">
          <div className="card-header text-center text-white font">
            Boas Vindas
          </div>
          <div className="card card-secondary">
            <form onSubmit={handleSubmit(onSubmit)} data-test="profile-form">
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
                    isMyProfile={isMyProfile}
                    name="profileName"
                    component={ProfileField}
                    label="nome"
                    type="input"
                  />
                </div>
              </div>
              <Field
                isMyProfile={isMyProfile}
                name="description"
                component={ProfileField}
                label="Bio"
                type="textarea"
              />
              <Field
                isMyProfile={isMyProfile}
                name="facebookLink"
                component={ProfileField}
                label="facebook"
                type="input"
              />
              <Field
                isMyProfile={isMyProfile}
                name="whatsApp"
                component={ProfileField}
                label="whatsapp"
                type="input"
              />
              <Field
                isMyProfile={isMyProfile}
                name="gitHub"
                component={ProfileField}
                label="giihub"
                type="input"
              />
              <div className="d-flex justify-content-end mr-5 mb-3">
                {showbtn}
              </div>
            </form>
          </div>
        </div>
        <div>
          <div className="container">
            <div>
              <div className="row">
                <span className="text-center font mx-auto mt-3 text-white">
                  Postagens
                </span>
              </div>
              <UserPostCardList userProfile={userProfile} />
            </div>
          </div>
        </div>
      </>
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
