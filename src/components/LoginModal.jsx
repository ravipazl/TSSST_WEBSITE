import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BaseUrl } from "./Constant";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

function LoginModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setUsername("");
      setPassword("");
      setIsLoading(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Handle window resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Add responsive CSS styles
  useEffect(() => {
    const removeCSS = addResponsiveCSS();
    return removeCSS;
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!username.trim()) {
      toast.error("Please enter username");
      return;
    }
    if (!password.trim()) {
      toast.error("Please enter password");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const payload = {
        username: username.trim(),
        password: password,
      };
      
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
      
      const response = await axios.put(`${BaseUrl}/send-otp`, payload, config);
      console.log("Login response:", response.data);
      
      if (response?.data?.status === true) {
        toast.success("Login successful!");
        
        // Store any tokens or user data if provided by the API
        if (response.data.token) {
          localStorage.setItem('authToken', response.data.token);
        }
        if (response.data.user) {
          localStorage.setItem('userData', JSON.stringify(response.data.user));
        }
        
        setTimeout(() => {
          onClose();
          navigate("/admin");
        }, 1500);
      } else {
        toast.error(response?.data?.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  // Get current responsive styles
  const currentStyles = getResponsiveStyles();

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: '',
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
            fontSize: window.innerWidth <= 480 ? '14px' : '16px',
          },
          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
            style: {
              background: '#10B981',
              color: '#fff',
              fontSize: window.innerWidth <= 480 ? '14px' : '16px',
            },
          },
          error: {
            duration: 4000,
            style: {
              background: '#EF4444',
              color: '#fff',
              fontSize: window.innerWidth <= 480 ? '14px' : '16px',
            },
          },
        }}
      />
      <div style={currentStyles.modalOverlay}>
        <div 
          style={currentStyles.container} 
          className="login-modal-container"
          ref={modalRef}
        >
          <div 
            style={currentStyles.closeButton} 
            className="login-modal-close"
            onClick={onClose}
          >
            ×
          </div>
          <h3 style={currentStyles.heading}>Login</h3>

          <form onSubmit={handleLogin} style={currentStyles.form}>
            <div style={currentStyles.inputGroup}>
              <input
                type="text"
                placeholder="Username"
                style={currentStyles.input}
                className="login-modal-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            <div style={currentStyles.inputGroup}>
              <input
                type="password"
                placeholder="Password"
                style={currentStyles.input}
                className="login-modal-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            <button 
              type="submit" 
              style={{
                ...currentStyles.button,
                opacity: isLoading ? 0.7 : 1,
                cursor: isLoading ? 'not-allowed' : 'pointer'
              }}
              className="login-modal-button"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

// Get responsive styles based on screen width
const getResponsiveStyles = () => {
  const isMobile = window.innerWidth <= 480;
  const isTablet = window.innerWidth > 480 && window.innerWidth <= 768;
  const isDesktop = window.innerWidth > 768;

  return {
    modalOverlay: {
      position: "fixed", 
      top: 0, 
      left: 0, 
      width: "100vw", 
      height: "100vh",
      backgroundColor: "rgba(0, 0, 0, 0.6)", 
      display: "flex",
      alignItems: "center", 
      justifyContent: "center", 
      zIndex: 1000,
      padding: isMobile ? "20px" : "40px",
      boxSizing: "border-box",
    },
    container: {
      width: isMobile ? "100%" : isTablet ? "85%" : "90%",
      maxWidth: isMobile ? "380px" : isTablet ? "480px" : "550px",
      minWidth: isMobile ? "320px" : isTablet ? "400px" : "400px",
      minHeight: isMobile ? "400px" : isTablet ? "420px" : "450px",
      maxHeight: isMobile ? "90vh" : "85vh",
      padding: isMobile ? "30px 25px" : isTablet ? "40px 35px" : "50px",
      borderRadius: isMobile ? "15px" : isTablet ? "18px" : "20px",
      backgroundColor: "#fff",
      boxShadow: isMobile 
        ? "0 4px 20px rgba(0,0,0,0.15)" 
        : isTablet 
          ? "0 6px 25px rgba(0,0,0,0.15)" 
          : "0 8px 32px rgba(0,0,0,0.15)",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      overflow: "hidden",
    },
    closeButton: {
      position: "absolute",
      top: isMobile ? "15px" : isTablet ? "18px" : "20px",
      right: isMobile ? "20px" : isTablet ? "22px" : "25px",
      fontSize: isMobile ? "24px" : isTablet ? "26px" : "28px",
      fontWeight: "bold",
      color: "#F73531",
      cursor: "pointer",
      zIndex: 1,
      width: isMobile ? "30px" : isTablet ? "32px" : "35px",
      height: isMobile ? "30px" : isTablet ? "32px" : "35px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
      transition: "background-color 0.2s ease",
    },
    heading: {
      textAlign: "center",
      background: "linear-gradient(135deg, #ff3e00, #ff6a00)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      marginBottom: isMobile ? "25px" : isTablet ? "28px" : "30px",
      fontSize: isMobile ? "24px" : isTablet ? "26px" : "28px",
      fontWeight: "700",
      letterSpacing: "-0.5px",
      lineHeight: 1.2,
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: isMobile ? "20px" : isTablet ? "22px" : "25px",
      flex: 1,
      justifyContent: "center",
    },
    inputGroup: {
      display: "flex",
      flexDirection: "column",
      gap: isMobile ? "6px" : "8px",
    },
    input: {
      padding: isMobile ? "14px 16px" : isTablet ? "15px 17px" : "16px 18px",
      borderRadius: isMobile ? "8px" : isTablet ? "9px" : "10px",
      border: "1.5px solid #e1e5e9",
      fontSize: isMobile ? "16px" : "16px", // Keep 16px to prevent zoom on mobile
      outline: "none",
      width: "100%",
      transition: "border-color 0.3s ease, box-shadow 0.3s ease",
      backgroundColor: "#fafbfc",
      boxSizing: "border-box",
    },
    button: {
      padding: isMobile ? "14px 18px" : isTablet ? "15px 19px" : "16px 20px",
      fontSize: isMobile ? "16px" : "16px",
      background: "linear-gradient(135deg, #ff3e00, #ff6a00)",
      color: "#fff",
      border: "none",
      borderRadius: isMobile ? "8px" : isTablet ? "9px" : "10px",
      cursor: "pointer",
      fontWeight: "600",
      transition: "all 0.3s ease",
      marginTop: isMobile ? "8px" : "10px",
      minHeight: isMobile ? "48px" : isTablet ? "50px" : "52px",
      width: "100%",
      boxSizing: "border-box",
    },
  };
};

// Add CSS for focus states and hover effects
const addResponsiveCSS = () => {
  const css = `
    .login-modal-input:focus {
      border-color: #ff3e00 !important;
      box-shadow: 0 0 0 3px rgba(255, 62, 0, 0.1) !important;
    }
    
    .login-modal-input:hover:not(:disabled) {
      border-color: #ff6a00 !important;
    }
    
    .login-modal-button:hover:not(:disabled) {
      background: linear-gradient(135deg, #e63500, #e55a00) !important;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(255, 62, 0, 0.3);
    }
    
    .login-modal-close:hover {
      background-color: rgba(247, 53, 49, 0.1) !important;
    }
    
    @media (max-width: 480px) {
      .login-modal-input {
        font-size: 16px !important; /* Prevent zoom on iOS */
      }
    }
    
    @media (max-height: 600px) {
      .login-modal-container {
        justify-content: flex-start !important;
        margin-top: 20px !important;
      }
    }
  `;
  
  const styleSheet = document.createElement("style");
  styleSheet.innerText = css;
  document.head.appendChild(styleSheet);
  
  return () => {
    document.head.removeChild(styleSheet);
  };
};

// Use responsive styles
const styles = getResponsiveStyles();

export default LoginModal;