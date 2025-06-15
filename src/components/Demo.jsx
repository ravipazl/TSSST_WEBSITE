import React, { useState, useEffect } from 'react';
import rectangleImg from '../assets/Rectangle.png';
import vector1321Img from '../assets/Vector 1321.svg';
import vector1322Img from '../assets/Vector 1322.svg';
import vector1323Img from '../assets/Vector1323.svg';
import vector1324Img from '../assets/Vector1324.svg';
import vector1325Img from '../assets/Vector1325.svg';
import dot from '../assets/dot.svg';
import circle from '../assets/circle.svg';

const Home = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  // Update window width when resized
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Calculate responsive values
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  
  // Image container dimensions
  const imageContainerWidth = isMobile ? '100%' : isTablet ? '90%' : '80%';
  const imageContainerHeight = isMobile ? 300 : isTablet ? 400 : 500;
  
  return (
    <main id="home" style={styles.heroSection}>
      <div style={styles.heroContent}>
        
        {/* Image container with decorative elements */}
        <div 
          style={{ 
            ...styles.imageContainer, 
            width: imageContainerWidth,
            height: imageContainerHeight
          }}
        >
          {/* Decorative background elements */}
          <img 
            src={vector1321Img} 
            alt="Decorative shape" 
            style={styles.vector1321}
          />
          <img
            src={vector1322Img}
            alt="Decorative shape"
            style={styles.vector1322}
          />
          <img 
            src={vector1323Img} 
            alt="Decorative shape" 
            style={styles.vector1323}
          />
          <img 
            src={vector1324Img} 
            alt="Decorative shape" 
            style={styles.vector1324}
          />
          <img 
            src={vector1325Img} 
            alt="Decorative shape" 
            style={styles.vector1325}
          />
          <img
            src={dot}
            alt="Decorative dot"
            style={styles.dot}
          />
          <img
            src={circle}
            alt="Decorative circle"
            style={styles.circle}
          />
          
          {/* Main OTP image */}
          <img
            src={rectangleImg}
            alt="OTP Verification"
            style={styles.mainImage}
          />
        </div>
      </div>
    </main>
  );
};

const styles = {
  heroSection: {
    margin: "0",
    padding: "0",
    boxsizing: "border-box",
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "right",
    boxSizing: "border-box",
    overflow: "hidden",
    background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)",
  },
  heroContent: {
    width: "100%",
    maxWidth: "1200px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "40px",
  },

  imageContainer: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "600px",
    margin: "0 auto",
  },
  mainImage: {
    width: "100%",
    height: "850px",
    borderRadius: "12px",
    boxShadow: "0 15px 40px rgba(0, 0, 0, 0.15)",
    zIndex: 20,
    position: "relative",
  },
  // Decorative elements positioning
  vector1321: {
    position: "absolute",
    width: "850px",
    height: "300px",
    top: "-15%",
    left: "50%",
    zIndex: 5,
    opacity: 0.5,
  },
  vector1322: {
    position: "absolute",
    width: "60%",
    height: "auto",
    bottom: "-10%",
    right: "5%",
    zIndex: 6,
    opacity: 0.6,
  },
  vector1323: {
    position: "absolute",
    width: "70%",
    height: "auto",
    top: "15%",
    right: "-10%",
    zIndex: 7,
    opacity: 0.4,
  },
  vector1324: {
    position: "absolute",
    width: "65%",
    height: "auto",
    bottom: "20%",
    left: "-10%",
    zIndex: 8,
    opacity: 0.5,
  },
  vector1325: {
    position: "absolute",
    width: "50%",
    height: "auto",
    top: "30%",
    left: "-5%",
    zIndex: 9,
    opacity: 0.5,
  },
  dot: {
    position: "absolute",
    width: "25%",
    height: "auto",
    bottom: "-5%",
    left: "15%",
    zIndex: 10,
    opacity: 0.7,
  },
  circle: {
    position: "absolute",
    width: "20%",
    height: "auto",
    top: "-5%",
    right: "15%",
    zIndex: 11,
    opacity: 0.7,
  },
};

export default Home;