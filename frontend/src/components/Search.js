import React from 'react';
import tunisie from '../assets/tunisie.png';

function Search() {
  const list = [
    'Country',
    'France',
    'Belgium',
    'Germany',
    'Saudia',
    'Qatar',
    'UAE',
    'Koweit',
    'Oman',
  ];

  return (
    <div className="search">
      <h4
        style={{
          position: 'absolute',
          left: '24rem',
          top: '17rem',
          fontFamily: 'serif',
          fontSize: '40px',
          color: '#ffffff',
        }}
      >
        Welcome to Tunisia
      </h4>
      <p
        style={{
          position: 'absolute',
          left: '12rem',
          top: '20rem',
          alignText: 'left',
          fontFamily: 'Instrument Sans, sans-serif;',
          fontSize: '20px',
          color: '#ffffff',
        }}
      >
        Tunisia has a rich history of artisanal crafts, which have been passed
        down through generations. Artisanat, which refers to the traditional
        crafts of Tunisia, includes a wide variety of handmade products such as
        ceramics, textiles, leatherwork, metalwork, wood carving, and more. One
        of the most famous artisanal crafts in Tunisia is carpet weaving, which
        has been practiced for centuries. The carpets are made from wool or
        cotton and are decorated with intricate patterns and designs. They are
        known for their vibrant colors and are often used as decorative pieces
        in homes and businesses.
      </p>
      <div
        style={{
          position: 'absolute',
          right: '0',
          top: '6rem',
          opacity: '0.8',
        }}
      >
        <img src={tunisie} alt="" height="600rem" width="600rem" />
      </div>
    </div>
  );
}

export default Search;
