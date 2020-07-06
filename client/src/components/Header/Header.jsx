import React from 'react';

import DropDown from '../DropDown/DropDown';
import './Header.scss';

const Header = ({ currentUser }) => {
  return (
    <>
      <div className="container header-top header-background">
        <div className="row text-white ml-4 py-1 font-header-top">its4devs</div>
      </div>
      <div className="container header-background bg-card">
        <div className="row ml-1 py-1">
          <DropDown
            profileName={currentUser.profileName}
            userId={currentUser._id}
          />
        </div>
      </div>
    </>
  );
};

export default Header;
