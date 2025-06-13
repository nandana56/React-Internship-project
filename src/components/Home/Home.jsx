
import React from 'react';
import Hero from '../Hero/Hero';
import TopRatedproducts from '../Products/TopRatedproducts';
import Banner from '../Banner/Banner';

import Testimonials from '../Testimonials/Testimonials';
import Footer from '../Footer/Footer';






const Home = ({ handleOrderPopup }) => {
  return (
    <div>

      <Hero handleOrderPopup={handleOrderPopup} />
      <TopRatedproducts handleOrderPopup={handleOrderPopup} />
      <Banner/>
      <Testimonials/>
      <Footer/>




    </div>
  )
}

export default Home