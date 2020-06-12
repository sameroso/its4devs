import React from 'react';

import DropDown from '../DropDown/DropDown';
import './Header.scss';

const Header = ({ data: { profilePic, profileName } }) => {
  return (
    <div className="header-background">
      <div className="container">
        <div className="row">
          <DropDown profilePic={profilePic} profileName={profileName} />
        </div>
      </div>
    </div>
  );
};

export default Header;
