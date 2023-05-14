import React, { useState } from 'react';
import About from './About';
import DomaineCard from './DomaineCard';
import x_icon from '../assets/X-icon.png';
import FileUpload from './FileUpload';
import produit1 from '../assets/produit-1.png';
import produit2 from '../assets/produit-2.jpg';
import produit3 from '../assets/produit-3.jpg';
import produit4 from '../assets/produit-5.jpg';

function Marketpalce() {
  const [showPopup, setPopup] = useState(false);
  return (
    <div>
      <div className="marketplace">
        <div className="marketplace-head">
          <div style={{ position: 'absolute', left: '0', marginLeft: '5%' }}>
            <h4>tunisia</h4>
          </div>
          <button
            style={{ position: 'absolute', right: '0', marginRight: '5%' }}
            className="btn btn-warning"
            onClick={() => setPopup(true)}
          >
            Add Article
          </button>
        </div>
        <div className="cards-layout">
          <DomaineCard src={produit1} />
          <DomaineCard src={produit2} />
          <DomaineCard src={produit3} />
        </div>
        {showPopup && (
          <div className="article-background">
            <div className="article-box">
              <div className="close">
                <img
                  src={x_icon}
                  alt="x"
                  width="40px"
                  height="40px"
                  className="x-icon p-2"
                  onClick={() => setPopup(false)}
                />
              </div>
              <div
                className="card border-warning bg-light"
                style={{ borderRadius: '0.3rem' }}
              >
                <div className="card-body mt-4">
                  <label class="form-label" for="form12">
                    Article name
                  </label>{' '}
                  <div class="form-outline">
                    <input type="text" id="form12" class="form-control" />
                  </div>{' '}
                </div>
                <div
                  className="d-flex justify-content-center"
                  style={{ margin: '1rem 0 2rem 0' }}
                >
                  <FileUpload width="80%" height="4rem" />
                </div>
                <button className="btn btn-warning mx-4 mb-4">
                  Add Article
                </button>
              </div>
            </div>
          </div>
        )}
        <div aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className="page-item ">
              <button className="page-link" type="button" disabled>
                Previous
              </button>
            </li>
            <li className="page-item">
              <button className="page-link" href="#">
                1
              </button>
            </li>
            <li className="page-item">
              <button className="page-link" href="#">
                Next
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Marketpalce;
