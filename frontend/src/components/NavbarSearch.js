import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Login from './auth/Login';
import SignUp from './auth/SignUp';
import Navbar from './Navbar/Navbar';
import Search from './Search';
import jwt from 'jwt-decode';
import axios from 'axios';

function NavbarSearch() {
  const [openSignUp, setSignUp] = useState(false);
  const [openSignIn, setSignIn] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get(`/api/auth/verify-token?token=${token}`)
        .then((res) => {
          if (res.status === 200) {
            setIsLogged(true);
            const decoded = jwt(token);
            if (decoded.UserInfo.isAdmin === true) setIsAdmin(true);
            else setIsAdmin(false);
          }
        })
        .catch((err) => {
          if (err.response.status === 405) {
            localStorage.removeItem('token');
          }
        });
    }
  });

  return (
    <div>
      <Navbar
        setSignUp={setSignUp}
        setSignIn={setSignIn}
        isLogged={isLogged}
        setIsLogged={setIsLogged}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
      />
      <Search />

      {openSignUp && <SignUp setSignUp={setSignUp} setIsLogged={setIsLogged} />}
      {openSignIn && (
        <Login
          setSignIn={setSignIn}
          setIsLogged={setIsLogged}
          setIsAdmin={setIsAdmin}
        />
      )}
      <Outlet />
    </div>
  );
}

export default NavbarSearch;
