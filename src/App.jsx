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

// Admin components
import Dashboard from './admin/Dashboard';
import ApiLogs from './admin/Apilogs';
import AppLogs from './admin/Applogs';
import AppRelease from './admin/Apprelease';
import ConfigSettings from './admin/Configsettings';
import AdminLayout from './admin/AdminLayout';

function MainPage() {
  return (
    <>
      <Navbar />
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

// Admin route wrapper component
const AdminRoute = ({ component: Component }) => {
  return (
    <AdminLayout>
      <Component />
    </AdminLayout>
  );
};

function App() {
  return (
    <Router>
      <div style={styles.app}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<MainPage />} />
          
          {/* Admin routes */}
          <Route path="/admin" element={<AdminRoute component={Dashboard} />} />
          <Route path="/admin/api-logs" element={<AdminRoute component={ApiLogs} />} />
          <Route path="/admin/app-logs" element={<AdminRoute component={AppLogs} />} />
          <Route path="/admin/app-releases" element={<AdminRoute component={AppRelease} />} />
          <Route path="/admin/config-settings" element={<AdminRoute component={ConfigSettings} />} />
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
