import React from "react";
import appStoreImg from "../assets/app_img.png";
import googlePlayImg from "../assets/google_img.png";
import phone1Img from "../assets/phone_img1.png";
import phone2Img from "../assets/phone_img2.png";
import phone3Img from "../assets/phone_img3.png";
<<<<<<< HEAD

=======
 
>>>>>>> 25f51a8b3cf6ee60bea71a8be20834b96f2addcd
function Mobile() {
  const styles = {
    page: {
      marginLeft:"30px",
      marginRight:"30px",
<<<<<<< HEAD
      
=======
>>>>>>> 25f51a8b3cf6ee60bea71a8be20834b96f2addcd
      textAlign: "center",
    },
    topText: {
       background: "linear-gradient(135deg, #ff3e00, #ff6a00)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      fontSize: "16px",
      fontWeight: "500",
<<<<<<< HEAD
      
=======
     
>>>>>>> 25f51a8b3cf6ee60bea71a8be20834b96f2addcd
    },
    heading: {
      fontSize: "48px",
      fontWeight: "700",
      marginBottom: "20px",
<<<<<<< HEAD
      
=======
     
>>>>>>> 25f51a8b3cf6ee60bea71a8be20834b96f2addcd
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
<<<<<<< HEAD
      
=======
     
>>>>>>> 25f51a8b3cf6ee60bea71a8be20834b96f2addcd
    },
    phoneImage: {
      width: "500px",
      height: "auto",
      borderRadius: "30px",
      marginLeft:"60%"
<<<<<<< HEAD
      
=======
     
>>>>>>> 25f51a8b3cf6ee60bea71a8be20834b96f2addcd
    },
     phoneImage2: {
      width: "500px",
      height: "auto",
      borderRadius: "30px",
     
     
<<<<<<< HEAD
      
=======
     
>>>>>>> 25f51a8b3cf6ee60bea71a8be20834b96f2addcd
    },
    phoneImage3: {
      width: "500px",
      height: "auto",
      borderRadius: "30px",
      marginLeft:"-60%"
<<<<<<< HEAD
      
    },
    
  };

=======
     
    },
   
  };
 
>>>>>>> 25f51a8b3cf6ee60bea71a8be20834b96f2addcd
  return (
    <div style={styles.page}>
      <p style={styles.topText}>Get Mobile App</p>
      <h2 style={styles.heading}>
        Ready for <span style={styles.secure}>Secure</span> Calls?
      </h2>
      <p style={styles.subtitle}>
        Get Started Today — Available For Instant Download On Both<br /> iOS And Android Devices.
      </p>
<<<<<<< HEAD

=======
 
>>>>>>> 25f51a8b3cf6ee60bea71a8be20834b96f2addcd
      <div style={styles.appButtons}>
        <img src="./src/assets/app_img.png" alt="App Store" width="140" />
        <img src="./src/assets/google_img.png" alt="Google Play" width="140" />
      </div>
<<<<<<< HEAD

=======
 
>>>>>>> 25f51a8b3cf6ee60bea71a8be20834b96f2addcd
      <div style={styles.phoneContainer}>
        <div>
        <img
          style={styles.phoneImage}
          src="./src/assets/phone_img2.png"
          alt="Phone 1"
        />
        </div>
        <div>
        <img
          style={styles.phoneImage2}
          src="./src/assets/phone_img1.png"
          alt="Phone 2"
        />
        </div>
        <div  >
        <img
          style={styles.phoneImage3}
          src="./src/assets/phone_img3.png"
          alt="Phone 3"
        />
        </div>
      </div>
    </div>
  );
}
<<<<<<< HEAD

export default Mobile;
=======
 
export default Mobile;
 
>>>>>>> 25f51a8b3cf6ee60bea71a8be20834b96f2addcd
