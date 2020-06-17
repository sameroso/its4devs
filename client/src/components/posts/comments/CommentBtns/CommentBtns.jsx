import React, { useState } from 'react';

import trashBtn from '../../../../assets/trash95.png';
import editBtn from '../../../../assets/edit95.png';
import cancelBtn from '../../../../assets/cancel95.png';
import saveBtn from '../../../../assets/save95.png';
import './CommentBtns.scss';

function CommentBtns({ commentMode, reset, onUpdateComment, onDeleteComment }) {
  const [commentbtnMode, setCommentbtnMode] = useState(false);
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
        onClick={onUpdateComment}
        className="btn-commentbtns-style mr-2 my-1"
      >
        <img
          src={saveBtn}
          alt="botão de salver postagem"
          className="img-commentbtns-top-size"
        />
      </button>
    </>
  ) : (
    <>
      <button
        className="my-1 mr-1 btn-commentbtns-style"
        type="text"
        onClick={onDeleteComment}
      >
        <img
          src={trashBtn}
          alt="botão de excluir comentario"
          className="img-commentbtns-top-size"
        />
      </button>

      <button
        className="btn-commentbtns-style mr-2"
        onClick={(e) => {
          e.preventDefault();
          setCommentbtnMode(true);
          commentMode(false);
        }}
      >
        <img
          src={editBtn}
          alt="botão de editar postagem"
          className="img-commentbtns-top-size"
        />
      </button>
    </>
  );
  return <div>{commentBtn}</div>;
}

export default CommentBtns;
