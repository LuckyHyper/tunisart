import React from 'react';
import { Link } from 'react-router-dom';
import right_arrow from '../assets/right-arrow.png';

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
      <div style={{ display: 'flex', width: '100%' }}>
        <Link
          to="/domain"
          state={{ title: props.title }}
          className="card-link"
          style={{ margin: '0', display: 'absolute', width: '100%', left: '0' }}
        >
          qte
        </Link>
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
