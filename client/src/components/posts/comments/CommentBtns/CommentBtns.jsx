import React, { useState } from 'react';

function CommentBtns({ commentMode, reset, onUpdateComment, onDeleteComment }) {
  const [commentbtnMode, setCommentbtnMode] = useState(false);
  const commentBtn = commentbtnMode ? (
    <>
      <button onClick={onUpdateComment}>editar</button>
      <button
        onClick={(e) => {
          e.preventDefault();
          setCommentbtnMode(false);
          commentMode(true);
          reset();
        }}
      >
        cancelar
      </button>
    </>
  ) : (
    <>
      <button type="text" onClick={onDeleteComment}>
        deletar comentario
      </button>

      <button
        onClick={(e) => {
          e.preventDefault();
          setCommentbtnMode(true);
          commentMode(false);
        }}
      >
        editar comentario
      </button>
    </>
  );
  return <div>{commentBtn}</div>;
}

export default CommentBtns;
