import React from 'react';
import logo_emna from '../assets/Tunisart_Hackathon.png';
import { Link } from 'react-router-dom';
import facebook_icon from '../assets/facebook-icon.png';
import instagram_icon from '../assets/instagram-icon.png';
import linkedin_icon from '../assets/linkedin-icon.png';
import { HashLink } from 'react-router-hash-link';

function Footer() {
  return (
    <div className="footer justify-content-center" id="contact-us">
      <div className="col-cus-4 footer-box">
        <img src={logo_emna} alt="" width="180rem" height="80rem" />
        <div className="social-media">
          <Link
            to="//www.facebook.com/profile.php?id=100088901411459"
            target="_blank"
          >
            <img src={facebook_icon} alt="" width="32px" height="32px" />
          </Link>
          <Link
            to="//www.linkedin.com/company/emna-recruitment/"
            target="_blank"
          >
            <img src={linkedin_icon} alt="" width="32px" height="32px" />
          </Link>
          <Link to="//www.instagram.com/emna.recruitment/" target="_blank">
            <img src={instagram_icon} alt="" width="32px" height="32px" />
          </Link>
        </div>
      </div>
      <div className="col-cus--2 footer-box">
        <div id="links">
          <h5 className="title">Links</h5>
          <p>
            <HashLink smooth to="/#" className="footer-links">
              Home
            </HashLink>
          </p>
          <p>
            <HashLink smooth to="/#about" className="footer-links">
              About
            </HashLink>
          </p>
          <p>
            <HashLink smooth to="/#offre" className="footer-links">
              Service
            </HashLink>
          </p>
        </div>
      </div>
      <div className="col-cus-4 footer-box">
        <div>
          <h5 className="title">Contact Us</h5>
          <p>+216 90 784 774 / +216 90 368 185</p>
          <p>exemple@gmail.com</p>
          <p>B 2-9 BELVIDER CENTER</p>
          <p>61 Rue KHORTOUM 1002</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
