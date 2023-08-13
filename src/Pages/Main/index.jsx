import AboutUs from '../../Components/Starter/AboutUs';
import ContactUs from '../../Components/Starter/ContactUs';
import Footer from '../../Components/Starter/Footer';
import Header from '../../Components/Starter/Header';
import Hero from '../../Components/Starter/Hero';
import Section from '../../Components/Starter/Section';
import Testimonial from '../../Components/Starter/Testimonial';

function Main() {
  const handleScroll = () => {
    window.scrollTo({ top: 1900, opacity: 1, behavior: 'smooth' });
  };

  return (
    <>
      <Header />
      <Hero />
      <Section />
      <AboutUs onClickHandler={handleScroll} />
      <Testimonial />
      <ContactUs />
      <Footer />
    </>
  );
}

export default Main;
