import React from "react";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
import img5 from "../assets/img5.jpg";
import img6 from "../assets/img6.jpg";

function Testimonials() {
  const styles = {
    page: {
      marginLeft:"30px",
      marginRight:"30px",
      aligcontent:"center",
      
     
      
    },
    header: {
      textAlign: "right",
      
    },
    subheading: {
       background: "linear-gradient(135deg, #ff3e00, #ff6a00)",
       WebkitBackgroundClip: "text",
       WebkitTextFillColor: "transparent",
      fontWeight: "400",
      fontSize: "16px",
      textAlign: "right",
      
    },
    heading: {
      fontWeight: "700",
      fontSize: "48px",
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
      gap:"25px",
      width:'100%',
      aligcontent:"center",
      
      
    },
    card: {
      width:"260px",
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      border: "1px solid #f4f5f8",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.06)",
      fontWeight: "400",
      fontSize: "16px",
      lineHeight: "1.5",
      color: "#4f4f4f",
      padding: "20px",
      marginTop:'30px',
    
    },
    aligment:{
      display: "flex",
      flexDirection: "column",
      marginTop: "10%", 
      width:"30%",
      aligcontent:"center",
      marginLeft:"100px",
      
      
     
     
      
    },
    aligment2:{
      display: "flex",
      flexDirection: "column",
      width:"30%",
      aligcontent:"center"
      
      
      
     
     
      
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
      gap:"100px",

    },
    rghtInner2: {
      marginTop: "50%",
    },
    rghtMain:{
      width:'60%',
      marginRight:"100px"
    },
  };

  return (
    <div style={styles.page} >
      <div className="testimonial_header_mobile">
            <div className="testimonial_header_sm">
              <div style={styles.header} className="testimonial_subheader">
                <span style={styles.subheading}>TESTIMONIALS</span>
                </div>
                <div style={styles.header} className="testimonial_header">
                <span style={styles.heading}>
                  What Our Users <span style={styles.highlight}>Say</span>
                </span>
              </div>
            </div>

            <div style={styles.grid} className="testimonial_grid">

              {/* Testimonial Card 1 */}
              <div style={styles.card} className="testimonial_card">
                <p style={styles.quote}>“</p>
                <p>
                Lorem Ipsum is simply dummy text Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown. Lorem Ipsum has been the industry's standard dummy Lorem Ipsum has been the industry's
                </p>
                <div style={styles.user}>
                  <img style={styles.avatar} src="./src/assets/img1.jpg" alt="Leslie Alexander" />
                  <div style={styles.inneruser}>
                    <div style={styles.name}>Leslie Alexander</div>
                    <div style={styles.rating}>★★★★☆</div>
                  </div>
                </div>
              </div>

              {/* Testimonial Card 2 */}
              <div style={styles.card} className="testimonial_card">
                <p style={styles.quote}>“</p>
                <p>
                  Lorem Ipsum is simply dummy text Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown. Lorem Ipsum has been the industry's standard dummy Lorem Ipsum has been the industry's
                </p>
                <div style={styles.user}>
                  <img style={styles.avatar} src="./src/assets/img5.jpg" alt="Savannah Nguyen" />
                  <div style={styles.inneruser}>
                    <div style={styles.name}>Savannah Nguyen</div>
                    <div style={styles.rating}>★★★★☆</div>
                  </div>
                </div>
              </div>

              
              {/* Testimonial Card 3 */}
              <div style={styles.card} className="testimonial_card">
                <p style={styles.quote}>“</p>
                <p>
                  Lorem Ipsum is simply dummy text Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown. Lorem Ipsum has been the industry's standard dummy Lorem Ipsum has been the industry's
                </p>
                <div style={styles.user}>
                  <img style={styles.avatar} src="./src/assets/img2.jpg" alt="Jane Cooper " />
                  <div style={styles.inneruser}>
                    <div style={styles.name}>Jane Cooper</div>
                    <div style={styles.rating}>★★★★☆</div>
                  </div>
                </div>
              </div>
        
              {/* Testimonial Card 4 */}
              <div style={styles.card} className="testimonial_card">
                <p style={styles.quote}>“</p>
                <p>
                  Lorem Ipsum is simply dummy text Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown. Lorem Ipsum has been the industry's standard dummy Lorem Ipsum has been the industry's
                </p>
                <div style={styles.user}>
                  <img style={styles.avatar} src="./src/assets/img6.jpg" alt="Kathryn Murphy" />
                  <div style={styles.inneruser}>
                    <div style={styles.name}>Kathryn Murphy</div>
                    <div style={styles.rating}>★★★★☆</div>
                  </div>
                </div>
              </div>
              
              {/* Testimonial Card 5 */}
              <div style={styles.card} className="testimonial_card">
                <p style={styles.quote}>“</p>
                <p>
                  Lorem Ipsum is simply dummy text Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown. Lorem Ipsum has been the industry's standard dummy Lorem Ipsum has been the industry's
                </p>
                <div style={styles.user}>
                  <img style={styles.avatar} src="./src/assets/img3.jpg" alt="Esther Howard" />
                  <div style={styles.inneruser}>
                    <div style={styles.name}>Esther Howard</div>
                    <div style={styles.rating}>★★★★☆</div>
                  </div>
                </div>
              </div>

              {/* Testimonial Card 6 */}
              <div style={styles.card} className="testimonial_card">
                <p style={styles.quote}>“</p>
                <p>
                  Lorem Ipsum is simply dummy text Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown. Lorem Ipsum has been the industry's standard dummy Lorem Ipsum has been the industry's
                </p>
                <div style={styles.user}>
                  <img style={styles.avatar} src="./src/assets/img4.jpg" alt="Ralph Edwards" />
                  <div style={styles.inneruser}>
                    <div style={styles.name}>Ralph Edwards</div>
                    <div style={styles.rating}>★★★★☆</div>
                  </div>
                </div>
              </div>


            </div>

      </div>
      <div className="testimonial_header_desktop">

        <div style={styles.grid} className="testimonial_grid">
        <div  style={styles.aligment} className="testimonial_aligment" >
        {/* Testimonial Card 1 */}
        <div style={styles.card} className="testimonial_card">
          <p style={styles.quote}>“</p>
          <p>
           Lorem Ipsum is simply dummy text Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown. Lorem Ipsum has been the industry's standard dummy Lorem Ipsum has been the industry's
          </p>
          <div style={styles.user}>
            <img style={styles.avatar} src="./src/assets/img1.jpg" alt="Leslie Alexander" />
            <div style={styles.inneruser}>
              <div style={styles.name}>Leslie Alexander</div>
              <div style={styles.rating}>★★★★☆</div>
            </div>
          </div>
        </div>

        {/* Testimonial Card 2 */}
        <div style={styles.card} className="testimonial_card">
          <p style={styles.quote}>“</p>
          <p>
            Lorem Ipsum is simply dummy text Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown. Lorem Ipsum has been the industry's standard dummy Lorem Ipsum has been the industry's
          </p>
          <div style={styles.user}>
            <img style={styles.avatar} src="./src/assets/img5.jpg" alt="Savannah Nguyen" />
            <div style={styles.inneruser}>
              <div style={styles.name}>Savannah Nguyen</div>
              <div style={styles.rating}>★★★★☆</div>
            </div>
          </div>
        </div>
        </div>

        {/* Testimonial Card 3 */}
        <div style={styles.aligment2} className="testimonial_aligment2">
        <div style={styles.card} className="testimonial_card">
          <p style={styles.quote}>“</p>
          <p>
            Lorem Ipsum is simply dummy text Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown. Lorem Ipsum has been the industry's standard dummy Lorem Ipsum has been the industry's
          </p>
          <div style={styles.user}>
            <img style={styles.avatar} src="./src/assets/img2.jpg" alt="Jane Cooper " />
            <div style={styles.inneruser}>
              <div style={styles.name}>Jane Cooper</div>
              <div style={styles.rating}>★★★★☆</div>
            </div>
          </div>
        </div>
        {/* Testimonial Card 4 */}
        <div style={styles.card} className="testimonial_card">
          <p style={styles.quote}>“</p>
          <p>
            Lorem Ipsum is simply dummy text Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown. Lorem Ipsum has been the industry's standard dummy Lorem Ipsum has been the industry's
          </p>
          <div style={styles.user}>
            <img style={styles.avatar} src="./src/assets/img6.jpg" alt="Kathryn Murphy" />
            <div style={styles.inneruser}>
              <div style={styles.name}>Kathryn Murphy</div>
              <div style={styles.rating}>★★★★☆</div>
            </div>
          </div>
        </div>
        </div>

        {/* Testimonial Card 5 */}
        <div style={styles.rghtMain} className="testimonial_rghtmain">
          <div className="testimonial_header_bg">
            <div style={styles.header} className="testimonial_subheader">
              <span style={styles.subheading}>TESTIMONIALS</span>
              </div>
              <div style={styles.header} className="testimonial_header">
              <span style={styles.heading}>
                What Our Users <span style={styles.highlight}>Say</span>
              </span>
            </div>
          </div>
          <div style={styles.rghtTop} className="testimonial_rghttop">

            <div style={styles.rghtInner}>

             <div style={styles.card} className="testimonial_card">
              <p style={styles.quote}>“</p>
              <p>
                Lorem Ipsum is simply dummy text Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown. Lorem Ipsum has been the industry's standard dummy Lorem Ipsum has been the industry's
              </p>
              <div style={styles.user}>
                <img style={styles.avatar} src="./src/assets/img3.jpg" alt="Esther Howard" />
                <div style={styles.inneruser}>
                  <div style={styles.name}>Esther Howard</div>
                  <div style={styles.rating}>★★★★☆</div>
                </div>
              </div>
            </div>
        
        </div>
         <div style={styles.rghtInner2}>
        {/* Testimonial Card 6 */}
        <div style={styles.card} className="testimonial_card">
          <p style={styles.quote}>“</p>
          <p>
            Lorem Ipsum is simply dummy text Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown. Lorem Ipsum has been the industry's standard dummy Lorem Ipsum has been the industry's
          </p>
          <div style={styles.user}>
            <img style={styles.avatar} src="./src/assets/img4.jpg" alt="Ralph Edwards" />
            <div style={styles.inneruser}>
              <div style={styles.name}>Ralph Edwards</div>
              <div style={styles.rating}>★★★★☆</div>
            </div>
          </div>
        </div>
        </div>

          </div>

        </div>
       
        
      </div>

      </div>
      
      
        
      
    </div>
  );
}
export default Testimonials;