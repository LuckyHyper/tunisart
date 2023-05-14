import React from 'react';
import developper_icon from '../assets/developper-icon.png';
import { Link } from 'react-router-dom';
import right_arrow from '../assets/right-arrow.png';

function WorkCard() {
  return (
    <div className="work-card">
      <img src={developper_icon} alt="icon" width="120px" height="120px" />
      <h3 className="card-title">developpeur</h3>
      <h5 className="card-description">
        It is a long established fact that a reader will be distracted by the.
      </h5>
      <Link to="/domain" className="card-link">
        <img
          src={right_arrow}
          className="arrow-icon"
          alt=""
          width="20px"
          height="20px"
        />
      </Link>
    </div>
  );
}

export default WorkCard;
