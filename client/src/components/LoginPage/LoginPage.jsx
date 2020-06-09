import React from 'react';
import './LoginPage.scss';

import googleIcon from '../../assets/google-plus-icon.png';

const LoginPage = () => {
  return (
    <>
      <div className="background">
        <div className="container">
          <div className="row">
            <span className="font mx-auto login-title">its4Devs</span>
          </div>
          <div className="row">
            <a className="mx-auto mb-1" href="/auth/github">
              <button className="windows-btn">
                <span className="font">login with github</span>
              </button>
            </a>
          </div>
          <div className="row mb-1">
            <a className="mx-auto font" href="/auth/facebook">
              <button className="windows-btn">login with facebook</button>
            </a>
          </div>
          <div className="row">
            <a className="mx-auto font" href="/auth/google">
              <button className="windows-btn">login with google</button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
