import React, { useState } from 'react';
import Loader from 'react-loader-spinner';

import Modal from '../../../Modal/Modal';
import trashBtn from '../../../../assets/trash95.png';
import editBtn from '../../../../assets/edit95.png';
import cancelBtn from '../../../../assets/cancel95.png';
import saveBtn from '../../../../assets/save95.png';
import './CommentBtns.scss';

function CommentBtns({
  commentId,
  commentMode,
  reset,
  onUpdateComment,
  onDeleteComment,
  commentbtnMode,
  setCommentbtnMode,
  deleting,
  editing,
}) {
  const modalAction = commentbtnMode ? 'editar' : 'deletar';
  const action = commentbtnMode ? onUpdateComment : onDeleteComment;
  const commentbtnClass = commentbtnMode ? 'display-btn' : '';
  const btnChangeEdit = editing ? (
    <Loader type="ThreeDots" color="#000000" height={12} width={40} />
  ) : (
    <img
      src={saveBtn}
      alt="botão de salvar postagem"
      className="img-commentbtns-top-size"
    />
  );
  const isDeleting = deleting ? (
    <Loader type="ThreeDots" color="#000000" height={12} width={40} />
  ) : (
    <img
      src={trashBtn}
      alt="botão de excluir comentario"
      className="img-commentbtns-top-size"
    />
  );
  const commentBtn = commentbtnMode ? (
    <>
      <button
        className="btn-commentbtns-style mr-2 my-1 _CommentBtns_cancelBtn"
        onClick={(e) => {
          e.preventDefault();
          setCommentbtnMode(false);
          commentMode(true);
          reset();
        }}
      >
        <img
          src={cancelBtn}
          alt="botão de cancelar"
          className="img-commentbtns-top-size"
        />
      </button>
      <button
        type="button"
        data-toggle="modal"
        data-target={`#${commentId}`}
        alt="botão de salvar comentário"
        className="btn-commentbtns-style mr-2 my-1 _CommentBtns_saveBtn"
        disabled={editing}
      >
        {btnChangeEdit}
      </button>
    </>
  ) : (
    <>
      <button
        className="my-1 mr-1 btn-commentbtns-style"
        type="button"
        data-toggle="modal"
        data-target={`#${commentId}`}
        disabled={deleting}
      >
        {isDeleting}
      </button>
    </>
  );
  return (
    <div>
      <Modal
        postId={commentId}
        actionName={modalAction}
        message={`Deseja mesmo ${modalAction} a postagem?`}
        action={action}
      />
      <label
        htmlFor={commentId + '321'}
        className={`btn-commentbtns-style mr-2 commentbtns-label _CommentLabel ${commentbtnClass}`}
        onClick={(e) => {
          setCommentbtnMode(true);
          commentMode(false);
        }}
      >
        <img
          src={editBtn}
          alt="botão de editar postagem"
          className="img-commentbtns-top-size img-label-btn"
        />
      </label>
      {commentBtn}
    </div>
  );
}

export default CommentBtns;
