import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
=======
import { Link } from 'react-router-dom';
>>>>>>> 25f51a8b3cf6ee60bea71a8be20834b96f2addcd
import logoImg from '../assets/logo.png';

const Navbar = () => {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [isDownloadHovered, setIsDownloadHovered] = useState(false);
<<<<<<< HEAD
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
=======
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

>>>>>>> 25f51a8b3cf6ee60bea71a8be20834b96f2addcd
  // Update window width when resized
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };
<<<<<<< HEAD
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Handle smooth scrolling
=======

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

>>>>>>> 25f51a8b3cf6ee60bea71a8be20834b96f2addcd
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      if (windowWidth <= 768) {
        setIsMobileMenuOpen(false);
      }
    }
  };
<<<<<<< HEAD
  
  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Get all sections
      const homeSection = document.getElementById('home');
      const featuresSection = document.getElementById('features');
      const howItWorksSection = document.getElementById('how-it-works');
      const testimonialsSection = document.getElementById('testimonials');
      
      // Get positions
      const homeSectionTop = homeSection?.offsetTop || 0;
      const featuresSectionTop = featuresSection?.offsetTop || 0;
      const howItWorksSectionTop = howItWorksSection?.offsetTop || 0;
      const testimonialsSectionTop = testimonialsSection?.offsetTop || 0;
      
      // Determine active section
      if (scrollPosition < featuresSectionTop - 100) {
        setActiveSection('home');
      } else if (scrollPosition < howItWorksSectionTop - 100) {
        setActiveSection('features');
      } else if (scrollPosition < testimonialsSectionTop - 100) {
=======

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
>>>>>>> 25f51a8b3cf6ee60bea71a8be20834b96f2addcd
        setActiveSection('howItWorks');
      } else {
        setActiveSection('testimonials');
      }
    };
