import React from 'react';
import { Link } from 'react-router-dom';
import qte from '../assets/qte.png';

function DomaineCard(props) {
  return (
    <div className="domain-card">
      <img
        src={props.src}
        alt="icon"
        width="120px"
        height="120px"
        style={{ height: '15rem', width: '15rem', borderRadius: '0.7rem' }}
      />
      <h3 className="card-title">{props.title}</h3>
      <div
        style={{
          display: 'flex',
          width: '100%',
          padding: '0.5rem 2.5rem',
          alignItems: 'center',
        }}
      >
        <button className="btn btn-light" style={{ fontSize: '30px' }}>
          -
        </button>
        <h4 style={{ margin: '0' }}>0</h4>
        <button className="btn btn-light" style={{ fontSize: '30px' }}>
          +
        </button>

        <Link
          to="*"
          className="btn btn-dark"
          style={{ display: 'absolute', width: '100%', right: '0' }}
        >
          Buy
        </Link>
      </div>
    </div>
  );
}

export default DomaineCard;
