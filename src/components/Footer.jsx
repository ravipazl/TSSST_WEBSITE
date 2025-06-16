import React, { useState, useEffect } from "react";
import tessstLogo from "../assets/tessst.png";
 
import { FaXTwitter } from "react-icons/fa6";
import { SlSocialLinkedin } from "react-icons/sl";
import { FaInstagram } from "react-icons/fa6";
import { SlSocialYoutube } from "react-icons/sl";
import { LuRadius } from "react-icons/lu";
 
function Footer() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [hoveredButton, setHoveredButton] = useState(null);
 
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  const isMobile = windowWidth <= 768;
  const isSmallMobile = windowWidth < 480;
 
  const styles = {
    container: {
      padding: isSmallMobile ? "30px 15px" : "40px 20px",
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      justifyContent: "space-between",
      borderBottom: "1px solid #ddd",
      flexWrap: "wrap",
    },
    left: {
      flex: "1",
      minWidth: isSmallMobile ? "200px" : "250px",
      marginLeft: isMobile ? "0" : windowWidth < 1024 ? "50px" : "100px",
      marginBottom: isMobile ? "30px" : "0",
    },
    logo: {
      width: isSmallMobile ? "80px" : "100px",
      height: "auto",
      marginBottom: isSmallMobile ? "15px" : "20px",
    },
    description: {
      fontSize: isSmallMobile ? "14px" : "16px",
      color: "#222222",
      fontWeight: "400",
      marginBottom: isSmallMobile ? "15px" : "20px",
      maxWidth: "350px",
      lineHeight: "1.5",
    },
    inputWrapper: {
      display: "flex",
      border: "1px solid #ddd",
      borderRadius: "30px",
      overflow: "hidden",
      width: "fit-content",
      flexDirection: isMobile ? "row" : "row",
    },
    input: {
      color: "#333",
      border: "none",
      padding: isSmallMobile ? "8px 12px" : "10px 15px",
      outline: "none",
      width: isMobile ? (isSmallMobile ? "120px" : "150px") : "200px",
      fontSize: isSmallMobile ? "14px" : "16px",
    },
    btnSecondary: {
      padding: isSmallMobile ? "5px 8px" : "5px 10px",
      margin: isSmallMobile ? "4px 6px" : "4px 10px",
      border: "2px solid #F73531",
      color: "black",
      borderRadius: "6px",
      textDecoration: "none",
      fontWeight: "bold",
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer",
      fontSize: isSmallMobile ? "14px" : "16px",
      minHeight: "36px", // Ensure minimum touch target height
    },
    socialIcons: {
      display: "flex",
      gap: isSmallMobile ? "15px" : "20px",
      marginTop: "20px",
      flexWrap: "wrap",
    },
    icon: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: isSmallMobile ? "32px" : "36px",
      height: isSmallMobile ? "32px" : "36px",
      borderRadius: "50%",
      padding: "5px", // Larger touch target
    },
    linksSection: {
      display: "flex",
      gap: isSmallMobile ? "20px" : isMobile ? "40px" : windowWidth < 1024 ? "50px" : "80px",
      flexWrap: "wrap",
      marginRight: isMobile ? "0" : windowWidth < 1024 ? "50px" : "100px",
      justifyContent: isMobile ? "flex-start" : "flex-end",
    },
    column: {
      minWidth: isSmallMobile ? "120px" : "150px",
    },
    heading: {
      fontSize: isSmallMobile ? "15px" : "16px",
      fontWeight: "600",
      color: "#222222",
      marginBottom: isSmallMobile ? "8px" : "10px",
    },
    link: {
      color: "#222222",
      textDecoration: "none",
      display: "block",
      marginBottom: isSmallMobile ? "6px" : "8px",
      fontSize: isSmallMobile ? "14px" : "16px",
      fontWeight: "400",
      padding: isSmallMobile ? "2px 0" : "0", // Larger touch target for small screens
    },
    copyright: {
      textAlign: "center",
      fontWeight: "400",
      fontSize: "14px",
      color: "#222222",
      marginTop: "30px",
      paddingBottom: "20px",
    },
  };
 
  return (
    <div>
      <div style={styles.container}>
        {/* Left Section */}
        <div style={styles.left}>
          <img style={styles.logo} src={tessstLogo} alt="Logo" />
          <p style={styles.description}>
            Join our newsletter for secure calling tips, the latest updates on
            encryption technology, and smart location-sharing features.
          </p>
          <div style={styles.inputWrapper}>
            <input type="email" placeholder="Enter your email" style={styles.input} />
            <div>
              <a
                href="#how-it-works"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  ...styles.btnSecondary,
                  background: hoveredButton === 'contact' ? 'linear-gradient(90deg, #F73531 0%, #FF6B00 98.5%)' : 'linear-gradient(90deg, #F73531 0%, #FF6B00 98.5%)',
                  color: hoveredButton === 'contact' ? '#fff' : '#fff',
                  border: hoveredButton === 'contact' ? '2px solid transparent' : '2px solid #F73531',
                }}
                onMouseEnter={() => setHoveredButton('contact')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                Contact
              </a>
            </div>
          </div>
          <div style={styles.socialIcons}>
            <span style={styles.icon}>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaXTwitter />
              </a>
            </span>
            <span style={styles.icon}>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <SlSocialLinkedin />
              </a>
            </span>
            <span style={styles.icon}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram style={{paddingTop:"5px",fontSize:"20px"}} />
              </a>
            </span>
            <span style={styles.icon}>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <SlSocialYoutube style={{paddingTop:"5px",fontSize:"20px"}} />
              </a>
            </span>
          </div>
 
 
        </div>
 
        {/* Right Section */}
        <div style={styles.linksSection}>
          <div style={styles.column}>
            <div style={styles.heading}>Quick Links</div>
            <a href="#" style={styles.link}>Home</a>
            <a href="#" style={styles.link}>Features</a>
            <a href="#" style={styles.link}>How it Works</a>
            <a href="#" style={styles.link}>Testimonials</a>
          </div>
          <div style={styles.column}>
            <div style={styles.heading}>Customer Support</div>
            <a href="#" style={styles.link}>Contact Us</a>
            <a href="#" style={styles.link}>Help Center</a>
            <a href="#" style={styles.link}>Terms of Service</a>
            <a href="#" style={styles.link}>Cookies Policy</a>
          </div>
        </div>
      </div>
      <div style={styles.copyright}>
        © 2025 TSSST. All Rights Reserved.
      </div>
    </div>
  );
}
 
export default Footer;