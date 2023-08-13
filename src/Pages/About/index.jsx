import React from 'react';

import AboutUs from '../../Components/Starter/AboutUs';
import ContactUs from '../../Components/Starter/ContactUs';
import Footer from '../../Components/Starter/Footer';
import Header from '../../Components/Starter/Header';

const About = () => {
  const handleScroll = () => {
    window.scrollTo({ top: 500, opacity: 1, behavior: 'smooth' });
  };

  return (
    <div>
      <Header />
      <AboutUs onClickHandler={handleScroll} />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default About;
