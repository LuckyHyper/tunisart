import axios from 'axios';
import React, { useEffect, useState } from 'react';
import delete_icon from '../../assets/delete-icon.png';
import FileUpload from '../../components/FileUpload';

function Domains() {
  const [domains, setDomains] = useState();
  const [reload, setReload] = useState(0);
  const [form, setForm] = useState({
    domaine_name: '',
    icon: '',
  });

  useEffect(() => {
    axios.get('/api/domaine').then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        setDomains(res.data);
      }
    });
  }, [reload]);

  const deleteHandler = async (id) => {
    await axios.delete(`/api/domaine?id=${id}`).then((res) => {
      if (res.status === 201) setReload(reload + 1);
    });
  };

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitDomain = async (e) => {
    e.preventDefault();
    axios
      .post(`/api/domaine`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        if (res.status === 201) {
          console.log('added successfully');
          setReload(reload + 1);
        }
      });
  };

  return (
    <div className="domains-admin">
      <div className="domains-box">
        <form onSubmit={submitDomain}>
          <div className="d-flex justify-content-center">
            <input
              className="form-control mr-sm-2 w-75"
              type="search"
              placeholder="New Domain"
              name="domaine_name"
              onChange={handleInput}
            />
            <FileUpload
              form={form}
              setForm={setForm}
              height={'2.3rem'}
              width="6rem"
            />
          </div>
          <div className="d-flex justify-content-end">
            <button
              type="submit"
              className="btn btn-dark"
              style={{ width: '8rem', margin: '1rem 0 0.5rem 0' }}
            >
              Add Domain
            </button>
          </div>
        </form>
        <div className="domains-container">
          {domains &&
            domains.map((item) => {
              return (
                <div className="domain-row">
                  <img
                    src={
                      process.env.REACT_APP_API_URL +
                      'public/' +
                      item.icon.split('icon/')[1]
                    }
                    alt=""
                    width="40px"
                    height="40px"
                  />
                  <p style={{ margin: '0' }}>{item.domaine_name}</p>
                  <button onClick={() => deleteHandler(item._id)}>
                    <img
                      src={delete_icon}
                      alt=""
                      width="26px"
                      height="26px"
                      className="mx-2"
                    />
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Domains;
