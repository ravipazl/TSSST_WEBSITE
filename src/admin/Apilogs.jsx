import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
// Link is not used, so it can be removed
// import { Link } from "react-router-dom"; 
import { MdOutlineClose } from "react-icons/md";
import { IoMdCheckmark, IoMdArrowDropdown } from "react-icons/io";
import { LuRefreshCcw } from "react-icons/lu";
import { FcSearch } from "react-icons/fc";
import { AppLogUrl } from "../components/Constant";
// Custom Dropdown Component (No changes needed here, it's well-written)
// Custom Dropdown Component
const CustomDropdown = ({ options, value, onChange, width = "120px", justifyContent = "flex-start" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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
      {/* Main Dropdown Button */}
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
        {/* Container for the selected item's label and icon */}
        <div style={{ 
          display: "flex", 
          alignItems: "center",
          // FIX: Use the 'justifyContent' prop here instead of a hardcoded value.
          // This allows the caller to decide the alignment (e.g., 'center' for "Items per page").
          justifyContent: justifyContent, 
          // We also make this container flexible to take up the available space.
          flex: 1, 
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}>
          {selectedOption.icon && 
            <span style={{ marginRight: "8px", display: "flex", alignItems: "center" }}>{selectedOption.icon}</span>
          }
          {selectedOption.label}
        </div>
        
        {/* The Arrow Icon */}
        <IoMdArrowDropdown style={{ fontSize: "20px", color: "#FF6B00", marginLeft: "5px", flexShrink: 0 }} />
      </div>

      {/* Dropdown Menu (This part was already correct) */}
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
              }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "#fff4ee"; }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "white"; }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: justifyContent, flex: 1 }}>
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

// --- Your full ApiLogs component with the corrected CustomDropdown ---
// You can replace your entire file with this code.

