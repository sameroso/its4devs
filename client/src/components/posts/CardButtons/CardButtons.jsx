import React, { useState } from 'react';
import Modal from '../../Modal/Modal';
import Loader from 'react-loader-spinner';
import './CardButtons.scss';

import trashBtn from '../../../assets/trash95.png';
import editBtn from '../../../assets/edit95.png';
import cancelBtn from '../../../assets/cancel95.png';
import saveBtn from '../../../assets/save95.png';

function CardButtons({
  reset,
  onDelete,
  onEdit,
  onBtnChange,
  postedBy,
  userId,
  postId,
  setBtnMode,
  btnMode,
  deleting,
  editing,
}) {
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
      alt="botão de excluir postagem"
      className="img-commentbtns-top-size trash-btn"
    />
  );
  const modalAction = btnMode ? 'editar' : 'deletar';
  const action = btnMode ? onEdit : onDelete;

  const deleteMode = (
    <>
      <button
        className="my-1 mr-2 btn-style"
        type="button"
        data-toggle="modal"
        data-target={`#${postId}`}
        disabled={deleting}
      >
        {isDeleting}
      </button>
    </>
  );
  const editMode = (
    <>
      <button
        className="btn-style mr-2 my-1 cardbtns-cancelbtn"
        onClick={() => {
          setBtnMode(false);
          onBtnChange(true);
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
        disabled={editing}
        className="btn-style mr-2 cardbtns-savebtn"
        type="button"
        data-toggle="modal"
        data-target={`#${postId}`}
      >
        {btnChangeEdit}
      </button>
    </>
  );

  const isEditing = btnMode ? editMode : deleteMode;
  const renderBtns = userId === postedBy ? isEditing : null;
  const showbtnstyle = () => {
    if (btnMode || userId !== postedBy) {
      return 'CardButtons-display-btn';
    } else {
      return '';
    }
  };

  return (
    <div>
      <Modal
        postId={postId}
        actionName={modalAction}
        message={`Deseja mesmo ${modalAction} a postagem?`}
        action={action}
      />
      <label
        htmlFor={postId + userId}
        className={`commentbtns-label btn-style mr-2 ${showbtnstyle()}`}
        onClick={() => {
          setBtnMode(true);
          onBtnChange(false);
        }}
      >
        <img
          src={editBtn}
          alt="botão de editar postagem"
          className="img-commentbtns-top-size img-label-btn"
        />
      </label>
      {renderBtns}
    </div>
  );
}

export default CardButtons;
