import React from 'react';
import Loader from 'react-loader-spinner';
import './LoadingPage.scss';

function LoadingPage(props) {
  return (
    <div className="container">
      <div className="row">
        <div className="font LoadingPage-font-size text-white mx-auto my-auto">
          Carregando
        </div>
      </div>
      <div className="row mt-5">
        <div className="mx-auto">
          <Loader type="ThreeDots" color="#000000" height={30} width={90} />
        </div>
      </div>
    </div>
  );
}

export default LoadingPage;
