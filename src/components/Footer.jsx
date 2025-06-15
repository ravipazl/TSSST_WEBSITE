import React, { useState, useEffect } from "react";
import tessstLogo from "../assets/tessst.png";
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
    },
    inputWrapper: {
      display: "flex",
      border: "1px solid #ddd",
      borderRadius: "30px",
      overflow: "hidden",
      width: "fit-content",
      ...responsiveStyles.inputWrapper
    },
    input: {
      color: "#333",
      border: "none",
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
    },
    link: {
      color: "#222222",
      textDecoration: "none",
      display: "block",
      marginBottom: "8px",
      fontSize: "16px",
      fontWeight: "400",
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
    <div id="footer">
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

        {/* Right Section */}
        <div style={styles.linksSection}>
          <div style={styles.column}>
            <div style={styles.heading}>Quick Links</div>
            <a href="#home" style={styles.link}>Home</a>
            <a href="#features" style={styles.link}>Features</a>
            <a href="#how-it-works" style={styles.link}>How it Works</a>
            <a href="#testimonials" style={styles.link}>Testimonials</a>
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