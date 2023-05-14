import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './EmailVerif.css';
import error_icon from '../../assets/error-icon.png';
import checklist_icon from '../../assets/checklist-icon.png';

function EmailVerif() {
  const search = useLocation().search;
  const [verified, setVerified] = useState(false);
  const token = new URLSearchParams(search).get('token');
  useEffect(() => {
    axios
      .put(`/api/auth/verify-email?token=${token}`)
      .then((res) => {
        if (res.status === 200) setVerified(true);
        else console.log('Verif Failed!!');
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  return (
    <div className="email-verif">
      <div className="email-verif-box">
        {!verified ? (
          <>
            <img
              src={error_icon}
              alt=""
              width="70px"
              height="70px"
              style={{ opacity: '0.8' }}
            />
            <h4>Email Verification Failed!!</h4>
          </>
        ) : (
          <>
            <img src={checklist_icon} alt="" width="70px" height="70px" />
            <h4>Your Email has been Successfully Verified</h4>
          </>
        )}
        <Link to="/" className="btn">
          Continue
        </Link>
      </div>
    </div>
  );
}

export default EmailVerif;
