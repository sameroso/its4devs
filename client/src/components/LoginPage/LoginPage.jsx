import React from 'react';
import './LoginPage.scss';

const LoginPage = () => {
  return (
    <>
      <div className="background">
        <div className="container">
          <div className="row">
            <span className="font mx-auto login-title">its4Devs</span>
          </div>
          <div className="row">
            <a className="mx-auto mb-3" href="/auth/github">
              <button className="windows-btn" data-test="github-btn">
                <span className="font">login com github</span>
              </button>
            </a>
          </div>
          <div className="row mb-3">
            <a className="mx-auto font" href="/auth/facebook">
              <button className="windows-btn" data-test="facebook-btn">
                login com facebook
              </button>
            </a>
          </div>
          <div className="row">
            <a className="mx-auto font" href="/auth/google">
              <button className="windows-btn" data-test="google-btn">
                login com google
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
