import React from 'react'
<<<<<<< HEAD
=======
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
>>>>>>> 25f51a8b3cf6ee60bea71a8be20834b96f2addcd
import './App.css'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import AppScreens from './components/Appscreen';
import Mobile from './components/Mobile';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
<<<<<<< HEAD
import Demo from './components/Demo';
function App() {
  return (
    <div style={styles.app}>
      <Navbar />
=======
import LoginPage from './components/Login';

function MainPage() {
  return (
    <>
>>>>>>> 25f51a8b3cf6ee60bea71a8be20834b96f2addcd
      <Home />
      <Features />
      <HowItWorks />
      <Testimonials/>
      <AppScreens/>
      <Mobile/>  
      <Footer/>
<<<<<<< HEAD
      {/* <Demo /> */}
    </div>
=======
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
>>>>>>> 25f51a8b3cf6ee60bea71a8be20834b96f2addcd
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
