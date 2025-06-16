import React, { useState } from 'react';
import rectangleImg from '../assets/main img.png';
import dottedShape from '../assets/Shape.png';
import heart from "../assets/heart.png";

const Home = () => {
  const [hoveredButton, setHoveredButton] = useState(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  
  // Add responsive window resize listener
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Set initial width
    setWindowWidth(window.innerWidth);
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const isMobile = windowWidth <= 768;
  
  return (
    <main id="home" style={{
      width: "100%",
      minHeight: "90vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxSizing: "border-box",
      overflow: "hidden",
      position: "relative",
      padding: isMobile ? (windowWidth < 480 ? '30px 15px' : '40px 20px') : '80px 20px'
    }}>
      <div style={{
        width: "100%", 
        maxWidth: "1200px", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        flexWrap: "wrap", 
        gap: isMobile ? "20px" : "clamp(20px, 5vw, 50px)", 
        position: "relative",
        padding: isMobile ? (windowWidth < 480 ? '0 10px' : '0 15px') : '0 20px'
      }}>
        {/* Left Column - Text Content and Decorative Elements */}
        <div style={{
          flex: "1 1 0%", 
          minWidth: "280px", 
          maxWidth: isMobile ? "100%" : "500px", 
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "flex-start", 
          height: isMobile ? "auto" : "550px", 
          minHeight: isMobile ? "auto" : "300px",
          width: "100%", 
          position: "relative", 
          alignItems: "flex-start", 
          textAlign: "left",
          padding: isMobile ? (windowWidth < 480 ? '15px 5px' : '20px 10px') : '25px 15px'
        }}>
          {/* Content Section - Top */}
          <div style={{ 
            position: "relative", 
            zIndex: 3,
            width: "100%",
            alignSelf: "flex-start"
          }}>
            <h1 style={{
              fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
              lineHeight: "1.2",
              marginBottom: "clamp(15px, 3vh, 25px)",
              fontWeight: "bold",
              textAlign: "left"
            }}>
              Secure Voice Calls
              <br />
              With <span style={{color: "rgb(247, 53, 49)", fontWeight: "bold"}}>OTP</span> Verification
            </h1>
            <p style={{
              fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
              lineHeight: "1.6",
              color: "rgb(85, 85, 85)",
              marginBottom: "clamp(20px, 4vh, 30px)",
              textAlign: "left"
            }}>
              Make crystal-clear calls with end-to-end encryption and real-time
              location sharing.
            </p>
            <div style={{
              display: "flex",
              gap: "clamp(10px, 3vw, 20px)",
              flexFlow: isMobile ? "column wrap" : "row wrap",
              justifyContent: "flex-start",
              marginBottom: "15px",
              width: "100%"
            }}>
              <a
                href="#features"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("features")
                    .scrollIntoView({ behavior: "smooth" });
                }}
                style={{
                  padding: "clamp(10px, 2vw, 14px) clamp(15px, 3vw, 28px)",
                  textDecoration: "none",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  transition: "0.3s",
                  display: "inline-block",
                  cursor: "pointer",
                  fontSize: "clamp(14px, 1.5vw, 16px)",
                  letterSpacing: "0.5px",
                  textAlign: "center",
                  minWidth: "clamp(120px, 15vw, 160px)",
                  boxSizing: "border-box",
                  width: isMobile ? "100%" : "auto",
                  margin: "0px",
<<<<<<< HEAD
                  background: hoveredButton === "getStarted" ? "linear-gradient(90deg, #F73531 0%, #FF6B00 98.5%)" : "rgb(255, 255, 255)",
                  color: hoveredButton === "getStarted" ? "#fff" : "rgb(51, 51, 51)",
=======
                  background: hoveredButton === "getStarted" ? "linear-gradient(90deg, #F73531 0%, #FF6B00 98.5%)" : "linear-gradient(90deg, #F73531 0%, #FF6B00 98.5%)",
                  color: hoveredButton === "getStarted" ? "#fff" : "#fff",
>>>>>>> 25f51a8b3cf6ee60bea71a8be20834b96f2addcd
                  border: hoveredButton === "getStarted" ? "2px solid transparent" : "2px solid rgb(247, 53, 49)",
                  boxShadow: hoveredButton === "getStarted" ? "0 8px 20px rgba(247, 53, 49, 0.3)" : "rgba(247, 53, 49, 0.1) 0px 4px 10px",
                  transform: hoveredButton === "getStarted" ? "translateY(-3px)" : "translateY(0px)"
                }}
                onMouseEnter={() => setHoveredButton("getStarted")}
                onMouseLeave={() => setHoveredButton(null)}
              >
                Get Started
              </a>
              <a
                href="#how-it-works"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("how-it-works")
                    .scrollIntoView({ behavior: "smooth" });
                }}
                style={{
                  padding: "clamp(10px, 2vw, 14px) clamp(15px, 3vw, 28px)",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: "bold",
                  transition: "0.3s",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  cursor: "pointer",
                  fontSize: "clamp(14px, 1.5vw, 16px)",
                  letterSpacing: "0.5px",
                  textAlign: "center",
                  minWidth: "clamp(120px, 15vw, 160px)",
                  boxSizing: "border-box",
                  width: isMobile ? "100%" : "auto",
<<<<<<< HEAD
                  background: hoveredButton === "watchVideos" ? "linear-gradient(90deg, #F73531 0%, #FF6B00 98.5%)" : "rgb(255, 255, 255)",
                  color: hoveredButton === "watchVideos" ? "#fff" : "rgb(51, 51, 51)",
=======
                  background: hoveredButton === "getStarted" ? "linear-gradient(90deg, #F73531 0%, #FF6B00 98.5%)" : "linear-gradient(90deg, #F73531 0%, #FF6B00 98.5%)",
                  color: hoveredButton === "getStarted" ? "#fff" : "#fff",
>>>>>>> 25f51a8b3cf6ee60bea71a8be20834b96f2addcd
                  border: hoveredButton === "watchVideos" ? "2px solid transparent" : "2px solid rgb(247, 53, 49)",
                  boxShadow: hoveredButton === "watchVideos" ? "0 8px 20px rgba(247, 53, 49, 0.3)" : "rgba(247, 53, 49, 0.1) 0px 4px 10px",
                  transform: hoveredButton === "watchVideos" ? "translateY(-3px)" : "translateY(0px)"
                }}
                onMouseEnter={() => setHoveredButton("watchVideos")}
                onMouseLeave={() => setHoveredButton(null)}
              >
                Watch Videos{" "}
                <span
                  style={{
<<<<<<< HEAD
                    color: hoveredButton === "watchVideos" ? "#fff" : "rgb(247, 53, 49)",
=======
                    color: hoveredButton === "watchVideos" ? "#fff" : "#fff",
>>>>>>> 25f51a8b3cf6ee60bea71a8be20834b96f2addcd
                    marginLeft: "5px"
                  }}
                >
                  ▶
                </span>
              </a>
            </div>
          </div>
          
          {/* Heart Image - Right Bottom */}
          <div style={{
            position: "relative",
            width: "100%",
            display: "flex",
            justifyContent: isMobile ? "center" : "flex-end",
            alignItems: "center",
            marginTop: "auto",
            paddingTop: "30px",
            paddingBottom: "20px",
            paddingRight: isMobile ? "0" : "20px",
            zIndex: 1
          }}>
            <img 
              src={heart} 
              alt="Heart icon" 
              style={{
                width: isMobile ? "40px" : "60px",
                height: "auto",
                filter: "drop-shadow(rgba(0, 0, 0, 0.15) 0px 4px 8px)",
                zIndex: 1
              }} 
            />
          </div>
          
          {/* Bottom Left Dotted Shape */}
          <img 
            src={dottedShape} 
            alt="Decorative shape" 
            style={{
              position: "absolute",
              width: isMobile ? "80px" : "150px",
              height: "auto",
              bottom: isMobile ? "-15px" : "-30px",
              left: isMobile ? "-15px" : "-30px",
              zIndex: 1,
              pointerEvents: "none"
            }} 
          />
        </div>
        <div 
          style={{
            flex: "1 1 0%",
            minWidth: "280px",
            maxWidth: "580px",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: isMobile ? "auto" : "600px",
            minHeight: isMobile ? "auto" : "500px",
            margin: "0px auto",
            width: "100%",
            padding: isMobile ? (windowWidth < 480 ? '15px 5px' : '20px 10px') : '25px 15px'
          }}>
              <img
                src={rectangleImg}
                alt="OTP Verification"
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: isMobile ? "280px" : "560px",
                  objectFit: "contain",
                  position: "relative",
                  zIndex: 1,
                  marginBottom: "0px"
                }}
              />
          
          {/* Top Right Dotted Shape */}
          <img 
            src={dottedShape} 
            alt="Decorative shape" 
            style={{
              position: "absolute",
              width: isMobile ? "80px" : "150px",
              height: "auto",
              top: isMobile ? "-15px" : "-30px",
              right: isMobile ? "-15px" : "-30px",
              zIndex: 1,
              pointerEvents: "none"
            }} 
          />
        </div>
      </div>
    </main>
  );
};

export default Home;