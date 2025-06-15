import React, { useState, useEffect } from 'react';
import logoImg from '../assets/logo.png';

const Navbar = () => {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [isDownloadHovered, setIsDownloadHovered] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  // Update window width when resized
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Handle smooth scrolling
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      if (windowWidth <= 768) {
        setIsMobileMenuOpen(false);
      }
    }
  };
  
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
        setActiveSection('howItWorks');
      } else {
        setActiveSection('testimonials');
      }
    };
    
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
      };
    }
    
    // Tablet styles (768px - 1024px)
    if (windowWidth > 768 && windowWidth <= 1024) {
      return {
        container: {
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
      };
    }
    
    // Default styles (desktop)
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
      </div>
    </header>
  );
};

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

export default Navbar;