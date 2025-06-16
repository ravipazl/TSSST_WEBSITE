import React, { useState, useEffect } from 'react';
import vector from '../assets/Vector.svg';
import encryption from '../assets/Group 1388.svg';
import shield from '../assets/Group 1387.svg';
import location from '../assets/Group.svg';
const Features = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isReadMoreHovered, setIsReadMoreHovered] = useState(false);
  
  // Update window width when resized
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Responsive styles based on window width
  const getResponsiveStyles = () => {
    // Mobile styles (under 480px - small phones)
    if (windowWidth < 480) {
      return {
        container: {
          ...styles.container,
          padding: '30px 15px',
        },
        featuresWrapper: {
          ...styles.featuresWrapper,
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
        },
        textSection: {
          ...styles.textSection,
          maxWidth: '100%',
          textAlign: 'center',
          padding: '0 10px',
        },
        subheading: {
          ...styles.subheading,
          fontSize: '14px',
          marginBottom: '10px',
        },
        heading: {
          ...styles.heading,
          fontSize: '24px',
          marginBottom: '15px',
        },
        description: {
          ...styles.description,
          fontSize: '14px',
          marginBottom: '25px',
        },
        readMoreBtn: {
          ...styles.readMoreBtn,
          padding: '10px 20px',
          fontSize: '14px',
          width: '100%',
          maxWidth: '200px',
        },
        cardsGrid: {
          ...styles.cardsGrid,
          gridTemplateColumns: '1fr',
          gridTemplateRows: 'repeat(4, auto)',
          width: '100%',
          gap: '15px',
        },
        card: {
          ...styles.card,
          padding: '20px 15px',
        },
        cardTitle: {
          ...styles.cardTitle,
          fontSize: '18px',
          marginBottom: '10px',
        },
        cardText: {
          ...styles.cardText,
          fontSize: '14px',
        },
        icon: {
          ...styles.icon,
          width: '70px',
          height: '70px',
          marginBottom: '15px',
        },
        svgIcon: {
          ...styles.svgIcon,
          width: '28px',
          height: '28px',
        },
      };
    }
    
    // Mobile styles (480px - 768px)
    if (windowWidth >= 480 && windowWidth < 768) {
      return {
        container: {
          ...styles.container,
          padding: '40px 20px',
        },
        featuresWrapper: {
          ...styles.featuresWrapper,
          flexDirection: 'column',
          alignItems: 'center',
          gap: '30px',
        },
        textSection: {
          ...styles.textSection,
          maxWidth: '100%',
          textAlign: 'center',
        },
        heading: {
          ...styles.heading,
          fontSize: '28px',
        },
        cardsGrid: {
          ...styles.cardsGrid,
          gridTemplateColumns: 'repeat(2, 1fr)',
          gridTemplateRows: 'repeat(2, auto)',
          width: '100%',
          gap: '20px',
        },
        card: {
          ...styles.card,
          padding: '25px 15px',
        },
      };
    }
    
    // Tablet styles (768px - 1024px)
    if (windowWidth >= 768 && windowWidth < 1024) {
      return {
        container: {
          ...styles.container,
          padding: '50px 30px',
        },
        featuresWrapper: {
          ...styles.featuresWrapper,
          gap: '30px',
        },
        textSection: {
          ...styles.textSection,
          flex: '1 1 45%',
        },
        cardsGrid: {
          ...styles.cardsGrid,
          flex: '1 1 50%',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gridTemplateRows: 'repeat(2, 1fr)',
          gap: '20px',
        },
      };
    }
    
    // Default styles (desktop)
    return {
      container: {
        ...styles.container,
      },
      featuresWrapper: {
        ...styles.featuresWrapper,
      },
      textSection: {
        ...styles.textSection,
        flex: '1 1 40%',
      },
      cardsGrid: {
        ...styles.cardsGrid,
        flex: '1 1 55%',
      },
      subheading: {
        ...styles.subheading,
      },
      heading: {
        ...styles.heading,
      },
      description: {
        ...styles.description,
      },
      readMoreBtn: {
        ...styles.readMoreBtn,
      },
      card: {
        ...styles.card,
      },
      cardTitle: {
        ...styles.cardTitle,
      },
      cardText: {
        ...styles.cardText,
      },
      icon: {
        ...styles.icon,
      },
      svgIcon: {
        ...styles.svgIcon,
      },
    };
  };
  
  const responsiveStyles = getResponsiveStyles();
  
  return (
    <section id="features" style={{...styles.container, ...responsiveStyles.container}}>
      <div style={{...styles.featuresWrapper, ...responsiveStyles.featuresWrapper}}>
        <div id='overview' style={{...styles.textSection, ...responsiveStyles.textSection}}>
          <p style={{...styles.subheading, ...responsiveStyles.subheading}}>Why Choose TSSST</p>
          <h2 style={{...styles.heading, ...responsiveStyles.heading}}>
            Everything You Need <br /> For <span style={styles.highlight}>Secure</span> Calling
          </h2>
          <p style={{...styles.description, ...responsiveStyles.description}}>
            Experience crystal-clear conversations backed by powerful end-to-end encryption, seamless
            real-time location sharing, and complete privacy protection — everything you need for
            secure, reliable communication.
          </p>
          <a 
            href="#" 
            style={{
              ...styles.readMoreBtn,
              ...responsiveStyles.readMoreBtn,
              background: isReadMoreHovered ?  'linear-gradient(90deg, #F73531 0%, #FF6B00 98.5%)':'linear-gradient(90deg, #F73531 0%, #FF6B00 98.5%)' ,
              color: isReadMoreHovered ? '#fff' : '#fff',
              border: isReadMoreHovered ? '2px solid transparent' : '2px solid #F73531',
              transform: isReadMoreHovered ? 'translateY(-3px)' : 'translateY(0)',
              boxShadow: isReadMoreHovered 
                ? '0 8px 20px rgba(247, 53, 49, 0.3)' 
                : '0 4px 10px rgba(247, 53, 49, 0.2)',
            }}
            onMouseEnter={() => setIsReadMoreHovered(true)}
            onMouseLeave={() => setIsReadMoreHovered(false)}
          >
            Read More →
          </a>
        </div>

        <div id='features' style={{...styles.cardsGrid, ...responsiveStyles.cardsGrid}}>
          <div 
            style={{
              ...styles.card,
              ...responsiveStyles.card,
              ...(hoveredCard === 'otp' && styles.cardHovered)
            }}
            onMouseEnter={() => setHoveredCard('otp')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div style={{
              ...styles.icon,
              ...responsiveStyles.icon,
              ...(hoveredCard === 'otp' && styles.iconHovered)
            }}>
              <img 
                src={shield} 
                alt="OTP Security" 
                style={{
                  ...styles.svgIcon,
                  ...responsiveStyles.svgIcon,
                  ...(hoveredCard === 'otp' && styles.svgIconHovered)
                }} 
              />
            </div>
            <h3 style={{...styles.cardTitle, ...responsiveStyles.cardTitle}}>OTP Security</h3>
            <p style={{...styles.cardText, ...responsiveStyles.cardText}}>
              Protect your account with powerful OTP security, adding an extra layer of verification to ensure that only you can access and manage your sensitive information safely and securely.
            </p>
          </div>

          <div 
            style={{
              ...styles.card,
              ...responsiveStyles.card,
              ...(hoveredCard === 'location' && styles.cardHovered)
            }}
            onMouseEnter={() => setHoveredCard('location')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div style={{
              ...styles.icon,
              ...responsiveStyles.icon,
              ...(hoveredCard === 'location' && styles.iconHovered)
            }}>
              <img 
                src={location} 
                alt="Smart Location" 
                style={{
                  ...styles.svgIcon,
                  ...responsiveStyles.svgIcon,
                  ...(hoveredCard === 'location' && styles.svgIconHovered)
                }} 
              />
            </div>
            <h3 style={{...styles.cardTitle, ...responsiveStyles.cardTitle}}>Smart Location</h3>
            <p style={{...styles.cardText, ...responsiveStyles.cardText}}>
              Stay connected and secure with Smart Location, offering real-time location sharing and intelligent tracking to keep you and your loved ones safe, wherever you are.
            </p>
          </div>

          <div 
            style={{
              ...styles.card,
              ...responsiveStyles.card,
              ...(hoveredCard === 'call' && styles.cardHovered)
            }}
            onMouseEnter={() => setHoveredCard('call')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div style={{
              ...styles.icon,
              ...responsiveStyles.icon,
              ...(hoveredCard === 'call' && styles.iconHovered)
            }}>
              <img 
                src={vector} 
                alt="Call Management" 
                style={{
                  ...styles.svgIcon,
                  ...responsiveStyles.svgIcon,
                  ...(hoveredCard === 'call' && styles.svgIconHovered)
                }} 
              />
            </div>
            <h3 style={{...styles.cardTitle, ...responsiveStyles.cardTitle}}>Call Management</h3>
            <p style={{...styles.cardText, ...responsiveStyles.cardText}}>
              Take full control of your conversations with advanced Call Management, allowing you to organize, prioritize, and secure your calls for a smoother, more efficient communication experience.
            </p>
          </div>

          <div 
            style={{
              ...styles.card,
              ...responsiveStyles.card,
              ...(hoveredCard === 'encryption' && styles.cardHovered)
            }}
            onMouseEnter={() => setHoveredCard('encryption')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div style={{
              ...styles.icon,
              ...responsiveStyles.icon,
              ...(hoveredCard === 'encryption' && styles.iconHovered)
            }}>
              <img 
                src={encryption} 
                alt="Encryption" 
                style={{
                  ...styles.svgIcon,
                  ...responsiveStyles.svgIcon,
                  ...(hoveredCard === 'encryption' && styles.svgIconHovered)
                }} 
              />
            </div>
            <h3 style={{...styles.cardTitle, ...responsiveStyles.cardTitle}}>Encryption</h3>
            <p style={{...styles.cardText, ...responsiveStyles.cardText}}>
              Keep your data and conversations private with powerful encryption, ensuring every message and call stays secure and protected from unauthorized access.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const styles = {
  container: {
    padding: '80px 20px',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  cardHovered: {
    background: 'linear-gradient(135deg, #F73531, #FF6B00)',
    color: '#fff',
    transform: 'translateY(-8px)',
    boxShadow: '0 15px 30px rgba(247, 53, 49, 0.25)',
  },
  iconHovered: {
    background: '#FFFFFF',
    boxShadow: '0 8px 20px rgba(255, 255, 255, 0.4)',
  },
  svgIconHovered: {
    filter: 'invert(32%) sepia(93%) saturate(7408%) hue-rotate(356deg) brightness(97%) contrast(96%)',
    transform: 'scale(1.1)',
  },
  featuresWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: '60px',
    alignItems: 'flex-start',
    maxWidth: '1200px',
    width: '100%',
  },
  textSection: {
    flex: '1 1 40%',
    maxWidth: '500px',
    position: 'relative',
  },
  subheading: {
    color: '#F73531', // Updated to match Home component color
    fontWeight: 600,
    fontSize: '16px',
    marginBottom: '15px',
    letterSpacing: '0.5px',
  },
  heading: {
    fontSize: 'clamp(28px, 5vw, 36px)', // Responsive font size
    fontWeight: 'bold',
    marginBottom: '25px',
    lineHeight: '1.3',
  },
  highlight: {
    color: '#F73531', // Updated to match Home component color
  },
  description: {
    color: '#555',
    fontSize: '16px',
    lineHeight: '1.6',
    marginBottom: '35px',
  },
  readMoreBtn: {
    background: 'linear-gradient(90deg, #F73531 0%, #FF6B00 98.5%)', // Updated to match Home component gradient
    color: '#fff',
    padding: '12px 24px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: 'bold',
    display: 'inline-block',
    boxShadow: '0 4px 10px rgba(247, 53, 49, 0.2)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    border: '2px solid transparent',
  },
  cardsGrid: {
    flex: '1 1 55%',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridTemplateRows: 'repeat(2, 1fr)',
    gap: '25px',
  },
  card: {
    background: '#fff',
    borderRadius: '12px',
    padding: '30px 20px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
    transition: 'all 0.3s ease',
    border: '1px solid #f0f0f0',
    height: 'calc(100% - 10px)', // Adjust for consistent height
    margin: '5px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  icon: {
    fontSize: '32px',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #F73531, #FF6B00)',
    boxShadow: '0 4px 10px rgba(247, 53, 49, 0.3)',
    margin: '0 auto 20px auto',
    transition: 'all 0.3s ease',
  },
  svgIcon: {
    width: '32px',
    height: '32px',
    transition: 'all 0.3s ease',
    filter: 'brightness(0) invert(1)',
  },
  cardTitle: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '15px',
    textAlign: 'center',
  },
  cardText: {
    fontSize: '15px',
    lineHeight: '1.5',
    color: 'inherit',
    flex: '1',
    textAlign: 'center',
  },
};

export default Features;
