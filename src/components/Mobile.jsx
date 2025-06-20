import React from "react";
import appStoreImg from "../assets/app_img.png";
import googlePlayImg from "../assets/google_img.png";
import phone1Img from "../assets/phone_img1.png";
import phone2Img from "../assets/phone_img2.png";
import phone3Img from "../assets/phone_img3.png";
 
function Mobile() {
  const styles = {
    page: {
      marginLeft:"30px",
      marginRight:"30px",
      textAlign: "center",
    },
    topText: {
       background: "linear-gradient(135deg, #ff3e00, #ff6a00)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      fontSize: "16px",
      fontWeight: "500",
     
    },
    heading: {
      fontSize: "48px",
      fontWeight: "700",
      marginBottom: "20px",
     
    },
    secure: {
      background: "linear-gradient(135deg, #ff3e00, #ff6a00)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
    },
    subtitle: {
      color: "#6b7280",
      fontSize: "16px",
      fontWeight:"500",
      margin: "10px 0 30px",
    },
    appButtons: {
      display: "flex",
      justifyContent: "center",
      gap: "15px",
      marginBottom: "50px",
    },
    phoneContainer: {
      display: "flex",
      justifyContent: "center",
     
    },
    phoneImage: {
      width: "500px",
      height: "auto",
      borderRadius: "30px",
      marginLeft:"60%"
     
    },
     phoneImage2: {
      width: "500px",
      height: "auto",
      borderRadius: "30px",
     
     
     
    },
    phoneImage3: {
      width: "500px",
      height: "auto",
      borderRadius: "30px",
      marginLeft:"-60%"
     
    },
   
  };
 
  return (
    <div style={styles.page}>
      <p style={styles.topText}>Get Mobile App</p>
      <h2 style={styles.heading}>
        Ready for <span style={styles.secure}>Secure</span> Calls?
      </h2>
      <p style={styles.subtitle}>
        Get Started Today — Available For Instant Download On Both<br /> iOS And Android Devices.
      </p>
 
      <div style={styles.appButtons}>
        <a 
          href="https://apps.apple.com/us/app/tssst/id6745514901" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <img src={appStoreImg} alt="App Store" width="140" style={{ cursor: 'pointer' }} />
        </a>
        <a 
          href="https://play.google.com/store/apps/details?id=com.pazl.buzzApp" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <img src={googlePlayImg} alt="Google Play" width="140" style={{ cursor: 'pointer' }} />
        </a>
      </div>
 
      <div style={styles.phoneContainer}>
        <div>
        <img
          style={styles.phoneImage}
          src={phone2Img}
          alt="Phone 1"
        />
        </div>
        <div>
        <img
          style={styles.phoneImage2}
          src={phone1Img}
          alt="Phone 2"
        />
        </div>
        <div  >
        <img
          style={styles.phoneImage3}
          src={phone3Img}
          alt="Phone 3"
        />
        </div>
      </div>
    </div>
  );
}
 
export default Mobile;
 