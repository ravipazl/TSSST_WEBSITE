import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import AppScreens from './components/Appscreen';
import Mobile from './components/Mobile';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import LoginPage from './components/Login';

function MainPage() {
  return (
    <>
      <Home />
      <Features />
      <HowItWorks />
      <Testimonials/>
      <AppScreens/>
      <Mobile/>  
      <Footer/>
    </>
  );
}

function App() {
  return (
    <Router>
      <div style={styles.app}>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
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
