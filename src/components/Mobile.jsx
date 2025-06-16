import React, { useState, useEffect } from "react";
import appStoreImg from "../assets/app_img.png";
import googlePlayImg from "../assets/google_img.png";
import phone1Img from "../assets/phone_img1.png";
import phone2Img from "../assets/phone_img2.png";
import phone3Img from "../assets/phone_img3.png";

function Mobile() {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  
  // Update window width when resized
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    // Debounce resize event for better performance
    let timeoutId;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };
    
    window.addEventListener('resize', debouncedResize);
    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(timeoutId);
    };
  }, []);
  
  // Base styles
  const baseStyles = {
    page: {
      textAlign: "center",
      padding: "40px 30px",
      maxWidth: "1200px",
      margin: "0 auto",
      overflow: "hidden",
    },
    topText: {
      background: "linear-gradient(135deg, #ff3e00, #ff6a00)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      fontSize: "16px",
      fontWeight: "500",
      marginBottom: "10px",
    },
    heading: {
      fontSize: "48px",
      fontWeight: "700",
      marginBottom: "20px",
      lineHeight: "1.2",
    },
    secure: {
      background: "linear-gradient(135deg, #ff3e00, #ff6a00)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    subtitle: {
      color: "#6b7280",
      fontSize: "16px",
      fontWeight: "500",
      margin: "10px 0 30px",
      lineHeight: "1.6",
    },
    appButtons: {
      display: "flex",
      justifyContent: "center",
      gap: "15px",
      marginBottom: "50px",
      flexWrap: "wrap",
    },
    appButton: {
      width: "140px",
      height: "auto",
      transition: "transform 0.3s ease",
    },
    phoneContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      width: "100%",
      height: "500px",
    },
    phoneImage: {
      position: "absolute",
      width: "300px",
      height: "auto",
      borderRadius: "30px",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
      transition: "all 0.3s ease",
    },
    phoneLeft: {
      left: "10%",
      transform: "translateX(-50%) rotate(-5deg)",
      zIndex: 1,
    },
    phoneCenter: {
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 3,
    },
    phoneRight: {
      left: "90%",
      transform: "translateX(-50%) rotate(5deg)",
      zIndex: 2,
    },
  };
  
  // Responsive styles
  const getResponsiveStyles = () => {
    // Extra small mobile styles (under 480px)
    if (windowWidth < 480) {
      return {
        page: {
          padding: "30px 15px",
        },
        topText: {
          fontSize: "14px",
        },
        heading: {
          fontSize: "28px",
          marginBottom: "15px",
        },
        subtitle: {
          fontSize: "14px",
          margin: "10px 0 20px",
        },
        appButtons: {
          marginBottom: "30px",
        },
        appButton: {
          width: "120px",
        },
        phoneContainer: {
          height: "350px",
          marginTop: "20px",
        },
        phoneImage: {
          width: "180px",
        },
        phoneLeft: {
          left: "30%",
          top: "10%",
          transform: "translateX(-100%) rotate(-10deg)",
        },
        phoneCenter: {
          left: "50%",
          top: "0%",
        },
        phoneRight: {
          left: "70%",
          top: "10%",
          transform: "translateX(0%) rotate(10deg)",
        },
      };
    }
    
    // Mobile styles (480px - 768px)
    if (windowWidth >= 480 && windowWidth < 768) {
      return {
        page: {
          padding: "40px 20px",
        },
        heading: {
          fontSize: "32px",
        },
        subtitle: {
          fontSize: "15px",
        },
        phoneContainer: {
          height: "400px",
        },
        phoneImage: {
          width: "220px",
        },
        phoneLeft: {
          left: "25%",
          transform: "translateX(-80%) rotate(-8deg)",
        },
        phoneCenter: {
          left: "50%",
        },
        phoneRight: {
          left: "75%",
          transform: "translateX(-20%) rotate(8deg)",
        },
      };
    }
    
    // Tablet styles (768px - 1024px)
    if (windowWidth >= 768 && windowWidth < 1024) {
      return {
        heading: {
          fontSize: "38px",
        },
        phoneContainer: {
          height: "450px",
        },
        phoneImage: {
          width: "250px",
        },
        phoneLeft: {
          left: "25%",
        },
        phoneRight: {
          left: "75%",
        },
      };
    }
    
    // Default styles (desktop)
    return {};
  };
  
  const responsiveStyles = getResponsiveStyles();
  
  return (
    <section id="mobile-app" style={{...baseStyles.page, ...responsiveStyles.page}}>
      <p style={{...baseStyles.topText, ...responsiveStyles.topText}}>Get Mobile App</p>
      <h2 style={{...baseStyles.heading, ...responsiveStyles.heading}}>
        Ready for <span style={baseStyles.secure}>Secure</span> Calls?
      </h2>
      <p style={{...baseStyles.subtitle, ...responsiveStyles.subtitle}}>
        Get Started Today — Available For Instant Download On Both
        {windowWidth < 480 ? " " : <br />} iOS And Android Devices.
      </p>

      <div style={{...baseStyles.appButtons, ...responsiveStyles.appButtons}}>
        <img 
          src={appStoreImg} 
          alt="App Store" 
          style={{...baseStyles.appButton, ...responsiveStyles.appButton}}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
        <img 
          src={googlePlayImg} 
          alt="Google Play" 
          style={{...baseStyles.appButton, ...responsiveStyles.appButton}}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
      </div>

      <div style={{...baseStyles.phoneContainer, ...responsiveStyles.phoneContainer}}>
        <img
          style={{
            ...baseStyles.phoneImage, 
            ...baseStyles.phoneLeft, 
            ...responsiveStyles.phoneImage, 
            ...responsiveStyles.phoneLeft
          }}
          src={phone2Img}
          alt="Phone 1"
        />
        <img
          style={{
            ...baseStyles.phoneImage, 
            ...baseStyles.phoneCenter, 
            ...responsiveStyles.phoneImage, 
            ...responsiveStyles.phoneCenter
          }}
          src={phone1Img}
          alt="Phone 2"
        />
        <img
          style={{
            ...baseStyles.phoneImage, 
            ...baseStyles.phoneRight, 
            ...responsiveStyles.phoneImage, 
            ...responsiveStyles.phoneRight
          }}
          src={phone3Img}
          alt="Phone 3"
        />
      </div>
    </section>
  );
}

export default Mobile;