const ApiLogs = () => {
  const [logs, setLogs] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [logsPerPage, setLogsPerPage] = useState(25); 
  const [loading, setLoading] = useState(true);


  const fetchLogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(AppLogUrl, {
        params: {
          page: currentPage,
          limit: logsPerPage,
          search: searchTerm,
          status: statusFilter,
        },
      });
      if (response.data && response.data.logs && Array.isArray(response.data.logs)) {
        setLogs(response.data.logs);
        setTotalPages(response.data.totalPages || 1);
      } else {
        console.warn("API response format unexpected:", response.data);
        setLogs([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching logs:", error);
      setLogs([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
        fetchLogs();
    }, 300);
    return () => {
        clearTimeout(handler);
    };
  }, [statusFilter, searchTerm, currentPage, logsPerPage]);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>API Logs</h2>
      </div>

      {/* Filters */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "stretch",
          gap: "15px",
          marginBottom: "20px",
          flexWrap: "wrap",
          margin: "0 auto 20px auto",
        }}
      >
        <div style={{ width: "150px" }}>
          <CustomDropdown
            value={statusFilter}
            onChange={(value) => {
              setStatusFilter(value);
              setCurrentPage(1);
            }}
            width="100%"
            options={[
              {
                value: "",
                label: "All Status",
                icon: (
                  <LuRefreshCcw style={{ color: "blue", fontSize: "18px" }} />
                ),
              },
              {
                value: "success",
                label: "Success",
                icon: (
                  <IoMdCheckmark style={{ color: "green", fontSize: "18px" }} />
                ),
              },
              {
                value: "failed",
                label: "Failed",
                icon: (
                  <MdOutlineClose style={{ color: "red", fontSize: "18px" }} />
                ),
              },
            ]}
          />
        </div>
        <div style={{ flex: "1", maxWidth: "300px", position: "relative" }}>
          <div
            style={{
              position: "absolute",
              left: "8px",
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              alignItems: "center",
              pointerEvents: "none",
              color: "#FF6B00",
            }}
          >
            <FcSearch style={{ fontSize: "18px" }} />
          </div>
          <input
            type="text"
            placeholder="Search by Phone Number..."
            style={{
              width: "100%",
              padding: "8px 8px 8px 32px",
              border: "1px solid #FF6B00",
              borderRadius: "6px",
              height: "30px",
              boxSizing: "border-box",
              fontSize: "14px",
              color: "#FF6B00",
              outline: "none",
            }}
            onFocus={(e) => {
              e.target.style.boxShadow = "0 0 0 2px rgba(255,107,0,0.2)";
            }}
            onBlur={(e) => {
              e.target.style.boxShadow = "0 1px 2px rgba(255,107,0,0.1)";
            }}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* Logs Table */}
      <div style={{ overflowX: "auto", maxHeight: "400px", overflowY: "auto" ,border: "1px solid #ddd"}}>
        {loading ? (
          <div
            style={{
              textAlign: "center",
              padding: "30px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                display: "inline-block",
                width: "40px",
                height: "40px",
                border: "4px solid #f3f3f3",
                borderTop: "4px solid #FF6B00",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                marginBottom: "15px",
              }}
            />
            <p style={{ fontSize: "18px", color: "#666" }}>Loading logs...</p>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          </div>
        ) : logs.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "30px",
              backgroundColor: "#f8f8f8",
              borderRadius: "8px",
              border: "1px solid #ddd",
              marginBottom: "20px",
            }}
          >
            <p style={{ fontSize: "18px", color: "#666" }}>No logs found.</p>
          </div>
        ) : (
          <table style={{ width: "100%" }}>
            <thead style={{ position: "sticky", top: 0, zIndex: 1 }}>
              <tr
                style={{
                  backgroundColor: "#FF6B00",
                  color: "white",
                  textAlign: "center",
                }}
              >
                <th style={cellStyle}>Phone Number</th>
                <th style={cellStyle}>API Name</th>
                <th style={cellStyle}>Status Code</th>
                <th style={cellStyle}>Request Time</th>
                <th style={cellStyle}>Response Time</th>
                <th style={cellStyle}>Device Details</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => {
                const userName = log.phoneNumber || "N/A";
                const apiName = log.apiName || "N/A";
                const status = log.statusCode || "N/A";
                const requestTime = log.requestTime
                  ? new Date(log.requestTime).toLocaleString()
                  : "N/A";
                const responseTime = log.responseTime
                  ? new Date(log.responseTime).toLocaleString()
                  : "N/A";
                const deviceDetails = log.deviceDetails || {};
                const isSuccess = status >= 200 && status < 300;

                return (
                  <tr key={index} style={{ borderBottom: "1px solid #ccc" }}>
                    <td style={cellStyle}>{userName}</td>
                    <td style={cellStyle}>{apiName}</td>
                    <td
                      style={{
                        ...cellStyle,
                        color: isSuccess ? "green" : "red",
                        fontWeight: "bold",
                      }}
                    >
                      {isSuccess ? (
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <IoMdCheckmark style={{ marginRight: "4px" }} />{" "}
                          {status.valueOf() === 200 ? "Success" : status}
                        </span>
                      ) : (
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <MdOutlineClose style={{ marginRight: "4px" }} />{" "}
                          {status.valueOf() === 404
                            ? "Failed"
                            : status}
                        </span>
                      )}
                    </td>
                    <td style={cellStyle}>{requestTime}</td>
                    <td style={cellStyle}>{responseTime}</td>
                    <td style={cellStyle}>
                      <pre
                        style={{
                          margin: 0,
                          whiteSpace: "pre-wrap",
                          fontSize: "12px",
                        }}
                      >
                        {Object.keys(deviceDetails).length > 0
                          ? JSON.stringify(deviceDetails, null, 2)
                          : "N/A"}
                      </pre>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
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
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <label
              style={{
                fontSize: "14px",
                fontWeight: "500",
                color: "#FF6B00",
                whiteSpace: "nowrap",
              }}
            >
              Items per page:
            </label>
            <CustomDropdown
              value={logsPerPage.toString()}
              onChange={(value) => {
                setLogsPerPage(Number(value));
                setCurrentPage(1);
              }}
              justifyContent="center"
              width="100px"
              options={[
                { value: "25", label: "25" },
                { value: "10", label: "10" },
              ]}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              style={{
                ...buttonStyle,
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                opacity: currentPage === 1 ? 0.7 : 1,
              }}
            >
              ← Prev
            </button>
            <span
              style={{ fontWeight: "bold", fontSize: "14px", color: "#FF6B00" }}
            >
              Page {currentPage} of {totalPages || 1}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages || totalPages === 0}
              style={{
                ...buttonStyle,
                cursor:
                  currentPage === totalPages || totalPages === 0
                    ? "not-allowed"
                    : "pointer",
                opacity:
                  currentPage === totalPages || totalPages === 0 ? 0.7 : 1,
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
  padding: "12px 15px",
  borderBottom: "1px solid #ddd",
  fontSize: "14px",
  verticalAlign: 'top'
};

const buttonStyle = {
  backgroundColor: "transparent",
  color: "#FF6B00",
  border: "1px solid #FF6B00",
  padding: "6px 12px",
  borderRadius: "4px",
  fontWeight: "bold",
};

export default ApiLogs;