import React, { useState } from 'react';
import './CardButtons.scss';
import trashBtn from '../../../assets/trash95.png';
import editBtn from '../../../assets/edit95.png';

function CardButtons({
  reset,
  onDelete,
  onEdit,
  onBtnChange,
  postedBy,
  userId,
}) {
  const [btnMode, setBtnMode] = useState(false);
  const deleteMode = (
    <>
      <button className="my-1 mr-1 btn-style" onClick={onDelete}>
        <img
          src={trashBtn}
          alt="botão de excluir postagem"
          className="btn-postcard-top-size"
        />
      </button>
      <button
        className="btn-style mr-2"
        onClick={() => {
          setBtnMode(true);
          onBtnChange(false);
        }}
      >
        <img
          src={editBtn}
          alt="botão de editar postagem"
          className="btn-postcard-top-size"
        />
      </button>
    </>
  );
  const editMode = (
    <>
      <button
        onClick={() => {
          setBtnMode(false);
          onBtnChange(true);
          reset();
        }}
      >
        cancelar
      </button>
      <button onClick={onEdit}>salvar</button>
    </>
  );

  const isEditing = btnMode ? editMode : deleteMode;
  const renderBtns = userId === postedBy ? isEditing : null;
  return <div>{renderBtns}</div>;
}

export default CardButtons;
