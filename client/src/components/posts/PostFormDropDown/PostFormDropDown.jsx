import React from 'react';

function PostFormDropDown({ setYoutubeInput }) {
  return (
    <>
      <div className="d-flex">
        <span
          className="PostForm-file-font dropdown-toggle py-1"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span className="PostForm-file-first-letter">f</span>
          <span>ile</span>
        </span>
        <div className="dropdown-menu PostForm-DropDown-config">
          <a className="dropdown-item d-flex m-0 p-0" href="#">
            <button type="submit" className="mx-auto font postform-btn py-2">
              <span className="postform-btn-text py-2">postar</span>
            </button>
          </a>
          <a className="dropdown-item d-flex m-0 p-0" href="#">
            <div
              className="mx-auto font postform-btn py-2"
              onClick={() => setYoutubeInput(true)}
            >
              <span className="postform-btn-text">
                Adicionar video do youtube
              </span>
            </div>
          </a>
        </div>
      </div>
    </>
  );
}

export default PostFormDropDown;
