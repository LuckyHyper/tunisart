import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PosteCard from './PosteCard';
import PosteForm from './PosteForm';

function OffreEmploi() {
  const [data, setData] = useState();
  const [form, setForm] = useState(false);

  useEffect(() => {
    axios.get(`/api/poste/offre`).then((res) => {
      if (res.status === 201) {
        console.log(res.data.result);
        setData(res.data.result);
      }
    });
  }, []);

  return (
    <div className="offre" id="offre">
      <h2>Our latest offer to apply</h2>

      <div className="offre-section">
        <div className="offre-poste">
          <PosteCard title={'North'} setForm={setForm} />
          <PosteCard title={'Meduim'} />
          <PosteCard title={'South'} />
        </div>
        {form === 0 ? (
          <PosteForm setForm={setForm} />
        ) : (
          form === 1 && <PosteForm setForm={setForm} />
        )}
      </div>
    </div>
  );
}

export default OffreEmploi;
