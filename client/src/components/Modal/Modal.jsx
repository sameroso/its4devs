import React from 'react';
import './Modal.scss';

function Modal({ postId, actionName, message, action }) {
  return (
    <>
      <div
        className="modal fade"
        id={postId}
        tabIndex="-1"
        role="dialog"
        aria-labelledby={postId}
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-card-style">
            <div className="header-Modal">
              <h5 className="font text-modal-header-style" id={postId}>
                {actionName}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="font text-center">
                <h5>{message}</h5>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn-modal-95"
                data-dismiss="modal"
              >
                cancelar
              </button>
              <button
                type="button"
                className="btn-modal-95"
                data-dismiss="modal"
                onClick={action}
              >
                {actionName}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
