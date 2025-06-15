import React from 'react'
import './App.css'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import AppScreens from './components/Appscreen';
import Mobile from './components/Mobile';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Demo from './components/Demo';
function App() {
  return (
    <div style={styles.app}>
      <Navbar />
      <Home />
      <Features />
      <HowItWorks />
      <Testimonials/>
      <AppScreens/>
      <Mobile/>  
      <Footer/>
      {/* <Demo /> */}
    </div>
  );
}

const styles = {
  app: {
    fontFamily: "'Poppins', sans-serif",
    minHeight: '100vh',
    color: '#333',
  }
};

export default App
