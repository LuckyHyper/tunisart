import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PosteCard from '../../components/PosteCard';
import PosteForm from '../../components/PosteForm';
import filter_icon from '../../assets/filter-icon.png';
import './SearchPage.css';
import Aos from 'aos';
import 'aos/dist/aos.css';

function SearchPage() {
  const location = useLocation();
  let input = location.state.input;
  let country = location.state.country;
  const new_location = useRef(location.state.new);
  const [data, setData] = useState();
  const [form, setForm] = useState({
    value: false,
    index: '',
  });
  const [currentPage, setCurrentPage] = useState(0);
  const total_page = useRef(0);

  useEffect(() => {
    if (new_location.current) {
      axios
        .get(
          `/api/poste/search/client?search=${input}&country=${country}&page=0`
        )
        .then((res) => {
          if (res.status === 201) {
            setData(res.data.result);
            total_page.current = res.data.total_pages;
            console.log(res.data.result);
          }
        });
    } else {
      axios
        .get(
          `/api/poste/search/client?search=${input}&country=${country}&page=${currentPage}`
        )
        .then((res) => {
          if (res.status === 201) {
            setData(res.data.result);
            total_page.current = res.data.total_pages;
            console.log(res.data.result);
          }
        });
    }
    new_location.current = true;
    Aos.init();
  }, [input, currentPage, country, new_location]);

  return (
    <div className="search-page">
      <div className="d-flex align-items-center">
        <img src={filter_icon} alt="" width="20px" height="20px" />
        <h4 className="filter-text">Filter by :</h4>
        <p
          className="filter-text"
          style={{ fontWeight: '100', fontSize: '30px' }}
        >
          "{input}"
        </p>
      </div>
      <div style={{ marginTop: '2rem' }}>
        {data &&
          data.map((item) => {
            return (
              <div
                key={item._id}
                onClick={() =>
                  setForm({ ...form, value: true, index: item._id })
                }
                data-aos="fade-in"
                data-aos-duration="1200"
              >
                <PosteCard
                  title={item.title}
                  company_name={item.company_name}
                  address={item.address}
                  description={item.description}
                  company_logo={item.company_logo}
                  country={item.country}
                  createdAt={item.createdAt}
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
                onClick={() => {
                  setCurrentPage(currentPage - 1);
                  new_location.current = false;
                }}
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
                  onClick={() => {
                    setCurrentPage(index);
                    new_location.current = false;
                  }}
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
                onClick={() => {
                  setCurrentPage(currentPage + 1);
                  new_location.current = false;
                }}
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

export default SearchPage;
