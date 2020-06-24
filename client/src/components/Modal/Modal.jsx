import React from 'react';

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
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title font" id={postId}>
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
            <div className="modal-body">{message}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                cancelar
              </button>
              <button
                type="button"
                className="btn btn-primary"
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
