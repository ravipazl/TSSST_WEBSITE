import React, { useState, useEffect } from "react";
import tessstLogo from "../assets/tessst.png";
<<<<<<< HEAD
<<<<<<< HEAD
import buttonImg from "../assets/Button_img.png";
import frame8 from "../assets/frame 8.png";
import frame9 from "../assets/frame 9.png";
import frame10 from "../assets/frame 10.png";
import frame11 from "../assets/frame 11.png";

function Footer() {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get responsive styles based on window width
  const getResponsiveStyles = () => {
    // Mobile styles (under 480px - small phones)
    if (windowWidth < 480) {
      return {
        container: {
          padding: "30px 15px",
          flexDirection: "column",
        },
        left: {
          marginLeft: "0",
          marginBottom: "30px",
          width: "100%",
        },
        inputWrapper: {
          width: "100%",
          flexDirection: "column",
        },
        input: {
          width: "100%",
          boxSizing: "border-box",
        },
        button: {
          width: "100%",
          margin: "10px 0 0 0",
          borderRadius: "30px",
        },
        linksSection: {
          gap: "30px",
          justifyContent: "flex-start",
          width: "100%",
        },
        socialIcons: {
          justifyContent: "center",
        }
      };
    }
    
    // Mobile styles (480px - 768px)
    if (windowWidth >= 480 && windowWidth < 768) {
      return {
        container: {
          padding: "40px 20px",
          flexDirection: "column",
        },
        left: {
          marginLeft: "0",
          marginBottom: "30px",
          width: "100%",
        },
        inputWrapper: {
          width: "100%",
          maxWidth: "400px",
        },
        linksSection: {
          gap: "40px",
          justifyContent: "space-between",
          width: "100%",
        },
      };
    }
    
    // Tablet styles (768px - 1024px)
    if (windowWidth >= 768 && windowWidth < 1024) {
      return {
        container: {
          padding: "50px 30px",
          flexDirection: "row",
        },
        left: {
          marginLeft: "20px",
          flex: "1 1 50%",
        },
        linksSection: {
          gap: "40px",
          marginRight: "20px",
          flex: "1 1 40%",
          justifyContent: "flex-end",
        },
      };
    }
    
    // Default styles (desktop)
    return {
      container: {
        flexDirection: "row",
      },
      left: {
        marginLeft: "100px",
      },
      inputWrapper: {
        flexDirection: "row",
      },
      input: {
        width: "200px",
      },
      linksSection: {
        gap: "80px",
        marginRight: "100px",
        justifyContent: "flex-end",
      },
    };
  };
  
  const responsiveStyles = getResponsiveStyles();
  
  const styles = {
    container: {
      /* backgroundColor removed */
      padding: "40px 20px",
      display: "flex",
      justifyContent: "space-between",
      fontFamily: "poppinsRegular",
      borderBottom: "1px solid #ddd",
      flexWrap: "wrap",
      ...responsiveStyles.container
    },
    left: {
      flex: "1",
      minWidth: "250px",
      ...responsiveStyles.left
    },
    logo: {
      width: "100px",
      height: "55px",
      marginBottom: "20px",
    },
    description: {
      fontSize: "16px",
      color: "#222222",
      fontWeight: "400",
      marginBottom: "20px",
      maxWidth: "350px",
=======
=======
>>>>>>> 25f51a8b3cf6ee60bea71a8be20834b96f2addcd
 
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
<<<<<<< HEAD
>>>>>>> 25f51a8b3cf6ee60bea71a8be20834b96f2addcd
=======
>>>>>>> 25f51a8b3cf6ee60bea71a8be20834b96f2addcd
    },
    inputWrapper: {
      display: "flex",
      border: "1px solid #ddd",
      borderRadius: "30px",
      overflow: "hidden",
      width: "fit-content",
<<<<<<< HEAD
<<<<<<< HEAD
      ...responsiveStyles.inputWrapper
=======
      flexDirection: isMobile ? "row" : "row",
>>>>>>> 25f51a8b3cf6ee60bea71a8be20834b96f2addcd
=======
      flexDirection: isMobile ? "row" : "row",
>>>>>>> 25f51a8b3cf6ee60bea71a8be20834b96f2addcd
    },
    input: {
      color: "#333",
      border: "none",
<<<<<<< HEAD
<<<<<<< HEAD
      padding: "10px 15px",
      outline: "none",
      ...responsiveStyles.input
    },
    button: {
      background: 'linear-gradient(135deg, #ff3e00, #ff6a00)',
      color: '#fff',
      padding: "10px 15px 10px 15px",
      border: "none",
      cursor: "pointer",
      margin: '5px 13px 3px 3px',
      borderRadius: "5px",
      ...responsiveStyles.button
    },
    socialIcons: {
      display: "flex",
      gap: "20px",
      marginTop: "20px",
      flexWrap: "wrap",
      ...responsiveStyles.socialIcons
    },
    icon: {
      width: "32px",
      height: "32px",
      borderRadius: "50%",
      border: "1px solid #ccc",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    linksSection: {
      display: "flex",
      flexWrap: "wrap",
      ...responsiveStyles.linksSection
    },
    column: {
      minWidth: "150px",
    },
    heading: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#222222",
      marginBottom: "10px",
=======
=======
>>>>>>> 25f51a8b3cf6ee60bea71a8be20834b96f2addcd
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
<<<<<<< HEAD
>>>>>>> 25f51a8b3cf6ee60bea71a8be20834b96f2addcd
=======
>>>>>>> 25f51a8b3cf6ee60bea71a8be20834b96f2addcd
    },
    link: {
      color: "#222222",
      textDecoration: "none",
      display: "block",
<<<<<<< HEAD
<<<<<<< HEAD
      marginBottom: "8px",
      fontSize: "16px",
      fontWeight: "400",
=======
=======
>>>>>>> 25f51a8b3cf6ee60bea71a8be20834b96f2addcd
      marginBottom: isSmallMobile ? "6px" : "8px",
      fontSize: isSmallMobile ? "14px" : "16px",
      fontWeight: "400",
      padding: isSmallMobile ? "2px 0" : "0", // Larger touch target for small screens
<<<<<<< HEAD
>>>>>>> 25f51a8b3cf6ee60bea71a8be20834b96f2addcd
=======
>>>>>>> 25f51a8b3cf6ee60bea71a8be20834b96f2addcd
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
<<<<<<< HEAD
<<<<<<< HEAD

  return (
    <div id="footer">
=======
 
  return (
    <div>
>>>>>>> 25f51a8b3cf6ee60bea71a8be20834b96f2addcd
=======
 
  return (
    <div>
>>>>>>> 25f51a8b3cf6ee60bea71a8be20834b96f2addcd
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
<<<<<<< HEAD
<<<<<<< HEAD
              <button style={styles.button}>Contact</button>
            </div>
          </div>
          <div style={styles.socialIcons}>
            <img style={styles.icon} src={frame8} alt="fb" />
            <img style={styles.icon} src={frame9} alt="tw" />
            <img style={styles.icon} src={frame10} alt="in" />
            <img style={styles.icon} src={frame11} alt="yt" />
          </div>
        </div>

=======
=======
>>>>>>> 25f51a8b3cf6ee60bea71a8be20834b96f2addcd
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
 
<<<<<<< HEAD
>>>>>>> 25f51a8b3cf6ee60bea71a8be20834b96f2addcd
=======
>>>>>>> 25f51a8b3cf6ee60bea71a8be20834b96f2addcd
        {/* Right Section */}
        <div style={styles.linksSection}>
          <div style={styles.column}>
            <div style={styles.heading}>Quick Links</div>
<<<<<<< HEAD
<<<<<<< HEAD
            <a href="#home" style={styles.link}>Home</a>
            <a href="#features" style={styles.link}>Features</a>
            <a href="#how-it-works" style={styles.link}>How it Works</a>
            <a href="#testimonials" style={styles.link}>Testimonials</a>
=======
=======
>>>>>>> 25f51a8b3cf6ee60bea71a8be20834b96f2addcd
            <a href="#" style={styles.link}>Home</a>
            <a href="#" style={styles.link}>Features</a>
            <a href="#" style={styles.link}>How it Works</a>
            <a href="#" style={styles.link}>Testimonials</a>
<<<<<<< HEAD
>>>>>>> 25f51a8b3cf6ee60bea71a8be20834b96f2addcd
=======
>>>>>>> 25f51a8b3cf6ee60bea71a8be20834b96f2addcd
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
<<<<<<< HEAD
<<<<<<< HEAD

=======
 
>>>>>>> 25f51a8b3cf6ee60bea71a8be20834b96f2addcd
=======
 
>>>>>>> 25f51a8b3cf6ee60bea71a8be20834b96f2addcd
export default Footer;