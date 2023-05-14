import React, { useEffect, useState } from 'react';
import user_green_icon from '../../assets/user-green-icon.png';
import FileUpload from '../FileUpload';
import no_document_icon from '../../assets/no-document-icon.png';
import document_icon from '../../assets/document-icon.png';
import axiosInstance from '../../interceptors/axiosInstance';
import Swal from 'sweetalert2';
import Aos from 'aos';
import 'aos/dist/aos.css';

function UserProfile(props) {
  const [email, setEmail] = useState('');
  const [data, setData] = useState();
  const [reload, setReload] = useState(0);

  useEffect(() => {
    setEmail(localStorage.getItem('email'));
    axiosInstance.get(`/api/users/resume?email=${email}`).then((res) => {
      if (res.status === 200) {
        setData(res.data);
      }
    });

    Aos.init();
  }, [email, reload]);

  const updateSubmit = (file) => {
    axiosInstance
      .put(
        `/api/users/cv/${data._id}`,
        { CV: file },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setReload(reload + 1);
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          Swal.fire({
            icon: 'error',
            title: err.response.data.message,
          });
        }
      });
  };

  return (
    <div className="user-profile" data-aos="slide-left" data-aos-duration="850">
      <div className="close" style={{ opacity: '1' }}>
        <img
          src={user_green_icon}
          alt="x"
          width="55px"
          height="55px"
          className="x-icon"
          onClick={() => props.setProfile(false)}
          style={{ margin: '1rem 0.7rem' }}
        />
      </div>
      <div className="profile-box">
        <p
          className="Profile-text"
          style={{
            marginBottom: '2rem',
            fontFamily: 'Georgia, serif',
            fontSize: '19px',
          }}
        >
          {email}
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '1rem',
          }}
        >
          {data?.CV ? (
            <p className="Profile-text">Your current Resume</p>
          ) : (
            <p className="Profile-text">You dont have Resume</p>
          )}
          {!data?.CV ? (
            <img src={no_document_icon} alt="" width="50px" height="50px" />
          ) : (
            <a
              href={
                process.env.REACT_APP_API_URL +
                'public/' +
                data.CV.split('cv/')[1]
              }
              target="_blanc"
            >
              <img src={document_icon} alt="" width="50px" height="50px" />
            </a>
          )}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '0 1rem',
          }}
        >
          {data?.CV && <p className="Profile-text">Change your resume</p>}
        </div>
        <div className="d-flex justify-content-center mt-2">
          <FileUpload
            height={'60px'}
            width={'150px'}
            updateSubmit={updateSubmit}
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <p
            className="Profile-text"
            style={{
              textAlign: 'center',
              fontSize: '14px',
            }}
          >
            only JPEG, PNG, doc, docx and pdf file <br></br> are supported
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
