import React from 'react';
import './LoginPage.scss';

const LoginPage = () => {
  return (
    <>
      <div className="background">
        <div className="container LoginPage-container-position">
          <div className="row">
            <div className="mx-auto">
              <span className="login-title">its</span>
              <span className="login-title LoginPage-Number-Style">4</span>
              <span className="login-title">Devs</span>
            </div>
          </div>
          <div className="LoginPage-Card mx-auto">
            <div className="LoginPage-bg-card-header mt-5">
              <span className="LoginPage-font-card-header">
                como deseja fazer login?
              </span>
            </div>
            <div className="LoginPage-login-card-body">
              <div className="row mt-3">
                <a className="mx-auto LoginPage-Link-Size" href="/auth/github">
                  <button className="windows-btn" data-test="github-btn">
                    <span className="font">login com github</span>
                  </button>
                </a>
              </div>
              <div className="row mt-3 mb-3">
                <a
                  className="mx-auto font LoginPage-Link-Size"
                  href="/auth/facebook"
                >
                  <button className="windows-btn" data-test="facebook-btn">
                    login com facebook
                  </button>
                </a>
              </div>
              <div className="row mb-3">
                <a
                  className="mx-auto font LoginPage-Link-Size"
                  href="/auth/google"
                >
                  <button className="windows-btn" data-test="google-btn">
                    login com google
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
