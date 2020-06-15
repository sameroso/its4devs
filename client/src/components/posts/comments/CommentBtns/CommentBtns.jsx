import React from 'react';

function CommentBtns({ onReadMode, commentMode, reset }) {
  const commentBtn = commentMode ? (
    <>
      <button>deletar comentario</button>
      <button
        onClick={() => {
          onReadMode(false);
        }}
      >
        editar comentario
      </button>
    </>
  ) : (
    <>
      <button>editar</button>
      <button
        onClick={() => {
          onReadMode(true);
          reset();
        }}
      >
        cancelar
      </button>
    </>
  );
  return <div>{commentBtn}</div>;
}

export default CommentBtns;
