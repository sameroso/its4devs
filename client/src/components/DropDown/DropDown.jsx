import React from 'react';
import './DropDown.scss';

function DropDown({ profilePic, profileName }) {
  console.log(profilePic);
  return (
    <div className="dropdown show">
      <a
        className="dropdown-header-link"
        href="#"
        role="button"
        id="dropdownMenuLink"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <div className="d-flex">
          <img src={profilePic} className="mt-auto header-img-size" />
          <p className="mt-auto dropdown-header-link font">{profileName}</p>
        </div>
      </a>

      <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
        <a className="dropdown-item font" href="#">
          sobre nos
        </a>
        <a className="dropdown-item font" href="#">
          editar perfil
        </a>
        <a className="dropdown-item font" href="#">
          deletar conta
        </a>
        <a className="dropdown-item font" href="#">
          sair
        </a>
      </div>
    </div>
  );
}

export default DropDown;
