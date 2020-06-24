import React, { useState } from 'react';

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
}) {
  const modalAction = commentbtnMode ? 'editar' : 'deletar';
  const action = commentbtnMode ? onUpdateComment : onDeleteComment;
  const commentbtnClass = commentbtnMode ? 'display-btn' : '';
  const commentBtn = commentbtnMode ? (
    <>
      <button
        className="btn-commentbtns-style mr-2 my-1"
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
        className="btn-commentbtns-style mr-2 my-1"
      >
        <img
          src={saveBtn}
          alt="botão de salvar postagem"
          className="img-commentbtns-top-size"
        />
      </button>
    </>
  ) : (
    <>
      <button
        className="my-1 mr-1 btn-commentbtns-style"
        type="button"
        data-toggle="modal"
        data-target={`#${commentId}`}
      >
        <img
          src={trashBtn}
          alt="botão de excluir comentario"
          className="img-commentbtns-top-size"
        />
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
        htmlFor={commentId}
        className={`btn-commentbtns-style mr-2 commentbtns-label ${commentbtnClass}`}
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
