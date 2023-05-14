import React from 'react';
import { Link } from 'react-router-dom';
import user_icon from '../../assets/user-icon.png';
import menu_icon from '../../assets/menu-icon.png';
import { HashLink } from 'react-router-hash-link';

function NavLinks(props) {
  const handleSignUp = () => {
    props.setSignUp(true);
  };
  const handleSignIn = () => {
    props.setSignIn(true);
  };
  const submitLogout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('token');

    props.setIsLogged(false);
  };

  return (
    <div>
      <ul className="navbar-ul">
        <Link to="/" hash="#about" className="navbar-link">
          Home
        </Link>
        <HashLink smooth to="/marketplace" className="navbar-link">
          Marketplace
        </HashLink>
        <HashLink smooth to="/#contact-us" className="navbar-link">
          Contact us
        </HashLink>
        {!props.isLogged ? (
          <div>
            <Link
              to="/"
              className="navbar-link py-3"
              onClick={handleSignUp}
              style={{ zIndex: '5' }}
            >
              Sign Up
            </Link>
            <Link
              to="/"
              className="navbar-link navbar-join"
              onClick={handleSignIn}
              style={{ zIndex: '5' }}
            >
              Join
            </Link>
          </div>
        ) : !props.isAdmin ? (
          <div className="right-section">
            <Link
              to="/"
              className="navbar-link navbar-join"
              onClick={submitLogout}
            >
              Logout
            </Link>
            <img
              src={user_icon}
              className="navbar-link mx-2"
              alt=""
              width="55px"
              height="55px"
              onClick={() => props.setProfile(true)}
            />
          </div>
        ) : (
          <div className="right-section">
            <Link
              to="/"
              className="navbar-link navbar-join"
              onClick={submitLogout}
            >
              Logout
            </Link>
            <Link to="/admin" className="navbar-link navbar-join">
              Admin Pannel
            </Link>
          </div>
        )}
      </ul>
      <img
        className="menu-icon"
        src={menu_icon}
        alt=""
        width="45px"
        height="45px"
        onClick={() => props.setLinks(true)}
      />
    </div>
  );
}

export default NavLinks;