<<<<<<< HEAD
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const getNavLinkStyle = (linkName) => {
    const isHovered = hoveredLink === linkName;
    const isActive = activeSection === linkName;
    
    return {
      ...styles.navLink,
      color: isHovered || isActive ? '#F73531' : '#333',
      borderBottom: isHovered || isActive ? '2px solid #F73531' : '2px solid transparent',
    };
  };
  
  // Get responsive styles based on window width
  const getResponsiveStyles = () => {
    // Small mobile styles (under 480px)
    if (windowWidth < 480) {
      return {
        container: {
          ...styles.container,
          padding: '0 15px',
        },
        nav: {
          ...styles.nav,
          position: 'fixed',
          top: isMobileMenuOpen ? '0' : '-100%',
          left: '0',
          width: '100%',
          height: 'auto',
          flexDirection: 'column',
          backgroundColor: '#FFFFFF',
          padding: '80px 20px 20px',
          transition: 'top 0.3s ease',
          zIndex: 90,
        },
        navLink: {
          ...styles.navLink,
          margin: '10px 0',
          fontSize: '16px',
          padding: '10px 0',
        },
        downloadBtn: {
          ...styles.downloadBtn,
          display: isMobileMenuOpen ? 'none' : 'block',
          fontSize: '14px',
          padding: '8px 16px',
        },
        hamburger: {
          display: 'block',
        },
        logoContainer: {
          ...styles.logoContainer,
          zIndex: 100,
        }
      };
    }
    
    // Mobile styles (480px - 768px)
    if (windowWidth >= 480 && windowWidth <= 768) {
      return {
        container: {
          ...styles.container,
          padding: '0 15px',
        },
        nav: {
          ...styles.nav,
          position: 'fixed',
          top: isMobileMenuOpen ? '0' : '-100%',
          left: '0',
          width: '100%',
          height: 'auto',
          flexDirection: 'column',
          backgroundColor: '#FFFFFF',
          padding: '80px 20px 20px',
          transition: 'top 0.3s ease',
          zIndex: 90,
        },
        navLink: {
          ...styles.navLink,
          margin: '10px 0',
          fontSize: '18px',
          padding: '10px 0',
        },
        downloadBtn: {
          ...styles.downloadBtn,
          display: isMobileMenuOpen ? 'none' : 'block',
        },
        hamburger: {
          display: 'block',
        },
        logoContainer: {
          ...styles.logoContainer,
          zIndex: 100,
        }
=======

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
>>>>>>> 25f51a8b3cf6ee60bea71a8be20834b96f2addcd
      };
    }
    
    // Tablet styles (768px - 1024px)
    if (windowWidth > 768 && windowWidth <= 1024) {
      return {
        container: {
<<<<<<< HEAD
          ...styles.container,
        },
        nav: {
          ...styles.nav,
          gap: '15px',
          fontSize: '14px',
        },
        navLink: {
          ...styles.navLink,
          fontSize: '14px',
        },
        downloadBtn: {
          ...styles.downloadBtn,
          fontSize: '14px',
          padding: '8px 16px',
        },
        hamburger: {
          display: 'none',
        },
        logoContainer: {}
=======
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
>>>>>>> 25f51a8b3cf6ee60bea71a8be20834b96f2addcd
      };
    }
    
    // Default styles (desktop)
<<<<<<< HEAD
    return {
      container: {},
      nav: {},
      navLink: {},
      downloadBtn: {},
      hamburger: {
        display: 'none',
      },
      logoContainer: {}
    };
  };
  
  const responsiveStyles = getResponsiveStyles();
  
  return (
    <header style={styles.navbar}>
      <div style={{...styles.container, ...responsiveStyles.container}}>
        <div style={{...styles.logoContainer, ...responsiveStyles.logoContainer}}>
          <img src={logoImg} alt="Logo" style={styles.logoImage} />
        </div>
        
        {/* Hamburger Menu Button */}
        <div 
          style={{...styles.hamburger, ...responsiveStyles.hamburger}} 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div style={{
            ...styles.hamburgerLine,
            transform: isMobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'
          }}></div>
          <div style={{
            ...styles.hamburgerLine,
            opacity: isMobileMenuOpen ? 0 : 1
          }}></div>
          <div style={{
            ...styles.hamburgerLine,
            transform: isMobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none'
          }}></div>
        </div>
        
        <nav style={{...styles.nav, ...responsiveStyles.nav}}>
          <a 
            href="#home" 
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
            style={{...getNavLinkStyle('home'), ...responsiveStyles.navLink}}
            onMouseEnter={() => setHoveredLink('home')}
            onMouseLeave={() => setHoveredLink(null)}
          >
            Home
          </a>
          <a 
            href="#features" 
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('features');
            }}
            style={{...getNavLinkStyle('features'), ...responsiveStyles.navLink}}
            onMouseEnter={() => setHoveredLink('features')}
            onMouseLeave={() => setHoveredLink(null)}
          >
            Features
          </a>
          <a 
            href="#how-it-works" 
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('how-it-works');
            }}
            style={{...getNavLinkStyle('howItWorks'), ...responsiveStyles.navLink}}
            onMouseEnter={() => setHoveredLink('howItWorks')}
            onMouseLeave={() => setHoveredLink(null)}
          >
            How It Works
          </a>
          <a 
            href="#testimonials" 
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('testimonials');
            }}
            style={{...getNavLinkStyle('testimonials'), ...responsiveStyles.navLink}}
            onMouseEnter={() => setHoveredLink('testimonials')}
            onMouseLeave={() => setHoveredLink(null)}
          >
            Testimonials
          </a>
        </nav>
        
        <a 
          href="https://play.google.com/store" 
          target="_blank"
          rel="noopener noreferrer"
          style={{
            ...styles.downloadBtn,
            ...responsiveStyles.downloadBtn,
            background: isDownloadHovered ?  'linear-gradient(90deg, #F73531 0%, #FF6B00 98.5%)':"#FFFFFF",
            color: isDownloadHovered ?  '#fff':'black',
            border: isDownloadHovered ?  '2px solid transparent':'2px solid #F73531' ,
            transform: isDownloadHovered ? 'translateY(-3px)' : 'translateY(0)',
            boxShadow: isDownloadHovered 
              ? '0 8px 20px rgba(247, 53, 49, 0.3)' 
              : '0 4px 10px rgba(247, 53, 49, 0.2)',
          }}
          onMouseEnter={() => setIsDownloadHovered(true)}
          onMouseLeave={() => setIsDownloadHovered(false)}
        >
          Download App
        </a>
=======
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
>>>>>>> 25f51a8b3cf6ee60bea71a8be20834b96f2addcd
      </div>
    </header>
  );
};

<<<<<<< HEAD
const styles = {
  navbar: {
    width: '100%',
    padding: '15px 0',
    backgroundColor: '#FFFFFF',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '20px',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logoImage: {
    height: '40px',
    width: 'auto',
  },
  nav: {
    display: 'flex',
    gap: '30px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  navLink: {
    color: '#333',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '16px',
    transition: 'color 0.2s ease',
    position: 'relative',
    padding: '5px 0',
  },
  downloadBtn: {
    padding: '10px 20px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    border: '2px solid transparent',
  },
  // Hamburger menu styles
  hamburger: {
    display: 'none', // Hidden by default, shown in mobile view
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '30px',
    height: '21px',
    cursor: 'pointer',
    zIndex: 100,
  },
  hamburgerLine: {
    width: '100%',
    height: '3px',
    backgroundColor: '#F73531',
    borderRadius: '10px',
    transition: 'all 0.3s ease',
  },
};

=======
>>>>>>> 25f51a8b3cf6ee60bea71a8be20834b96f2addcd
export default Navbar;