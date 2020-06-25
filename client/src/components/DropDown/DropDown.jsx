import React from 'react';
import { Link } from 'react-router-dom';
import './DropDown.scss';
import configIcon from '../../assets/artage-io-48142_1592294716.png';

function DropDown({ profileName, userId }) {
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
          <img src={configIcon} className="mt-auto header-img-size" />
          <p className="my-auto dropdown-header-link font-size">
            {profileName}
          </p>
        </div>
      </a>

      <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
        <a className="dropdown-item font" href="#">
          sobre nos
        </a>
        <Link className="dropdown-item font" to={`/profile/${userId}`}>
          editar perfil
        </Link>
        <a className="dropdown-item font" href="#">
          deletar conta
        </a>
        <a className="dropdown-item font" href="/auth/logout">
          sair
        </a>
      </div>
    </div>
  );
}

export default DropDown;
