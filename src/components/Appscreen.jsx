import React from "react";
import appScreenImg from "../assets/app_screen_img.png";

function AppScreens() {
  const styles = {
    section: {
     
      padding: "60px 20px",
      textAlign: "center",
      maxWidth: "1200px",
      margin: "0 auto",
    },
    subheading: {
       background: "linear-gradient(135deg, #ff3e00, #ff6a00)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      fontSize: "16px",
      fontWeight: "500",
      display: "block",
      marginBottom: "10px",
    },
    heading: {
      
      fontSize: "48px",
      fontWeight: "700",
      marginBottom: "12px",
    },
    headingSpan: {
       background: "linear-gradient(135deg, #ff3e00, #ff6a00)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    paragraph: {
      color: "#6b7280",
      fontSize: "18px",
      maxWidth: "600px",
      margin: "0 auto 40px",
      lineHeight: "1.6",
    },
    screenshotContainer: {
      display: "flex",
      justifyContent: "center",
      margin: "30px 0",
    },
    screenshot: {
      width: "auto",
      maxWidth: "80%",
      height: "auto",
      borderRadius: "10px",
    },
    indicators: {
      display: "flex",
      justifyContent: "center",
      gap: "8px",
      marginTop: "30px",
    },
    dot: (active) => ({
      width: "10px",
      height: "10px",
      borderRadius: "50%",
      backgroundColor: active ? "#f97316" : "#d1d5db",
      transition: "background-color 0.3s ease",
      cursor: "pointer",
    }),
  };

  return (
    <div style={styles.section}>
      <span style={styles.subheading}>APP SCREENS</span>
      <h2 style={styles.heading}>
        See It In <span style={styles.headingSpan}>Action</span>
      </h2>
      <p style={styles.paragraph}>
        Explore real screenshots showcasing OTP verification, call history, and
        location settings — a closer look at the smart features built for your
        security and convenience.
      </p>
      
      <div style={styles.screenshotContainer} className="screenshot-container">
        <img style={styles.screenshot} src={appScreenImg} alt="App Screenshots" />
      </div>
      
      <div style={styles.indicators}>
        <div style={styles.dot(false)}></div>
        <div style={styles.dot(false)}></div>
        <div style={styles.dot(true)}></div>
        <div style={styles.dot(false)}></div>
      </div>
    </div>
    
  );
}

export default AppScreens;
