import React from 'react';

import DropDown from '../DropDown/DropDown';
import './Header.scss';

const Header = ({ data: { profileName, userId } }) => {
  return (
    <>
      <div className="container header-top header-background">
        <div className="row text-white ml-4 py-1 font-header-top">its4devs</div>
      </div>
      <div className="container header-background bg-card">
        <div className="row ml-1 py-1">
          <DropDown profileName={profileName} userId={userId} />
        </div>
      </div>
    </>
  );
};

export default Header;
