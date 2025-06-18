import React, { useState, useEffect } from "react";
import axios from "axios";
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
import { FaCalendarAlt, FaSyncAlt } from 'react-icons/fa';
 
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
      marginBottom: "30px",
    },
 
    cardContainer: {
      display: "flex",
      justifyContent: "s",
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
  const [activeuserlabels, setActiveuserlabels] = useState([]);
  const [activecountusers, setActivecountuser] = useState([]);
  const [activedatelabels, setActivedatelabels] = useState([]);
  const [activecountdate, setActivecountdate] = useState([]);
  const [activetimeduration, setActivetimeduration] = useState([]);
  const [activeurls, setActiveurls] = useState([]);
  const [activesuccess, setActivesuccess] = useState({ success_count: 0, failure_count: 0 });
  const [activemostapicalls, setActivemostapicalls] = useState([]);
  const [activemostapiurl, setActivemostapiurl] = useState([]);
  const [request_date, setRequest_date] = useState([]);
  const [active_user, setActive_user] = useState([]);
  const [userCounts, setUserCounts] = useState({ totalusers: 0, androidusers: 0, iosusers: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
 
 
 
 
 
  // Function to fetch all data
  const fetchAllData = () => {
    setLoading(true);
    setError(null);
   
    // Fetch user API data
    axios.get("https://buzz.pazl.info/buzz-api/all-analytics")
      .then((res) => {
        const apidata = res.data.userApiData;
        setActiveuserlabels(apidata.map((item) => item.phoneNumber));
        setActivecountuser(apidata.map((item) => item.total_calls));
       
        // API Trends
        const trendsData = res.data.apiTrends;
        setActivedatelabels(trendsData.map((item) => item.request_date));
        setActivecountdate(trendsData.map((item) => item.total_calls));
       
        // Average Duration
        const durationData = res.data.avgDuration;
        setActivetimeduration(durationData.map((item) => item.avg_duration));
        setActiveurls(durationData.map((item) => item.url));
       
        // Status Count
        const statusData = res.data.statusCount;
        setActivesuccess({
          success_count: Number(statusData.success_count),
          failure_count: Number(statusData.failure_count),
        });
       
        // Most Used APIs
        const mostUsedData = res.data.mostUsedApis;
        setActivemostapicalls(mostUsedData.map((item) => item.total_calls));
        setActivemostapiurl(mostUsedData.map((item) => item.url));
       
        // Active Users By Date
        const activeUserData = res.data.activeUsersByDate;
        setRequest_date(activeUserData.map((item) => item.request_date));
        setActive_user(activeUserData.map((item) => item.active_users));
       
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to load analytics data. Please try again later.");
        setLoading(false);
      });
     
    // Fetch user counts
    axios.get("https://buzz.pazl.info/buzz-api/user-counts")
      .then((res) => {
        const coundata = res.data.data;
        console.log(coundata);
        setUserCounts({
          totalusers: Number(coundata.totalUsers || 0),
          androidusers: Number(coundata.androidUsers || 0),
          iosusers: Number(coundata.iosUsers || 0),
        });
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to load user statistics. Please try again later.");
      });
  };
 
 
  const LoadingSpinner = () => (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: getChartHeight(),
      flexDirection: 'column'
    }}>
      {/* <div style={{
        width: '40px',
        height: '40px',
        border: '4px solid rgba(0, 0, 0, 0.1)',
        borderRadius: '50%',
        borderTop: '4px solid #007bff',
        animation: 'spin 1s linear infinite'
      }} /> */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <p style={{ marginTop: '10px', color: '#666' }}>Loading data...</p>
    </div>
  );
 
  // Fetch data on component mount
  useEffect(() => {
    fetchAllData();
  }, []);
 
 
 
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
 
     
      <div style={style.summaryContainer}>
        <div style={style.cardContainer}>
          <div style={style.bottomStyle}>
            <h4>Total Users</h4>
            <p style={{
              fontSize: isMobile ? "18px" : "22px",
              fontWeight: "bold",
              color: "#007bff",
              marginTop: "8px"
            }}>{userCounts.totalusers}</p>
          </div>
 
          <div style={style.bottomStyle}>
            <h4>Android Users</h4>
            <p style={{
              fontSize: isMobile ? "18px" : "22px",
              fontWeight: "bold",
              color: "green",
              marginTop: "8px"
            }}>{userCounts.androidusers}</p>
          </div>
 
          <div style={style.bottomStyle}>
            <h4>iOS Users</h4>
            <p style={{
              fontSize: isMobile ? "18px" : "22px",
              fontWeight: "bold",
              color: "red",
              marginTop: "8px"
            }}>{userCounts.iosusers}</p>
          </div>
        </div>
      </div>
     
     
 
      {/* Error message display */}
      {error && (
        <div style={{
          backgroundColor: '#f8d7da',
          color: '#721c24',
          padding: '10px 15px',
          borderRadius: '4px',
          marginBottom: '15px',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px'
        }}>
          <span style={{ fontWeight: 'bold' }}>⚠️</span>
          {error}
        </div>
      )}
     
      <div style={style.rowStyle}>
        <div style={style.containerStyle}>
          <h3><FcBarChart style={{ marginRight: '8px' }} />API Calls per User</h3>
          <div style={{ height: getChartHeight() }}>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <Bar
                data={{
                  labels: activeuserlabels,
                  datasets: [
                    {
                      label: "Active Users",
                      data: activecountusers,
                      backgroundColor: "blue",
                    },
                  ],
                }}
                options={chartOptions}
              />
            )}
          </div>
        </div>
 
        <div style={style.containerStyle}>
          <h3><FaChartLine style={{ marginRight: '8px' }} /> API Requests Over Time</h3>
          <div style={{ height: getChartHeight() }}>
            <Line
              data={{
                labels: activedatelabels,
                datasets: [
                  {
                    label: "Requests",
                    data: activecountdate,
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
                labels: activeurls,
                datasets: [
                  {
                    label: "Avg Duration (ms)",
                    data: activetimeduration,
                    backgroundColor: "orange",
                  },
                ],
              }}
              options={chartOptions}
            />
          </div>
        </div>
 
        <div style={style.containerStyle}>
          <h3><FaChartPie style={{ marginRight: '8px' }} /> Success vs Failed Requests</h3>
          <div style={{ height: getChartHeight() }}>
            {activesuccess.success_count !== undefined && activesuccess.failure_count !== undefined && (
              <Pie
                data={{
                  labels: ["Success Request", "Failed Request"],
                  datasets: [
                    {
                      data: [activesuccess.success_count, activesuccess.failure_count],
                      backgroundColor: ["green", "red"],
                    },
                  ],
                }}
                options={chartOptions}
              />
            )}
 
          </div>
        </div>
 
 
        <div style={style.containerStyle}>
          <h3><FaFireFlameCurved style={{ marginRight: '8px' }} /> Peak Request Hours</h3>
          <div style={{ height: getChartHeight() }}>
            <Bar
              data={{
                labels: activemostapiurl,
                datasets: [
                  {
                    label: "Requests",
                    data: activemostapicalls,
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
                labels: request_date,
                datasets: [
                  {
                    data: active_user,
                    backgroundColor: ["#00BFFF"],
                  },
                ],
              }}
              options={chartOptions}
            />
          </div>
        </div>
      </div>
 
     
 
    </div>
  );
}
 
export default Dashboard;