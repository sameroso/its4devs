import React, { useState } from 'react';
import { reset } from 'redux-form';

function CardButtons({ reset, onDelete, onEdit, onBtnChange }) {
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
  return <div>{isEditing}</div>;
}

export default CardButtons;
