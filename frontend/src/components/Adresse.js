import React from 'react';
import map_icon from '../assets/map-icon.jpg';

function Adresse() {
  return (
    <div className="address-section">
      <h3 className="mb-4 pl-2">adresse</h3>
      <div className="adresse-box row">
        <img
          src={map_icon}
          alt="map-icon"
          className="col-5 box-1"
          width="600px"
          height="600px"
        />
        <div className="col-7 box-2">test</div>
      </div>
    </div>
  );
}

export default Adresse;
