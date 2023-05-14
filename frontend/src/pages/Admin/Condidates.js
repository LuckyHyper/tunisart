import React, { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import doc_icon from '../../assets/document-icon.png';
import no_doc_icon from '../../assets/no-document-icon.png';
import axiosInstance from '../../interceptors/axiosInstance';

function Condidates() {
  const [users, setUsers] = useState();
  const [reload, setReload] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const total_pages = useRef(0);
  const api = useRef(false);
  const search = useRef('');

  useEffect(() => {
    if (!api.current) {
      axiosInstance
        .get(`/api/users?page=${currentPage}`)
        .then((res) => {
          if (res.status === 201) {
            setUsers(res.data.result);
            total_pages.current = res.data.total_page;
            console.log(res.data);
          }
        })
        .catch((err) => {
          if (err.response.status === 403 || 401) {
            Swal.fire({
              icon: 'error',
              title: 'Admin authentification required',
            });
          }
        });
    } else {
      axiosInstance
        .get(`/api/users/${search.current}?page=${currentPage}`)
        .then((res) => {
          if (res.status === 201) {
            setUsers(res.data.result);
            total_pages.current = res.data.total_page;
            console.log(res.data);
          }
        })
        .catch((err) => {
          if (err.response.status === 403 || 401) {
            Swal.fire({
              icon: 'error',
              title: 'Admin authentification required',
            });
          }
        });
    }
  }, [reload, currentPage]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (search.current === '') {
      api.current = false;
      setReload(reload + 1);
    }

    await axiosInstance
      .get(`/api/users/${search.current}`)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setUsers(res.data.data);
          total_pages.current = res.data.total_pages;
          api.current = true;
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          Swal.fire({
            icon: 'error',
            title: 'Admin authentification required',
            text: 'You should login again!',
          });
        }
      });
  };

  return (
    <div className="page-layout">
      <h3 className="mb-4">Users List</h3>
      <div className="search-input my-2">
        <form className="form-inline my-3" onSubmit={submitHandler}>
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => (search.current = e.target.value)}
          />
          <button className="btn btn-outline-dark my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
      </div>
      <table className="table table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nom du condidat</th>
            <th scope="col">Profession</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">CV</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{currentPage * 10 + index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.profession}</td>
                  <td>{item.email}</td>
                  <td>{item.phone ? item.phone : '---'}</td>
                  <td style={{ padding: '0.45rem' }}>
                    {!item.CV ? (
                      <img
                        src={no_doc_icon}
                        alt=""
                        width="40px"
                        height="40px"
                      />
                    ) : (
                      <a
                        href={
                          process.env.REACT_APP_API_URL +
                          'public/' +
                          item.CV.split('cv/')[1]
                        }
                        target="_blanc"
                      >
                        <img src={doc_icon} alt="" width="40px" height="40px" />
                      </a>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className="page-item ">
            {currentPage === 0 ? (
              <button
                className="page-link"
                type="button"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled
              >
                Previous
              </button>
            ) : (
              <button
                className="page-link"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>
            )}
          </li>
          {total_pages.current !== 0 ? (
            [...Array(total_pages.current)].map((item, index) => (
              <li className="page-item" key={index}>
                <button
                  className="page-link"
                  href="#"
                  onClick={() => setCurrentPage(index)}
                >
                  {index + 1}
                </button>
              </li>
            ))
          ) : (
            <li className="page-item">
              <button className="page-link" href="#">
                ...
              </button>
            </li>
          )}

          <li className="page-item">
            {currentPage >= total_pages.current - 1 ? (
              <button
                className="page-link"
                href="#"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled
              >
                Next
              </button>
            ) : (
              <button
                className="page-link"
                href="#"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Condidates;
