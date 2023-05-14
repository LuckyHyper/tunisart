import React, { useEffect, useRef, useState } from 'react';
import './DomainePage.css';
import { useLocation } from 'react-router-dom';
import PosteCard from '../../components/PosteCard';
import axios from 'axios';
import PosteForm from '../../components/PosteForm';
import filter_icon from '../../assets/filter-icon.png';
import Aos from 'aos';
import 'aos/dist/aos.css';

function DomainePage() {
  const [data, setData] = useState();
  const [form, setForm] = useState({
    value: false,
    index: '',
  });
  const [currentPage, setCurrentPage] = useState(0);
  const total_page = useRef(0);

  const location = useLocation();
  const title = location.state.title;
  useEffect(() => {
    axios
      .get(`/api/poste/domain?domain=${title}&page=${currentPage}`)
      .then((res) => {
        if (res.status === 201) {
          setData(res.data.result);
          console.log(res.data.result);
          total_page.current = res.data.total_pages;
          console.log(res.data.total_pages);
        }
      });
    Aos.init();
  }, [currentPage, title]);

  return (
    <div className="domaine-page">
      <div className="d-flex align-items-center">
        <img src={filter_icon} alt="" width="20px" height="20px" />
        <h4 className="filter-text">Filter by :</h4>
        <p
          className="filter-text"
          style={{ fontWeight: '100', fontSize: '30px' }}
        >
          "{title}"
        </p>
      </div>
      <div className="pt-2">
        {data &&
          data.map((value, index) => {
            return (
              <div
                key={index}
                onClick={() =>
                  setForm({ ...form, value: true, index: value._id })
                }
              >
                <PosteCard
                  title={value.title}
                  company_name={value.company_name}
                  address={value.address}
                  description={value.description}
                  company_logo={value.company_logo}
                  country={value.country}
                  createdAt={value.createdAt}
                />
              </div>
            );
          })}
      </div>
      {form.value && <PosteForm setForm={setForm} index={form.index} />}
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
          {total_page.current !== 0 ? (
            [...Array(total_page.current)].map((item, index) => (
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
            {currentPage >= total_page.current - 1 ? (
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

export default DomainePage;
