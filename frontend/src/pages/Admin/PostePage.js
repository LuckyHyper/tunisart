import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import delete_icon from '../../assets/delete-icon.png';
import edit_icon from '../../assets/edit-icon.png';
import no_picture from '../../assets/no-picture.png';
import Swal from 'sweetalert2';
import AdminAdd from '../../components/AdminAdd';
import AdminEditPoste from '../../components/AdminEditPoste';
import axiosInstance from '../../interceptors/axiosInstance';
import CandidateList from '../../components/CandidateList';
import list_icon from '../../assets/list-icon.png';

function PostePage() {
  const [list, setList] = useState({
    id: '',
    value: false,
  });
  const [data, setData] = useState();
  const [reload, setReload] = useState(0);
  const [formAdd, setFormAdd] = useState(false);
  const [formEdit, setFormEdit] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [posteId, setPosteId] = useState();
  const total_pages = useRef(0);
  const search = useRef('');
  const api = useRef(false);
  const [form, setForm] = useState({
    title: '',
    company_name: '',
    company_logo: '',
    company_email: '',
    address: '',
    domaineId: '',
    work_schedule: '',
    country: '',
    description: '',
    job_vacancy: '',
    contract_type: '',
    experience: '',
    level_of_study: '',
    language_requirement: '',
    genre: '',
  });

  useEffect(() => {
    if (!api.current) {
      axiosInstance
        .get(`/api/poste/search?page=${currentPage}`)
        .then((res) => {
          if (res.status === 201) {
            setData(res.data.result);
            total_pages.current = res.data.total_pages;
            console.log(res.data.result);
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      axiosInstance
        .get(`/api/poste/search?search=${search.current}&page=${currentPage}`)
        .then((res) => {
          if (res.status === 201) {
            setData(res.data.result);
            total_pages.current = res.data.total_pages;
            console.log(res.data.result);
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [currentPage, reload]);

  const deleteHandler = (id) => {
    axiosInstance
      .delete(`/api/poste/${id}`)
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Delete Successfully',
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Admin authentification required',
        });
      });
    setReload(reload + 1);
  };
  const searchSubmit = async (e) => {
    e.preventDefault();
    if (search === '') {
      api.current = false;
      setReload(reload + 1);
    }
    await axios
      .get(`/api/poste/search?search=${search.current}`)
      .then((res) => {
        if (res.status === 201) {
          setData(res.data.result);
          console.log(res.data);
          api.current = true;
          total_pages.current = res.data.total_pages;
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="page-layout">
      <h3 className="mb-4">Recent Post</h3>
      <div className="search-input justify-content-md-between">
        <form className="form-inline my-3" onSubmit={searchSubmit}>
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
        <button className="btn btn-dark m-4" onClick={() => setFormAdd(true)}>
          Add Post
        </button>
        {formAdd && (
          <AdminAdd
            setReload={setReload}
            reload={reload}
            setFormAdd={setFormAdd}
          />
        )}
      </div>
      <table className="table" id="poste-table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Logo</th>
            <th scope="col">Nom du l'entreprise</th>
            <th scope="col">Title</th>
            <th scope="col">Email</th>
            <th scope="col">Candidates</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">
                    <p className="mb-0 mt-3">{currentPage * 5 + index + 1}</p>
                  </th>
                  <td>
                    {item.company_logo ? (
                      <img
                        src={
                          process.env.REACT_APP_API_URL +
                          'public/' +
                          item.company_logo.split('logo/')[1]
                        }
                        alt=""
                        width="50px"
                        height="50px"
                        id="companys_logo"
                      />
                    ) : (
                      <img src={no_picture} alt="" width="50px" height="50px" />
                    )}
                  </td>

                  <td>
                    <p className="table-text">{item.company_name}</p>
                  </td>
                  <td>
                    <p className="table-text">{item.title}</p>
                  </td>
                  <td>
                    <p className="table-text">
                      {item.company_email ? item.company_email : 'email'}
                    </p>
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        setList({ ...list, id: item._id, value: true })
                      }
                      style={{ margin: '0.4rem' }}
                    >
                      <img src={list_icon} alt="" width="50px" height="50px" />
                    </button>
                  </td>
                  <td>
                    <div style={{ padding: '1rem 0' }}>
                      <button
                        onClick={() => {
                          setFormEdit(true);
                          setPosteId(item._id);
                        }}
                      >
                        <img
                          src={edit_icon}
                          alt=""
                          width="27px"
                          height="27px"
                          className="mx-2 my-1"
                        />
                      </button>

                      <button onClick={() => deleteHandler(item._id)}>
                        <img
                          src={delete_icon}
                          alt=""
                          width="26px"
                          height="26px"
                          className="mx-2 my-1"
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          {formEdit && (
            <AdminEditPoste
              setReload={setReload}
              reload={reload}
              setFormEdit={setFormEdit}
              posteId={posteId}
              form={form}
              setForm={setForm}
            />
          )}
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
      {list.value && (
        <CandidateList setList={setList} list={list} id={list.id} />
      )}
    </div>
  );
}

export default PostePage;
