import React, { useState, useEffect } from 'react';

const HowItWorks = () => {
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
    // Small mobile styles (under 480px)
    if (windowWidth < 480) {
      return {
        container: {
          padding: '30px 15px',
        },
        subheading: {
          fontSize: '12px',
          marginBottom: '8px',
        },
        heading: {
          fontSize: '22px',
          marginBottom: '25px',
          lineHeight: '1.3',
        },
        stepsWrapper: {
          maxWidth: '100%',
        },
        stepsContainer: {
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
        },
        stepItem: {
          marginBottom: '30px',
          width: '100%',
          maxWidth: '250px',
        },
        stepContent: {
          padding: '0 5px',
        },
        connector: {
          display: 'none',
        },
        circle: {
          width: '60px',
          height: '60px',
          fontSize: '24px',
          marginBottom: '15px',
        },
        stepTitle: {
          fontSize: '14px',
          marginBottom: '8px',
        },
        stepDesc: {
          fontSize: '12px',
          lineHeight: '1.4',
        },
      };
    }
    
    // Mobile styles (480px - 768px)
    if (windowWidth >= 480 && windowWidth < 768) {
      return {
        container: {
          padding: '40px 15px',
        },
        subheading: {
          fontSize: '13px',
        },
        heading: {
          fontSize: '24px',
          marginBottom: '30px',
        },
        stepsContainer: {
          flexDirection: 'column',
          alignItems: 'center',
        },
        stepItem: {
          marginBottom: '40px',
          width: '100%',
          maxWidth: '280px',
        },
        connector: {
          display: 'none',
        },
        circle: {
          width: '70px',
          height: '70px',
          fontSize: '28px',
        },
        stepTitle: {
          fontSize: '15px',
        },
        stepDesc: {
          fontSize: '13px',
        },
      };
    }
    
    // Small tablet styles (768px - 900px)
    if (windowWidth >= 768 && windowWidth < 900) {
      return {
        container: {
          padding: '50px 20px',
        },
        heading: {
          fontSize: '26px',
        },
        stepsContainer: {
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '20px',
        },
        stepItem: {
          flex: '0 0 auto',
          width: '45%',
          marginBottom: '30px',
          position: 'relative',
        },
        connector: {
          display: 'none',
        },
      };
    }
    
    // Tablet styles (900px - 1024px)
    if (windowWidth >= 900 && windowWidth < 1024) {
      return {
        container: {
          padding: '50px 20px',
        },
        heading: {
          fontSize: '26px',
        },
        stepsContainer: {
          flexWrap: 'nowrap',
          justifyContent: 'center',
          gap: '10px',
        },
        stepItem: {
          flex: '1',
          position: 'relative',
        },
        connector: {
          right: '-30px',
          width: '60px',
        },
        stepContent: {
          padding: '0 5px',
        },
      };
    }
    
    // Default styles (desktop)
    return {
      container: {},
      subheading: {},
      heading: {},
      stepsWrapper: {},
      stepsContainer: {},
      stepItem: {},
      stepContent: {},
      connector: {},
      circle: {},
      stepTitle: {},
      stepDesc: {},
    };
  };

  const responsiveStyles = getResponsiveStyles();

  return (
    <section id="how-it-works" style={{...styles.container, ...responsiveStyles.container}}>
      <p style={{...styles.subheading, ...responsiveStyles.subheading}}>HOW IT WORKS</p>
      <h2 style={{...styles.heading, ...responsiveStyles.heading}}>
        Get Started With 3 Easy Steps to <br /> Secure Calling
      </h2>

      <div style={{...styles.stepsWrapper, ...responsiveStyles.stepsWrapper}}>
        <div style={{...styles.stepsContainer, ...responsiveStyles.stepsContainer}}>
          {steps.map((step, index) => (
            <div key={index} style={{...styles.stepItem, ...responsiveStyles.stepItem}}>
              <div style={{...styles.stepContent, ...responsiveStyles.stepContent}}>
                <div style={{...styles.circle, ...responsiveStyles.circle}}>{index + 1}</div>
                <h3 style={{...styles.stepTitle, ...responsiveStyles.stepTitle}}>{step.title}</h3>
                <p style={{...styles.stepDesc, ...responsiveStyles.stepDesc}}>{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div style={{...styles.connector, ...responsiveStyles.connector}}>
                  <div style={styles.dottedLine}></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const steps = [
  {
    title: 'Enter Your Number',
    description: 'Register with your mobile number to receive a verification code',
  },
  {
    title: 'Verify OTP',
    description: 'Enter the 5-digit code sent to your phone',
  },
  {
    title: 'Start Calling',
    description: 'Connect with contacts or groups instantly',
  },
];

const styles = {
  container: {
    padding: '60px 20px',
    textAlign: 'center',
    backgroundColor: '#FFFFFF',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    boxSizing: 'border-box',
  },
  subheading: {
    color: '#ff3e00',
    fontWeight: 'bold',
    fontSize: '14px',
    marginBottom: '10px',
    textAlign: 'center',
    width: '100%',
  },
  heading: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '40px',
    lineHeight: '1.5',
    textAlign: 'center',
    width: '100%',
  },
  stepsWrapper: {
    width: '100%',
    maxWidth: '900px',
    display: 'flex',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  stepsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    flexWrap: 'nowrap',
  },
  stepItem: {
    display: 'flex',
    alignItems: 'center',
    flex: '1',
    position: 'relative',
    minWidth: '0',
  },
  stepContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    padding: '0 10px',
    textAlign: 'center',
  },
  connector: {
    position: 'absolute',
    top: '40px',
    right: '-60px',
    width: '120px',
    zIndex: 1,
  },
  dottedLine: {
    width: '100%',
    height: '3px',
    borderTop: '3px dashed #ff3e00',
  },
  circle: {
    background: 'linear-gradient(135deg, #ff3e00, #ff6a00)',
    color: '#fff',
    width: '80px',
    height: '80px',
    fontSize: '32px',
    fontWeight: 'bold',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
    position: 'relative',
    zIndex: 2,
  },
  stepTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  stepDesc: {
    fontSize: '14px',
    color: '#666',
    maxWidth: '100%',
    wordWrap: 'break-word',
  },
};

export default HowItWorks;