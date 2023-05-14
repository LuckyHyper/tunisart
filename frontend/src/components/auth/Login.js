import React, { useState } from 'react';
import x_icon from '../../assets/X-icon.png';
import axios from 'axios';
import Swal from 'sweetalert2';
import jwt from 'jwt-decode';

function Login(props) {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const handleClose = () => {
    props.setSignIn(false);
  };
  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`/api/auth/login`, login)
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem('token', res.data.accessToken);
          localStorage.setItem('email', res.data.email);
          const isAdmin = jwt(res.data.accessToken).UserInfo.isAdmin;
          if (isAdmin === true) {
            props.setIsAdmin(true);
          } else props.setIsAdmin(false);
          Swal.fire({
            icon: 'success',
            title: 'Login Successfully',
          });
          props.setSignIn(false);
          props.setIsLogged(true);
        }
        if (res.status === 203) {
          Swal.fire({
            icon: 'info',
            title: res.data.message,
            text: res.data.text,
          });
        }
      })
      .catch((err) => {
        if (err.response.status === 404)
          Swal.fire({
            icon: 'error',
            title: 'Invalid Credentials',
          });
        if (err.response.status === 403)
          Swal.fire({
            icon: 'error',
            title: 'Invalid Password',
          });
      });
  };

  return (
    <div className="login">
      <div className="login-box">
        <div className="close">
          <img
            src={x_icon}
            alt="x"
            width="30px"
            height="30px"
            className="x-icon"
            onClick={handleClose}
          />
        </div>
        <h2 className="mb-3">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={login.email}
            onChange={handleChange}
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={login.password}
            onChange={handleChange}
          />
          <div id="signInGoogle" className="google-box"></div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-login mt-3">
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
