import React, { useState } from 'react';

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
      <button onClick={onDelete}>deletar</button>
      <button
        onClick={() => {
          setBtnMode(true);
          onBtnChange(false);
        }}
      >
        editar
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
