import React, { useState, useEffect } from "react";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
import img5 from "../assets/img5.jpg";
import img6 from "../assets/img6.jpg";

function Testimonials() {
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
  
  // Get responsive styles based on window width
  const getResponsiveStyles = () => {
    // Extra small mobile styles (under 480px)
    if (windowWidth < 480) {
      return {
        page: {
          margin: '20px 15px',
          padding: '0',
        },
        header: {
          textAlign: 'center',
        },
        subheading: {
          fontSize: '14px',
          textAlign: 'center',
        },
        heading: {
          fontSize: '28px',
          textAlign: 'center',
          margin: '0 0 20px 0',
        },
        grid: {
          flexDirection: 'column',
          gap: '15px',
          alignItems: 'center',
        },
        card: {
          width: '100%',
          maxWidth: '300px',
          marginTop: '15px',
          padding: '15px',
        },
        quote: {
          fontSize: '24px',
        },
        user: {
          marginTop: '15px',
        },
        avatar: {
          width: '40px',
          height: '40px',
        },
        name: {
          fontSize: '14px',
        },
        rating: {
          fontSize: '14px',
        },
      };
    }
    
    // Mobile styles (480px - 768px)
    if (windowWidth >= 480 && windowWidth < 768) {
      return {
        page: {
          margin: '25px 20px',
        },
        header: {
          textAlign: 'center',
        },
        subheading: {
          fontSize: '15px',
          textAlign: 'center',
        },
        heading: {
          fontSize: '32px',
          textAlign: 'center',
          margin: '0 0 25px 0',
        },
        grid: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '20px',
        },
        card: {
          width: 'calc(50% - 20px)',
          minWidth: '200px',
          maxWidth: '250px',
          marginTop: '20px',
        },
      };
    }
    
    // Tablet styles (768px - 1024px)
    if (windowWidth >= 768 && windowWidth < 1024) {
      return {
        page: {
          margin: '30px 25px',
        },
        header: {
          textAlign: 'center',
        },
        subheading: {
          textAlign: 'center',
        },
        heading: {
          fontSize: '36px',
          textAlign: 'center',
        },
        grid: {
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '20px',
        },
        card: {
          width: 'calc(33.33% - 20px)',
          minWidth: '220px',
          maxWidth: '280px',
        },
        aligment: {
          width: '100%',
          marginLeft: '0',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '20px',
        },
        aligment2: {
          width: '100%',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '20px',
        },
        rghtMain: {
          width: '100%',
          marginRight: '0',
        },
        rghtTop: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '20px',
        },
      };
    }
    
    // Default styles (desktop)
    return {
      page: {
        marginLeft: "30px",
        marginRight: "30px",
      },
      header: {
        textAlign: "right",
      },
      subheading: {
        fontSize: "16px",
        textAlign: "right",
      },
      heading: {
        fontSize: "48px",
      },
      grid: {
        display: "flex",
        gap: "25px",
      },
      card: {
        width: "260px",
        marginTop: '30px',
      },
      aligment: {
        width: "30%",
        marginLeft: "100px",
      },
      aligment2: {
        width: "30%",
      },
      rghtMain: {
        width: '60%',
        marginRight: "100px"
      },
      rghtTop: {
        gap: "100px",
      },
    };
  };
  
  const responsiveStyles = getResponsiveStyles();
  
  const baseStyles = {
    page: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      boxSizing: 'border-box',
      padding: '20px 0',
    },
    header: {
      width: '100%',
    },
    subheading: {
      background: "linear-gradient(135deg, #ff3e00, #ff6a00)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      fontWeight: "500",
    },
    heading: {
      fontWeight: "700",
      margin: "0px",
      color: "#1f2937",
    },
    highlight: {
      background: "linear-gradient(135deg, #ff3e00, #ff6a00)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    grid: {
      display: "flex",
      width: '100%',
    },
    card: {
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      border: "1px solid #f4f5f8",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.06)",
      fontWeight: "400",
      fontSize: "16px",
      lineHeight: "1.5",
      color: "#4f4f4f",
      padding: "20px",
      transition: "all 0.3s ease",
    },
    aligment: {
      display: "flex",
      flexDirection: "column",
      marginTop: "10%",
    },
    aligment2: {
      display: "flex",
      flexDirection: "column",
    },
    quote: {
      fontWeight: "700",
      fontSize: "34px",
      color: "#252839",
      marginBottom: "10px",
      lineHeight: "0px",
      fontFamily: "ralewayRegular",
    },
    user: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      marginTop: "20px",
    },
    avatar: {
      width: "48px",
      height: "48px",
      borderRadius: "100px",
      objectFit: "cover",
    },
    inneruser: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    name: {
      fontWeight: "500",
      fontSize: "16px",
      color: "#252839",
    },
    rating: {
      fontSize: "16px",
      color: "#FFD249",
    },
    rghtTop: {
      display: "flex",
    },
    rghtInner2: {
      marginTop: "50%",
    },
    rghtMain: {},
  };

  return (
    <section id="testimonials" style={{...baseStyles.page, ...responsiveStyles.page}}>
      {/* Mobile and Tablet View (under 1024px) */}
      {windowWidth < 1024 && (
        <div className="testimonial_responsive">
          <div style={{...baseStyles.header, ...responsiveStyles.header}} className="testimonial_header_sm">
            <span style={{...baseStyles.subheading, ...responsiveStyles.subheading}}>TESTIMONIALS</span>
            <h2 style={{...baseStyles.heading, ...responsiveStyles.heading}}>
              What Our Users <span style={baseStyles.highlight}>Say</span>
            </h2>
          </div>

          <div style={{...baseStyles.grid, ...responsiveStyles.grid}} className="testimonial_grid">
            {/* Testimonial Card 1 */}
            <div style={{...baseStyles.card, ...responsiveStyles.card}} className="testimonial_card">
              <p style={{...baseStyles.quote, ...responsiveStyles.quote}}>"</p>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
              </p>
              <div style={{...baseStyles.user, ...responsiveStyles.user}}>
                <img style={{...baseStyles.avatar, ...responsiveStyles.avatar}} src={img1} alt="Leslie Alexander" />
                <div style={baseStyles.inneruser}>
                  <div style={{...baseStyles.name, ...responsiveStyles.name}}>Leslie Alexander</div>
                  <div style={{...baseStyles.rating, ...responsiveStyles.rating}}>★★★★☆</div>
                </div>
              </div>
            </div>

            {/* Testimonial Card 2 */}
            <div style={{...baseStyles.card, ...responsiveStyles.card}} className="testimonial_card">
              <p style={{...baseStyles.quote, ...responsiveStyles.quote}}>"</p>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
              </p>
              <div style={{...baseStyles.user, ...responsiveStyles.user}}>
                <img style={{...baseStyles.avatar, ...responsiveStyles.avatar}} src={img5} alt="Savannah Nguyen" />
                <div style={baseStyles.inneruser}>
                  <div style={{...baseStyles.name, ...responsiveStyles.name}}>Savannah Nguyen</div>
                  <div style={{...baseStyles.rating, ...responsiveStyles.rating}}>★★★★☆</div>
                </div>
              </div>
            </div>
            
            {/* Testimonial Card 3 */}
            <div style={{...baseStyles.card, ...responsiveStyles.card}} className="testimonial_card">
              <p style={{...baseStyles.quote, ...responsiveStyles.quote}}>"</p>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
              </p>
              <div style={{...baseStyles.user, ...responsiveStyles.user}}>
                <img style={{...baseStyles.avatar, ...responsiveStyles.avatar}} src={img2} alt="Jane Cooper" />
                <div style={baseStyles.inneruser}>
                  <div style={{...baseStyles.name, ...responsiveStyles.name}}>Jane Cooper</div>
                  <div style={{...baseStyles.rating, ...responsiveStyles.rating}}>★★★★☆</div>
                </div>
              </div>
            </div>
      
            {/* Testimonial Card 4 */}
            <div style={{...baseStyles.card, ...responsiveStyles.card}} className="testimonial_card">
              <p style={{...baseStyles.quote, ...responsiveStyles.quote}}>"</p>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
              </p>
              <div style={{...baseStyles.user, ...responsiveStyles.user}}>
                <img style={{...baseStyles.avatar, ...responsiveStyles.avatar}} src={img6} alt="Kathryn Murphy" />
                <div style={baseStyles.inneruser}>
                  <div style={{...baseStyles.name, ...responsiveStyles.name}}>Kathryn Murphy</div>
                  <div style={{...baseStyles.rating, ...responsiveStyles.rating}}>★★★★☆</div>
                </div>
              </div>
            </div>
            
            {/* Testimonial Card 5 */}
            <div style={{...baseStyles.card, ...responsiveStyles.card}} className="testimonial_card">
              <p style={{...baseStyles.quote, ...responsiveStyles.quote}}>"</p>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
              </p>
              <div style={{...baseStyles.user, ...responsiveStyles.user}}>
                <img style={{...baseStyles.avatar, ...responsiveStyles.avatar}} src={img3} alt="Esther Howard" />
                <div style={baseStyles.inneruser}>
                  <div style={{...baseStyles.name, ...responsiveStyles.name}}>Esther Howard</div>
                  <div style={{...baseStyles.rating, ...responsiveStyles.rating}}>★★★★☆</div>
                </div>
              </div>
            </div>

            {/* Testimonial Card 6 */}
            <div style={{...baseStyles.card, ...responsiveStyles.card}} className="testimonial_card">
              <p style={{...baseStyles.quote, ...responsiveStyles.quote}}>"</p>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
              </p>
              <div style={{...baseStyles.user, ...responsiveStyles.user}}>
                <img style={{...baseStyles.avatar, ...responsiveStyles.avatar}} src={img4} alt="Ralph Edwards" />
                <div style={baseStyles.inneruser}>
                  <div style={{...baseStyles.name, ...responsiveStyles.name}}>Ralph Edwards</div>
                  <div style={{...baseStyles.rating, ...responsiveStyles.rating}}>★★★★☆</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop View (1024px and above) */}
      {windowWidth >= 1024 && (
        <div className="testimonial_desktop">
          <div style={{...baseStyles.grid, ...responsiveStyles.grid}} className="testimonial_grid">
            <div style={{...baseStyles.aligment, ...responsiveStyles.aligment}} className="testimonial_aligment">
              {/* Testimonial Card 1 */}
              <div style={{...baseStyles.card, ...responsiveStyles.card}} className="testimonial_card">
                <p style={baseStyles.quote}>"</p>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                </p>
                <div style={baseStyles.user}>
                  <img style={baseStyles.avatar} src={img1} alt="Leslie Alexander" />
                  <div style={baseStyles.inneruser}>
                    <div style={baseStyles.name}>Leslie Alexander</div>
                    <div style={baseStyles.rating}>★★★★☆</div>
                  </div>
                </div>
              </div>

              {/* Testimonial Card 2 */}
              <div style={{...baseStyles.card, ...responsiveStyles.card}} className="testimonial_card">
                <p style={baseStyles.quote}>"</p>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                </p>
                <div style={baseStyles.user}>
                  <img style={baseStyles.avatar} src={img5} alt="Savannah Nguyen" />
                  <div style={baseStyles.inneruser}>
                    <div style={baseStyles.name}>Savannah Nguyen</div>
                    <div style={baseStyles.rating}>★★★★☆</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Column */}
            <div style={{...baseStyles.aligment2, ...responsiveStyles.aligment2}} className="testimonial_aligment2">
              {/* Testimonial Card 3 */}
              <div style={{...baseStyles.card, ...responsiveStyles.card}} className="testimonial_card">
                <p style={baseStyles.quote}>"</p>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                </p>
                <div style={baseStyles.user}>
                  <img style={baseStyles.avatar} src={img2} alt="Jane Cooper" />
                  <div style={baseStyles.inneruser}>
                    <div style={baseStyles.name}>Jane Cooper</div>
                    <div style={baseStyles.rating}>★★★★☆</div>
                  </div>
                </div>
              </div>
              
              {/* Testimonial Card 4 */}
              <div style={{...baseStyles.card, ...responsiveStyles.card}} className="testimonial_card">
                <p style={baseStyles.quote}>"</p>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                </p>
                <div style={baseStyles.user}>
                  <img style={baseStyles.avatar} src={img6} alt="Kathryn Murphy" />
                  <div style={baseStyles.inneruser}>
                    <div style={baseStyles.name}>Kathryn Murphy</div>
                    <div style={baseStyles.rating}>★★★★☆</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column with Header */}
            <div style={{...baseStyles.rghtMain, ...responsiveStyles.rghtMain}} className="testimonial_rghtmain">
              <div className="testimonial_header_bg">
                <div style={{...baseStyles.header, ...responsiveStyles.header}} className="testimonial_subheader">
                  <span style={{...baseStyles.subheading, ...responsiveStyles.subheading}}>TESTIMONIALS</span>
                </div>
                <div style={{...baseStyles.header, ...responsiveStyles.header}} className="testimonial_header">
                  <span style={{...baseStyles.heading, ...responsiveStyles.heading}}>
                    What Our Users <span style={baseStyles.highlight}>Say</span>
                  </span>
                </div>
              </div>
              
              <div style={{...baseStyles.rghtTop, ...responsiveStyles.rghtTop}} className="testimonial_rghttop">
                <div style={baseStyles.rghtInner}>
                  {/* Testimonial Card 5 */}
                  <div style={{...baseStyles.card, ...responsiveStyles.card}} className="testimonial_card">
                    <p style={baseStyles.quote}>"</p>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                    </p>
                    <div style={baseStyles.user}>
                      <img style={baseStyles.avatar} src={img3} alt="Esther Howard" />
                      <div style={baseStyles.inneruser}>
                        <div style={baseStyles.name}>Esther Howard</div>
                        <div style={baseStyles.rating}>★★★★☆</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={baseStyles.rghtInner2}>
                  {/* Testimonial Card 6 */}
                  <div style={{...baseStyles.card, ...responsiveStyles.card}} className="testimonial_card">
                    <p style={baseStyles.quote}>"</p>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                    </p>
                    <div style={baseStyles.user}>
                      <img style={baseStyles.avatar} src={img4} alt="Ralph Edwards" />
                      <div style={baseStyles.inneruser}>
                        <div style={baseStyles.name}>Ralph Edwards</div>
                        <div style={baseStyles.rating}>★★★★☆</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Testimonials;