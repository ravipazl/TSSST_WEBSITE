import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  FaChartLine, 
  FaCog, 
  FaClipboardList, 
  FaCode, 
  FaSignOutAlt, 
  FaBars, 
  FaTimes,
  FaHome
} from "react-icons/fa";
import { FaArrowRightFromBracket } from "react-icons/fa6";

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Auto-close sidebar on mobile
      if (mobile && isSidebarOpen) {
        setIsSidebarOpen(false);
      } else if (!mobile && !isSidebarOpen) {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isSidebarOpen]);

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Navigation items
  const navItems = [
    { 
      name: "Dashboard", 
      path: "/admin", 
      icon: <FaChartLine /> 
    },

    { 
      name: "App Releases", 
      path: "/admin/app-releases", 
      icon: <FaClipboardList /> 
    },
    { 
      name: "Config Settings", 
      path: "/admin/config-settings", 
      icon: <FaCog /> 
    },
    { 
      name: "App Logs", 
      path: "/admin/app-logs", 
      icon: <FaClipboardList /> 
    },
    { 
      name: "API Logs", 
      path: "/admin/api-logs", 
      icon: <FaCode /> 
    }
  ];

  // Check if a nav item is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Handle logout
  const handleLogout = () => {
    // Add logout logic here
    navigate("/");
  };

  // Handle navigation
  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="admin-layout" style={styles.layout}>
      {/* Sidebar */}
      <div 
        className="sidebar" 
        style={{
          ...styles.sidebar,
          width: isSidebarOpen ? (isMobile ? "250px" : "250px") : "0px",
          left: isSidebarOpen ? "0" : "-250px"
        }}
      >
        <div style={styles.sidebarHeader}>
          <h2 style={styles.sidebarTitle}>TSSST Admin</h2>
          {isMobile && (
            <button 
              onClick={toggleSidebar} 
              style={styles.closeButton}
            >
              <FaTimes />
            </button>
          )}
        </div>

        <div style={styles.navItems}>
          {navItems.map((item, index) => (
            <div 
              key={index} 
              style={{
                ...styles.navItem,
                ...(isActive(item.path) ? styles.activeNavItem : {})
              }}
              onClick={() => handleNavigation(item.path)}
            >
              <span style={styles.navIcon}>{item.icon}</span>
              <span style={styles.navText}>{item.name}</span>
            </div>
          ))}

          <div 
          style={styles.logoutButton}
          onClick={handleLogout}
        >
          <span style={styles.navIcon}><FaSignOutAlt /></span>
          <span style={styles.navText}>Logout</span>
        </div>
        </div>


      </div>

      {/* Main Content */}
      <div 
        className="main-content" 
        style={{
          ...styles.mainContent,
          marginLeft: isSidebarOpen && !isMobile ? "250px" : "0"
        }}
      >
        {/* Header */}
        <div className="header" style={styles.header}>
          <div style={styles.headerLeft}>
            <button 
              onClick={toggleSidebar} 
              style={styles.menuButton}
            >
              <FaBars />
            </button>
            <h2 style={styles.headerTitle}>Admin Panel</h2>
          </div>
          <div style={styles.headerRight}>
            <div style={styles.userInfo}>
              <span style={styles.userName}>Admin User</span>
              <button 
                onClick={handleLogout} 
                style={styles.logoutHeaderButton}
              >
                <FaArrowRightFromBracket />
              </button>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="page-content" style={styles.pageContent}>
          {children}
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobile && isSidebarOpen && (
        <div 
          style={styles.overlay} 
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

// Styles
const styles = {
  layout: {
    display: "flex",
    minHeight: "100vh",
    position: "relative",
  },
  sidebar: {
    position: "fixed",
    height: "100vh",
    backgroundColor: "#2c3e50",
    color: "white",
    transition: "all 0.3s ease",
    zIndex: 1000,
    overflowY: "auto",
    boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
  },
  sidebarHeader: {
    padding: "20px",
    borderBottom: "1px solid #34495e",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sidebarTitle: {
    margin: 0,
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#FF6B00",
  },
  closeButton: {
    background: "none",
    border: "none",
    color: "white",
    fontSize: "1.2rem",
    cursor: "pointer",
  },
  navItems: {
    padding: "20px 0",
  },
  navItem: {
    padding: "12px 20px",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
    "&:hover": {
      backgroundColor: "#34495e",
    },
  },
  activeNavItem: {
    backgroundColor: "#34495e",
    borderLeft: "4px solid #FF6B00",
  },
  navIcon: {
    marginRight: "15px",
    fontSize: "1.2rem",
    width: "20px",
    display: "inline-block",
  },
  navText: {
    fontSize: "1rem",
  },
  logoutButton: {
    padding: "12px 20px",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    marginTop: "auto",
    position: "sticky",
    bottom: 0,
    backgroundColor: "#2c3e50",
    "&:hover": {
      backgroundColor: "#34495e",
    },
  },
  mainContent: {
    flex: 1,
    transition: "margin-left 0.3s ease",
    width: "100%",
  },
  header: {
    backgroundColor: "white",
    padding: "15px 20px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
  },
  menuButton: {
    background: "none",
    border: "none",
    fontSize: "1.2rem",
    cursor: "pointer",
    marginRight: "15px",
    color: "#333",
  },
  headerTitle: {
    margin: 0,
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
  },
  userName: {
    marginRight: "15px",
    fontWeight: "500",
  },
  logoutHeaderButton: {
    background: "none",
    border: "none",
    color: "#FF6B00",
    fontSize: "1rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  pageContent: {
    padding: "20px",
    backgroundColor: "#f5f5f5",
    minHeight: "calc(100vh - 60px)",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 999,
  },
};

export default AdminLayout;