import React, { useState, useEffect } from "react";
import {
  Bar,
  Line,
  Pie,
} from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
 
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);
import { FcBarChart } from "react-icons/fc";
import { FaChartLine } from "react-icons/fa6";
import { IoIosHourglass } from "react-icons/io";
import { FaChartPie } from "react-icons/fa6";
import { FaFireFlameCurved } from "react-icons/fa6";
import { FaCalendarAlt } from 'react-icons/fa';
// No need to import ApiLogs as it will be a separate route
 
// Function to get responsive styles based on screen width
const getResponsiveStyles = (width) => {
  // Define breakpoint at 500px (inclusive)
  const isMobile = width < 500;
 
  return {
    containerStyle: {
      width: isMobile ? "100%" : "45%", // 1 column below 500px, 2 columns at 500px and above
      padding: isMobile ? "12px" : "15px",
      margin: isMobile ? "8px 0" : "10px",
      backgroundColor: "#fff",
      borderRadius: "10px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      textAlign: "center",
    },
 
    rowStyle: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: isMobile ? "center" : "space-between",
      padding: isMobile ? "0 10px" : "0",
      maxWidth: "100%", // Ensure container doesn't overflow
      margin: "0 auto", // Center the row
    },
 
    bottomStyle: {
      backgroundColor: "#fff",
      padding: isMobile ? "12px" : "15px",
      width: isMobile ? "100%" : "30%",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      textAlign: "center",
      fontWeight: "bold",
      margin: isMobile ? "8px 0" : "0",
    },
   
    summaryContainer: {
      display: "flex",
      justifyContent: "center",
      marginTop: "30px",
      width: "100%",
      maxWidth: "1000px",
      margin: "30px auto 0",
    },
   
    cardContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      width: "100%",
      gap: isMobile ? "15px" : "20px",
      flexDirection: isMobile ? "column" : "row",
    }
  };
}
 
