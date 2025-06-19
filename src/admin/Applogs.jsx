import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { MdOutlineClose } from "react-icons/md";
import { IoMdCheckmark, IoMdArrowDropdown } from "react-icons/io";
import { LuRefreshCcw } from "react-icons/lu";
import { FcSearch } from "react-icons/fc";
import { AppLogUrl} from "../components/Constant";
// Custom Dropdown Component
const CustomDropdown = ({ options, value, onChange, width = "120px" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
 
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
 
  const handleSelect = (option) => {
    onChange(option.value);
    setIsOpen(false);
  };
 
  // Find the selected option object
  const selectedOption = options.find(option => option.value === value) || options[0];
 
  return (
    <div
      ref={dropdownRef}
      style={{
        position: "relative",
        width,
        userSelect: "none"
      }}
    >
      {/* Dropdown Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px 12px",
          border: "1px solid #FF6B00",
          borderRadius: "6px",
          backgroundColor: "white",
          cursor: "pointer",
          height: "30px",
          width: "100%",
          boxSizing: "border-box",
          fontSize: "14px",
          fontWeight: "500",
          color: "#FF6B00",
          transition: "all 0.2s ease",
          boxShadow: "0 1px 2px rgba(255,107,0,0.1)"
        }}
      >
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          minWidth: "80px",
          maxWidth: "80%"
        }}>
          {selectedOption.icon &&
            <span style={{ marginRight: "8px", display: "flex", alignItems: "center" }}>{selectedOption.icon}</span>
          }
          {selectedOption.label}
        </div>
        <IoMdArrowDropdown style={{ fontSize: "20px", color: "#FF6B00", marginLeft: "5px", flexShrink: 0 }} />
      </div>
 
      {/* Dropdown Menu */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
            backgroundColor: "white",
            border: "1px solid #FF6B00",
            borderRadius: "8px",
            marginTop: "4px",
            zIndex: 10,
            boxShadow: "0 4px 12px rgba(255,107,0,0.15)",
            overflow: "hidden"
          }}
        >
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleSelect(option)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 12px",
                height: "30px",
                boxSizing: "border-box",
                cursor: "pointer",
                backgroundColor: "white",
                borderBottom: index < options.length - 1 ? "1px solid #eee" : "none",
                transition: "all 0.2s ease",
                fontSize: "14px",
                fontWeight: option.value === value ? "500" : "400",
                color: "#FF6B00",
                borderLeft: option.value === value ? "3px solid #FF6B00" : "3px solid transparent",
                whiteSpace: "nowrap",
                minWidth: "80px"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#fff4ee";
                e.currentTarget.style.color = "#FF6B00";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "white";
                e.currentTarget.style.color = "#FF6B00";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                {option.icon &&
                  <span style={{ marginRight: "8px", display: "flex", alignItems: "center" }}>{option.icon}</span>
                }
                {option.label}
              </div>
              {option.value === value && (
                <IoMdCheckmark style={{ color: "#FF6B00", fontSize: "18px", marginLeft: "auto" }} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
 
const AppLogs = () => {
  const [logs, setLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [logsPerPage, setLogsPerPage] = useState(25); // Default value
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
 
  // Fetch logs from API
  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      try {
        // Use the current page and logs per page in the API request
        const response = await axios.get(
          `${AppLogUrl}-applogs?page=${currentPage}&limit=${logsPerPage}&search=${searchTerm}`
        );
       
        // Extract data from the response
        const { logs, currentPage: apiCurrentPage, totalPages: apiTotalPages, totalRecords: apiTotalRecords } = response.data;
       
        // Update state with API response data
        setLogs(logs || []);
        setCurrentPage(apiCurrentPage);
        setTotalPages(apiTotalPages);
        setTotalRecords(apiTotalRecords);
      } catch (error) {
        console.error("Error fetching logs:", error);
        setLogs([]);
      } finally {
        setLoading(false);
      }
    };
 
    fetchLogs();
    // Re-fetch when page, logs per page, or search term changes
  }, [currentPage, logsPerPage, searchTerm]);
 
  // Handle search with debounce
  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page when searching
  };
 
  // We don't need to filter logs manually as the API handles filtering
  const currentLogs = logs;
 
  // These functions now trigger API calls through the useEffect dependency
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };
 
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };
 
  // Debounced search function
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };
 
  // Create debounced search handler
  const debouncedSearch = useRef(
    debounce((value) => {
      handleSearch(value);
    }, 500)
  ).current;
 
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
         
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>Application Logs</h2>
         
        </div>
      </div>
 
      {/* Filters */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "stretch", /* Changed to stretch to align heights */
          gap: "15px",
          marginBottom: "20px",
          flexWrap: "wrap",
          margin: "0 auto 20px auto",
        }}
      >
        <div style={{ flex: "1", maxWidth: "300px", position: "relative" }}>
          <div style={{
            position: "absolute",
            left: "8px",
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            alignItems: "center",
            pointerEvents: "none"
          }}>
            <FcSearch />
          </div>
          <input
            type="text"
            placeholder="Search by Phone Number..."
            style={{
              width: "100%",
              padding: "8px 8px 8px 32px", /* Added left padding for the icon */
              border: "1px solid #FF6B00",
              borderRadius: "6px",
              height: "30px", /* Match height with dropdowns */
              boxSizing: "border-box",
              fontSize: "14px",
              color: "#FF6B00",
              outline: "none",
            }}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              debouncedSearch(e.target.value);
            }}
          />
        </div>
 
      </div>
 
      {/* Logs Table */}
      <div style={{ overflowX: "auto",height:"400px" , overflowY: "auto"}}>
        {loading ? (
          <div style={{
            textAlign: "center",
            padding: "30px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            marginBottom: "20px"
          }}>
            <div style={{
              display: "inline-block",
              width: "40px",
              height: "40px",
              border: "4px solid #f3f3f3",
              borderTop: "4px solid #FF6B00",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              marginBottom: "15px"
            }} />
            <p style={{ fontSize: "18px", color: "#666" }}>
              Loading logs...
            </p>
            <style>
              {`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}
            </style>
          </div>
        ) : logs.length === 0 ? (
          <div style={{
            textAlign: "center",
            padding: "30px",
            backgroundColor: "#f8f8f8",
            borderRadius: "8px",
            border: "1px solid #ddd",
            marginBottom: "20px"
          }}>
            <p style={{ fontSize: "18px", color: "#666" }}>
              {searchTerm ?
                `No application logs found matching "${searchTerm}".` :
                "No application logs found."}
            </p>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{"position": "sticky", "top": "0",zIndex: "1"}}>
              <tr
                style={{
                  backgroundColor: "#FF6B00",
                  color: "white",
                  textAlign: "left",
                }}
              >
                <th style={cellStyle}>Phone Number</th>
                <th style={cellStyle}>Screen Name</th>
                <th style={cellStyle}>Log Text</th>
                <th style={cellStyle}>Log Date Time</th>
              </tr>
            </thead>
            <tbody>
              {currentLogs.map((log, index) => (
                <tr key={index} style={{ borderBottom: "1px solid #ccc" }}>
                  <td style={cellStyle}>{log.phoneNumber || "N/A"}</td>
                  <td style={cellStyle}>{log.screenName || "N/A"}</td>
                  <td style={cellStyle}>{log.logText || "N/A"}</td>
                  <td style={cellStyle}>
                    {log.logDateTime ? new Date(log.logDateTime).toLocaleString() : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
 
      {/* Pagination and Items Per Page - only show when there are logs and not loading */}
      {!loading && logs.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginTop: "30px",
            marginBottom: "20px",
            gap: "20px",
          }}
        >
          {/* Items Per Page Dropdown */}
          <div style={{
            width: "auto",
            height: "40px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            backgroundColor: "transparent",
            color: "#FF6B00",
            padding: "6px 12px",
            borderRadius: "8px"
          }}>
            <label style={{
              fontSize: "14px",
              fontWeight: "500",
              color: "#FF6B00",
              whiteSpace: "nowrap",
              marginRight: "5px"
            }}>
              Show:
            </label>
            <CustomDropdown
              value={logsPerPage.toString()}
              onChange={(value) => {
                setLogsPerPage(Number(value));
                setCurrentPage(1); // Reset to first page when changing items per page
              }}
              width="120px"
              options={[
                { value: "25", label: "25 items" },
                { value: "10", label: "10 items" },
              ]}
            />
          </div>
 
          {/* Pagination Controls */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            backgroundColor: "transparent",
            color: "#FF6B00",
            padding: "6px 12px",
            borderRadius: "8px"
          }}>
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              style={{
                backgroundColor: "transparent",
                color: "#FF6B00",
                border: "1px solid #FF6B00",
                padding: "4px 10px",
                borderRadius: "4px",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                fontWeight: "bold",
                opacity: currentPage === 1 ? 0.7 : 1,
              }}
            >
              ← Prev
            </button>
            <span style={{ fontWeight: "bold", fontSize: "14px", color: "#FF6B00" }}>
              Page {currentPage} of {totalPages || 1}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages || totalPages === 0}
              style={{
                backgroundColor: "transparent",
                color: "#FF6B00",
                border: "1px solid #FF6B00",
                padding: "4px 10px",
                borderRadius: "4px",
                cursor: currentPage === totalPages || totalPages === 0 ? "not-allowed" : "pointer",
                fontWeight: "bold",
                opacity: currentPage === totalPages || totalPages === 0 ? 0.7 : 1,
              }}
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
 
const cellStyle = {
  padding: "10px",
  border: "1px solid #ddd",
  verticalAlign: "top",
};
 
export default AppLogs;
 