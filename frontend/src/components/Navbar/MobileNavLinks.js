import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import x_close from '../../assets/X-icon-white.png';
import user_icon from '../../assets/user-icon.png';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { HashLink } from 'react-router-hash-link';

function MobileNavLinks(props) {
  useEffect(() => {
    Aos.init();
  }, []);

  const submitLogout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    props.setIsLogged(false);
  };

  return (
    <div className="burger-menu" data-aos="slide-left" data-aos-duration="950">
      <div className="close">
        <img
          className="x-icon m-2"
          src={x_close}
          alt=""
          width="40px"
          height="40px"
          onClick={() => props.setLinks(false)}
        />
      </div>
      <img
        src={user_icon}
        className="navbar-link mb-2"
        alt=""
        width="80px"
        height="80px"
      />
      <Link
        to="/"
        className="navbar-link"
        onClick={() => props.setLinks(false)}
      >
        home
      </Link>
      <HashLink
        smooth
        to="/#about"
        className="navbar-link"
        onClick={() => props.setLinks(false)}
      >
        about
      </HashLink>
      <HashLink
        smooth
        to="/#contact-us"
        className="navbar-link"
        onClick={() => props.setLinks(false)}
      >
        contact us
      </HashLink>
      {!props.isLogged ? (
        <div className="right-section">
          <Link
            to="/"
            className="navbar-link py-3"
            onClick={() => {
              props.setSignUp(true);
              props.setLinks(false);
            }}
          >
            sign up
          </Link>
          <Link
            to="/"
            className="navbar-link navbar-join px-5"
            onClick={() => {
              props.setSignIn(true);
              props.setLinks(false);
            }}
          >
            join
          </Link>
        </div>
      ) : (
        <div className="right-section">
          <div>
            <Link
              to="/"
              className="navbar-link navbar-join"
              onClick={submitLogout}
            >
              Logout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default MobileNavLinks;
