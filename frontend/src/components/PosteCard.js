import React, { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';

function PosteCard(props) {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <div
      className="poste-card card"
      data-aos="fade-in"
      data-aos-duration="1200"
    >
      <div className="card-body" onClick={() => props.setForm(true)}>
        <h4
          className="card-title"
          style={{
            display: 'flex',
            justifyContent: 'center',
            fontSize: '2rem',
          }}
        >
          {props.title}
        </h4>
      </div>
    </div>
  );
}

export default PosteCard;
