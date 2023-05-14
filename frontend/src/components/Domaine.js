import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DomaineCard from './DomaineCard';
import right_arrow from '../assets/right-arrow-domain.png';
import left_arrow from '../assets/left-arrow-domain.png';

function Domaine() {
  const [domaine, setDomaine] = useState();
  useEffect(() => {
    axios.get(`/api/domaine`).then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        setDomaine(res.data);
      }
    });
  }, []);

  const sliderLeft = () => {
    var slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft - 250;
  };
  const sliderRight = () => {
    var slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft + 250;
  };

  return (
    <div className="domain" style={{ marginTop: '12rem' }}>
      <button className="domain-btn" id="domain-btn-left" onClick={sliderLeft}>
        <img src={left_arrow} alt="" width="30px" height="30px" />
      </button>
      <div className="domain-box" id="slider">
        {domaine &&
          domaine.map((value, index) => {
            return (
              <DomaineCard
                key={index}
                title={value.domaine_name}
                icon={value.icon}
              />
            );
          })}
      </div>

      <button
        className="domain-btn"
        id="domain-btn-right"
        onClick={sliderRight}
      >
        <img src={right_arrow} alt="" width="30px" height="30px" />
      </button>
    </div>
  );
}

export default Domaine;
