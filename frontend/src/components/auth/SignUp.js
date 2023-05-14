import React, { useState } from 'react';
import axios from 'axios';
import x_icon from '../../assets/X-icon.png';
import FileUpload from '../FileUpload';
import Swal from 'sweetalert2';

function SignUp(props) {
  const handleClose = () => {
    props.setSignUp(false);
  };
  const [viewed, setViewed] = useState(0);
  const [condition, setCondition] = useState(false);
  const [signUp, setSignUp] = useState({
    name: '',
    email: '',
    civility: 'Single',
    password: '',
    confirm_password: '',
    birthday: '',
    phone: '',
    governorate: '',
    profession: '',
    CV: '',
    errors_list: [],
  });
  const list = ['Single', 'Divorced', 'Married'];

  const handleChange = (e) => {
    setSignUp({ ...signUp, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    console.log(signUp);
    e.preventDefault();
    axios
      .post(`/api/auth/sign-up`, signUp, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        if (res.status === 201) {
          localStorage.setItem('email', res.data.email);
          Swal.fire({
            icon: 'info',
            title: 'Email Verification',
            text: 'Please verify your email by clicking on the link sent to you',
          });
          // props.setSignUp(false);
        }
      })
      .catch(function (error) {
        console.log(error.response.data);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Please verify your credentials',
        });
        setSignUp({ ...signUp, errors_list: error.response.data });
      });
  };
  const handleContinue = () => {
    setViewed(!viewed);
  };
  const accessHandler = () => {
    setCondition(!condition);
  };

  return (
    <div className="sign-up">
      <form className="box" onSubmit={handleSubmit}>
        <div className="close">
          <img
            src={x_icon}
            alt="x"
            width="40px"
            height="40px"
            className="x-icon p-2"
            onClick={handleClose}
          />
        </div>
        {!viewed && (
          <>
            <h2 className="mb-3" style={{ textAlign: 'center' }}>
              Sign Up
            </h2>
            <div className="d-flex justify-content-center align-items-center">
              <div className="circle" style={{ backgroundColor: '#51f47a' }}>
                <p
                  style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    margin: '0',
                    color: '#ffffff',
                  }}
                >
                  1
                </p>
              </div>
              <div id="circle-link"></div>
              <div className="circle">
                <p
                  style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    margin: '0',
                    color: '#ffffff',
                  }}
                >
                  2
                </p>
              </div>
            </div>

            <div className="form form-1">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={signUp.name}
                onChange={handleChange}
              />
              {signUp.errors_list.name && <p>{signUp.errors_list.name}</p>}
              <label>Email</label>
              <input
                type="text"
                name="email"
                value={signUp.email}
                onChange={handleChange}
              />
              {signUp.errors_list.email && <p>{signUp.errors_list.email}</p>}

              <label>Password</label>
              <input
                type="password"
                name="password"
                value={signUp.password}
                onChange={handleChange}
                placeholder="Uppercase & lowercase & 8 characters minimum"
              />
              <label>Confirm Password </label>
              <input
                type="password"
                name="confirm_password"
                value={signUp.confirm_password}
                onChange={handleChange}
              />
              {signUp.errors_list.password && (
                <p>{signUp.errors_list.password}</p>
              )}
              <label>Civility</label>
              <select
                name="civility"
                value={signUp.civility}
                onChange={handleChange}
                id="civility"
              >
                {list.map((civility, index) => {
                  return <option key={index}>{civility}</option>;
                })}
              </select>
              <label>Birthday</label>
              <input
                type="text"
                name="birthday"
                placeholder="yyyy-mm-dd"
                value={signUp.birthday}
                onChange={handleChange}
              />
              {signUp.errors_list.birthday && (
                <p>{signUp.errors_list.birthday}</p>
              )}
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={signUp.phone}
                onChange={handleChange}
              />
              {signUp.errors_list.phone && <p>{signUp.errors_list.phone}</p>}
              <div className="checkbox">
                {condition ? (
                  <>
                    <input type="checkbox" onClick={accessHandler} checked />
                    <label>j'accepte les conditions d'utilisation</label>{' '}
                  </>
                ) : (
                  <>
                    <input type="checkbox" onClick={accessHandler} />
                    <label>j'accepte les conditions d'utilisation</label>{' '}
                  </>
                )}
              </div>
              <div className="d-flex justify-content-center mt-3">
                {!viewed ? (
                  !condition ? (
                    <button disabled className="btn" onClick={handleContinue}>
                      Continue
                    </button>
                  ) : (
                    <button className="btn" onClick={handleContinue}>
                      Continue
                    </button>
                  )
                ) : (
                  <button hidden className="btn" onClick={handleContinue}>
                    Continue
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </form>
      {viewed && (
        <form className="box box-2" onSubmit={handleSubmit}>
          <div className="close">
            <img
              src={x_icon}
              alt="x"
              width="40px"
              height="40px"
              className="x-icon p-2"
              onClick={handleClose}
            />
          </div>

          <h2 className="mb-3" style={{ textAlign: 'center' }}>
            Sign Up
          </h2>
          <div className="d-flex justify-content-center align-items-center mb-3">
            <div className="circle" style={{ backgroundColor: '#51f47a' }}>
              <p
                style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  margin: '0',
                  color: '#ffffff',
                }}
              >
                1
              </p>
            </div>
            <div id="circle-link" style={{ backgroundColor: '#51f47a' }}></div>
            <div className="circle" style={{ backgroundColor: '#51f47a' }}>
              <p
                style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  margin: '0',
                  color: '#ffffff',
                }}
              >
                2
              </p>
            </div>
          </div>
          <div className="form">
            <label className="mb-2">Profession title</label>
            <input
              name="profession"
              value={signUp.profession}
              onChange={handleChange}
            />
            {signUp.errors_list.profession && (
              <p>{signUp.errors_list.profession}</p>
            )}
            <label>Governorate</label>
            <input
              type="text"
              name="governorate"
              value={signUp.governorate}
              onChange={handleChange}
            />
            {signUp.errors_list.governorate && (
              <p>{signUp.errors_list.governorate}</p>
            )}
            <label className="my-3">CV</label>
            <div className="px-5">
              <FileUpload
                setSignUp={setSignUp}
                signUp={signUp}
                height={'8rem'}
              />
            </div>
            <p style={{ textAlign: 'center' }}>
              only JPEG, PNG, doc, docx and pdf file are supported
            </p>
            <div className="d-flex justify-content-center mt-4">
              <button type="submit" className="btn mt-3">
                Submit
              </button>
            </div>
            <div className="d-flex justify-content-center">
              <button className="btn mt-3" onClick={handleContinue}>
                back
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default SignUp;
