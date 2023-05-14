import React from 'react';
import About from '../../components/About';
import Footer from '../../components/Footer';
import OffreEmploi from '../../components/OffreEmploi';
import Services from '../../components/Services';
import './Home.css';
import Domaine from '../../components/Domaine';

function Home() {
  return (
    <div>
      <Domaine />
      <OffreEmploi />
      <Footer />
    </div>
  );
}

export default Home;
