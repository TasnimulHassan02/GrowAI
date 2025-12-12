import React from 'react'
import Hero from '../components/Hero.jsx';
import Navbar from '../components/Navbar.jsx';
import Brandbar from '../components/Brandbar.jsx';
import Feature from '../components/Feature.jsx';
import DatasetCard from '../components/DatasetCard.jsx';
import Footer from '../components/Footer.jsx';

function HomePage() {

  return (

    <div>

      <Navbar />
      
      <Hero />
      
      <Brandbar />

      <Feature />
      
      <DatasetCard />

      <Footer /> 

    </div>
    
  )
}

export default HomePage
