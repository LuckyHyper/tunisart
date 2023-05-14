import React, { useState } from 'react';
import logo_emna from '../../assets/Tunisart_Hackathon.png';
import MobileNavLinks from './MobileNavLinks';
import NavLinks from './NavLinks';
import UserProfile from './UserProfile';

function Navbar(props) {
  const [links, setLinks] = useState(false);
  const [profile, setProfile] = useState(false);

  return (
    <div className="navbar">
      <img
        src={logo_emna}
        alt="logo"
        className="emna-logo"
        width="180rem"
        height="80rem"
      />
      <div className="navbar-right">
        <NavLinks
          isAdmin={props.isAdmin}
          setIsLogged={props.setIsLogged}
          setSignUp={props.setSignUp}
          setSignIn={props.setSignIn}
          isLogged={props.isLogged}
          setLinks={setLinks}
          setProfile={setProfile}
        />
        {profile && <UserProfile setProfile={setProfile} />}
        {links && (
          <MobileNavLinks
            setLinks={setLinks}
            setIsLogged={props.setIsLogged}
            setSignUp={props.setSignUp}
            setSignIn={props.setSignIn}
            isLogged={props.isLogged}
          />
        )}
      </div>
    </div>
  );
}

export default Navbar;