function Dashboard() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
 
  // Get responsive styles based on current window width
  const style = getResponsiveStyles(windowWidth);
 
  // Add event listener for window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
   
    window.addEventListener('resize', handleResize);
   
    // Clean up event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
 
  // Define if we're on mobile for consistent breakpoints
  const isMobile = windowWidth < 500;
 
  // Options for responsive charts
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: isMobile ? 'bottom' : 'top',
        labels: {
          boxWidth: isMobile ? 8 : 15,
          font: {
            size: isMobile ? 9 : 11
          }
        }
      }
    }
  };
 
  // Set a maximum width for the dashboard to ensure proper column layout
  const maxDashboardWidth = "1200px";
 
  // Helper function for chart container height
  const getChartHeight = () => isMobile ? "220px" : "250px";
 
  return (
    <div style={{
      padding: isMobile ? "8px" : "15px",
      fontFamily: "sans-serif",
      maxWidth: maxDashboardWidth,
      margin: "0 auto",
      overflowX: "hidden"
    }}>
      <h1 style={{
        textAlign: "center",
        marginBottom: isMobile ? "15px" : "20px",
        fontSize: isMobile ? "20px" : "28px"
      }}>
        TSSST API Analytics Dashboard
      </h1>
 
      <div style={style.rowStyle}>
        <div style={style.containerStyle}>
          <h3><FcBarChart style={{ marginRight: '8px' }} />API Calls per User</h3>
          <div style={{ height: getChartHeight() }}>
            <Bar
              data={{
                labels: ["User 1234567890", "User 2987654323", "User 3987654321", "User 4123456789", "User 52345678912","User 1234567890", "User 2987654323", "User 3987654321", "User 4123456789", "User 52345678912","User 1234567890", "User 2987654323", "User 3987654321", "User 4123456789", "User 52345678912","User 1234567890", "User 2987654323", "User 3987654321", "User 4123456789", "User 52345678912"],
                datasets: [
                  {
                    label: "API Calls",
                    data: [4500,4900,5300,42000, 10000, 8000, 3000, 1500, 500, 200, 700,1200, 1500, 3000, 1000, 800, 1400, 1000,500,700],
                    backgroundColor: "blue",
                  },
                ],
              }}
              options={chartOptions}
            />
          </div>
        </div>
 
        <div style={style.containerStyle}>
          <h3><FaChartLine style={{ marginRight: '8px' }} /> API Requests Over Time</h3>
          <div style={{ height: getChartHeight() }}>
            <Line
              data={{
                labels: ["2025-06-01", "2025-06-02", "2025-06-03", "2025-06-04","2025-06-01", "2025-06-02", "2025-06-03", "2025-06-04","2025-06-01", "2025-06-02", "2025-06-03", "2025-06-04","2025-06-01", "2025-06-02", "2025-06-03", "2025-06-04"],
                datasets: [
                  {
                    label: "Requests",
                    data: [0,2500, 3000, 800, 1200, 500, 1000, 1500, 2000, 1500, 2000,4900, 1500, 2000, 1500, 2000, 1000, 3000, 2000, 6000, 4000],
                    borderColor: "green",
                    backgroundColor: "lightgreen",
                  },
                ],
              }}
              options={chartOptions}
            />
          </div>
        </div>
 
        <div style={style.containerStyle}>
          <h3><IoIosHourglass style={{ marginRight: '8px' }} /> Average API Response Time</h3>
          <div style={{ height: getChartHeight() }}>
            <Bar
              data={{
                labels: ["User 1", "User 2", "User 3", "User 4", "User 5", "User 6", "User 7", "User 8", "User 9", "User 10"],
                datasets: [
                  {
                    label: "Avg Duration (ms)",
                    data: [200, 350, 150],
                    backgroundColor: "orange",
                  },
                ],
              }}
              options={chartOptions}
            />
          </div>
        </div>
 
        <div style={style.containerStyle}>
          <h3><FaChartPie style={{ marginRight: '8px' }}  /> Success vs Failed Requests</h3>
          <div style={{ height: getChartHeight() }}>
            <Pie
              data={{
                labels: ["Success Request", "Failed Request"],
                datasets: [
                  {
                    data: [100884, 289],
                    backgroundColor: ["green", "red"],
                  },
                ],
              }}
              options={chartOptions}
            />
          </div>
        </div>
 
        <div style={style.containerStyle}>
          <h3><FaFireFlameCurved style={{ marginRight: '8px' }} /> Peak Request Hours</h3>
          <div style={{ height: getChartHeight() }}>
            <Bar
              data={{
                labels: ["buzz-api/app-config", "buzz-api/customer/profile", "buzz-api/custmoer/fcm", "buzz-api/incoming-call-history", "buzz-api/country", "buzz-api/send-otp", "buzz-api/verify-otp", "buzz-api/user/login", "buzz-api/user/logout"],
                datasets: [
                  {
                    label: "Requests",
                    data: [38000,15000,12000,7000,3000, 800, 800, 800, 800],
                    backgroundColor: "purple",
                  },
                ],
              }}
              options={chartOptions}
            />
          </div>
        </div>
 
        <div style={style.containerStyle}>
          <h3><FaCalendarAlt style={{ marginRight: '8px' }} />Active Users Per Date</h3>
          <div style={{ height: getChartHeight() }}>
            <Bar
              data={{
                labels: ["2025-04-17", "2025-04-20", "2025-04-22", "2025-4-24","2025-05-2","2025-05-12","2025-05-19","2025-05-25","2025-05-30","2025-06-05","2025-06-10","2025-06-15","2025-06-20","2025-06-25","2025-06-30"],
                datasets: [
                  {
                    data: [10, 7, 22, 15, 20, 25, 3, 3, 4, 5, 6, 7, 8, 8, 25, 3, 10, 10],
                    backgroundColor: ["#00BFFF"],
                  },
                ],
              }}
              options={chartOptions}
            />
          </div>
        </div>
      </div>
     
      {/* ✅ Bottom summary section */}
      <div style={style.summaryContainer}>
        <div style={style.cardContainer}>
          <div style={style.bottomStyle}>
            <h4>Total Users</h4>
            <p style={{
              fontSize: isMobile ? "18px" : "22px",
              fontWeight: "bold",
              color: "#007bff",
              marginTop: "8px"
            }}>140</p>
          </div>
 
          <div style={style.bottomStyle}>
            <h4>Android Users</h4>
            <p style={{
              fontSize: isMobile ? "18px" : "22px",
              fontWeight: "bold",
              color: "green",
              marginTop: "8px"
            }}>131</p>
          </div>
 
          <div style={style.bottomStyle}>
            <h4>iOS Users</h4>
            <p style={{
              fontSize: isMobile ? "18px" : "22px",
              fontWeight: "bold",
              color: "red",
              marginTop: "8px"
            }}>9</p>
          </div>
        </div>
      </div>
      {/* ApiLogs is now a separate route */}
    </div>
  );
}
 
export default Dashboard;