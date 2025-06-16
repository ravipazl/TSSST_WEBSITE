import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/logo.png';

const Navbar = () => {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [isDownloadHovered, setIsDownloadHovered] = useState(false);
  const [isLoginHovered, setIsLoginHovered] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [isIOS, setIsIOS] = useState(false);
  
  // Detect iOS device on component mount
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isIOSDevice = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
    setIsIOS(isIOSDevice);
  }, []);

  // Update window width when resized
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

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

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      if (windowWidth <= 768) {
        setIsMobileMenuOpen(false);
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sections = {
        home: document.getElementById('home'),
        features: document.getElementById('features'),
        howItWorks: document.getElementById('how-it-works'),
        testimonials: document.getElementById('testimonials'),
      };

      const positions = Object.fromEntries(
        Object.entries(sections).map(([key, el]) => [key, el?.offsetTop || 0])
      );

      if (scrollPosition < positions.features - 100) {
        setActiveSection('home');
      } else if (scrollPosition < positions.howItWorks - 100) {
        setActiveSection('features');
      } else if (scrollPosition < positions.testimonials - 100) {
        setActiveSection('howItWorks');
      } else {
        setActiveSection('testimonials');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (windowWidth <= 768) {
      document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen, windowWidth]);

  // Base styles
  const baseStyles = {
    navbar: {
      width: '100%',
      padding: windowWidth < 360 ? '10px 0' : '15px 0',
      backgroundColor: '#FFFFFF',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    logoContainer: {
      flexShrink: 0,
    },
    logoImage: {
      height: '40px',
      width: 'auto',
    },
    nav: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
    },
    navLink: {
      fontSize: '16px',
      fontWeight: '500',
      textDecoration: 'none',
      borderBottom: '2px solid transparent',
      transition: 'all 0.3s ease',
      padding: '5px 0',
    },
    downloadBtn: {
      padding: '10px 20px',
      fontSize: '14px',
      fontWeight: 'bold',
      borderRadius: '6px',
      textDecoration: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    loginBtn: {
      padding: '10px 20px',
      fontSize: '14px',
      fontWeight: 'bold',
      borderRadius: '6px',
      textDecoration: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      background: 'transparent',
    },
    hamburger: {
      display: 'none',
      flexDirection: 'column',
      cursor: 'pointer',
      gap: '5px',
      zIndex: 110,
      padding: '8px', // Larger touch target
    },
    hamburgerLine: {
      width: windowWidth < 360 ? '22px' : '25px',
      height: '3px',
      backgroundColor: '#333',
      transition: 'all 0.3s ease',
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      zIndex: 90,
    },
    mobileMenuClose: {
      position: 'absolute',
      top: windowWidth < 360 ? '15px' : '20px',
      right: windowWidth < 360 ? '15px' : '20px',
      fontSize: windowWidth < 360 ? '24px' : '28px',
      fontWeight: 'bold',
      color: '#F73531',
      cursor: 'pointer',
      zIndex: 110,
      padding: '5px 10px', // Larger touch target
    },
    mobileNavContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      padding: '60px 0 30px',
    },
    mobileNavLink: {
      width: '80%',
      textAlign: 'center',
      padding: '12px 0',
      margin: '5px 0',
      fontSize: '18px',
      fontWeight: '500',
      borderRadius: '6px',
      transition: 'all 0.3s ease',
    },
    mobileDownloadBtn: {
      marginTop: '20px',
      padding: '12px 24px',
      width: '80%',
      textAlign: 'center',
      fontSize: '16px',
      fontWeight: 'bold',
      borderRadius: '6px',
      background: 'linear-gradient(90deg, #F73531 0%, #FF6B00 98.5%)',
      color: '#fff',
      textDecoration: 'none',
    },
    mobileLoginBtn: {
      marginTop: '20px',
      padding: '12px 24px',
      width: '80%',
      textAlign: 'center',
      fontSize: '16px',
      fontWeight: 'bold',
      borderRadius: '6px',
      background: 'transparent',
      color: '#333',
      textDecoration: 'none',
      border: '2px solid #ddd',
    },
  };

  // Get responsive styles based on window width
  const getResponsiveStyles = () => {
    // Mobile styles (under 768px)
    if (windowWidth <= 768) {
      return {
        container: {
          padding: windowWidth < 360 ? '0 8px' : windowWidth < 480 ? '0 12px' : '0 15px',
        },
        nav: {
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          flexDirection: 'column',
          backgroundColor: '#FFFFFF',
          justifyContent: 'flex-start',
          alignItems: 'center',
          transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.3s ease',
          zIndex: 100,
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          overflowY: 'auto',
        },
        hamburger: {
          display: 'flex',
        },
        logoContainer: {
          zIndex: 110,
        },
        downloadBtn: {
          display: isMobileMenuOpen ? 'none' : 'block',
          padding: windowWidth < 360 ? '8px 12px' : '8px 16px',
          fontSize: windowWidth < 360 ? '13px' : '14px',
        },
        loginBtn: {
          display: isMobileMenuOpen ? 'none' : 'block',
          padding: windowWidth < 360 ? '8px 12px' : '8px 16px',
          fontSize: windowWidth < 360 ? '13px' : '14px',
        },
      };
    }
    
    // Tablet styles (768px - 1024px)
    if (windowWidth > 768 && windowWidth <= 1024) {
      return {
        container: {
          padding: '0 20px',
        },
        nav: {
          gap: '15px',
        },
        navLink: {
          fontSize: '15px',
        },
        downloadBtn: {
          padding: '8px 16px',
          fontSize: '14px',
        },
        loginBtn: {
          padding: '8px 16px',
          fontSize: '14px',
        },
      };
    }
    
    // Default styles (desktop)
    return {};
  };

  const responsiveStyles = getResponsiveStyles();
  
  const getNavLinkStyle = (linkName) => {
    const isHovered = hoveredLink === linkName;
    const isActive = activeSection === linkName;
    
    // Base style for all screen sizes
    const linkStyle = {
      ...baseStyles.navLink,
      color: isHovered || isActive ? '#F73531' : '#333',
      borderBottom: isHovered || isActive ? '2px solid #F73531' : '2px solid transparent',
    };
    
    // Mobile specific styles
    if (windowWidth <= 768) {
      return {
        ...linkStyle,
        width: '80%',
        textAlign: 'center',
        padding: '12px 0',
        margin: '5px 0',
        fontSize: '18px',
        borderBottom: '2px solid transparent',
        backgroundColor: isHovered || isActive ? 'rgba(247, 53, 49, 0.1)' : 'transparent',
        borderRadius: '6px',
      };
    }
    
    return linkStyle;
  };

  return (
    <header style={{...baseStyles.navbar}}>
      <div style={{...baseStyles.container, ...responsiveStyles.container}}>
        <div style={{...baseStyles.logoContainer, ...responsiveStyles.logoContainer}}>
          <img src={logoImg} alt="Logo" style={baseStyles.logoImage} />
        </div>

        {!isMobileMenuOpen && (
          <div
            style={{...baseStyles.hamburger, ...responsiveStyles.hamburger}}
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setIsMobileMenuOpen(true);
              }
            }}
          >
            <div style={baseStyles.hamburgerLine} />
            <div style={baseStyles.hamburgerLine} />
            <div style={baseStyles.hamburgerLine} />
          </div>
        )}

        {isMobileMenuOpen && windowWidth <= 768 && (
          <div
            style={baseStyles.overlay}
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        <nav style={{...baseStyles.nav, ...responsiveStyles.nav}}>
          {windowWidth <= 768 && (
            <div 
              style={baseStyles.mobileMenuClose}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ×
            </div>
          )}
          
          <div style={windowWidth <= 768 ? baseStyles.mobileNavContainer : { display: 'flex', gap: '20px' }}>
            {['home', 'features', 'howItWorks', 'testimonials'].map((section) => (
              <a
                key={section}
                href={`#${section === 'howItWorks' ? 'how-it-works' : section}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(section === 'howItWorks' ? 'how-it-works' : section);
                }}
                style={getNavLinkStyle(section)}
                onMouseEnter={() => setHoveredLink(section)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {section === 'howItWorks'
                  ? 'How It Works'
                  : section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ))}
            
            {/* Show buttons inside mobile menu */}
            {windowWidth <= 768 && (
              <>

                <a
                  href={isIOS 
                    ? "https://apps.apple.com/us/app/tssst/id6745514901"
                    : "https://play.google.com/store/apps/details?id=com.pazl.buzzApp"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  style={baseStyles.mobileDownloadBtn}
                >
                  Download App
                </a>
                
                <Link
                  to="/login"
                  style={{
                    ...baseStyles.mobileLoginBtn,
                    border: '2px solid #F73531',
                    color: '#F73531',
                    marginTop: '10px',
                    textDecoration: 'none',
                    display: 'block',
                    textAlign: 'center'
                  }}
                >
                  Login
                </Link>
                
              </>
            )}
          </div>
        </nav>

        {/* Show buttons outside mobile menu on desktop */}
        {windowWidth > 768 && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <a
              href={isIOS 
                ? "https://apps.apple.com/us/app/tssst/id6745514901"
                : "https://play.google.com/store/apps/details?id=com.pazl.buzzApp"
              }
              target="_blank"
              rel="noopener noreferrer"
              style={{
                ...baseStyles.downloadBtn,
                ...responsiveStyles.downloadBtn,
                background: isDownloadHovered
                  ? 'linear-gradient(90deg, #F73531 0%, #FF6B00 98.5%)'
                  : 'linear-gradient(90deg, #F73531 0%, #FF6B00 98.5%)',
                color: isDownloadHovered ? '#fff' : '#fff',
                border: isDownloadHovered ? '2px solid transparent' : '2px solid #F73531',
                transform: isDownloadHovered ? 'translateY(-2px)' : 'translateY(0)',
                boxShadow: isDownloadHovered
                  ? '0 6px 15px rgba(247, 53, 49, 0.25)'
                  : '0 4px 10px rgba(247, 53, 49, 0.15)',
                marginRight: '10px'
              }}
              onMouseEnter={() => setIsDownloadHovered(true)}
              onMouseLeave={() => setIsDownloadHovered(false)}
            >
              Download App
            </a>
            <Link
              to="/login"
              style={{
                ...baseStyles.loginBtn,
                ...responsiveStyles.loginBtn,
                color: isLoginHovered ? '#F73531' : '#333',
                border: isLoginHovered ? '2px solid #F73531' : '2px solid #ddd',
                transform: isLoginHovered ? 'translateY(-2px)' : 'translateY(0)',
                boxShadow: isLoginHovered
                  ? '0 4px 10px rgba(0, 0, 0, 0.1)'
                  : 'none',
                textDecoration: 'none',
              }}
              onMouseEnter={() => setIsLoginHovered(true)}
              onMouseLeave={() => setIsLoginHovered(false)}
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;