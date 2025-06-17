import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdOutlineClose } from "react-icons/md";
import { IoMdCheckmark, IoMdArrowDropdown } from "react-icons/io";
import { LuRefreshCcw } from "react-icons/lu";
import { FcSearch } from "react-icons/fc";
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
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          backgroundColor: "white",
          cursor: "pointer",
          height: "36px",
          boxSizing: "border-box"
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {selectedOption.icon && 
            <span style={{ marginRight: "8px", display: "flex", alignItems: "center" }}>{selectedOption.icon}</span>
          }
          {selectedOption.label}
        </div>
        <IoMdArrowDropdown style={{ fontSize: "20px" }} />
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
            border: "1px solid #ccc",
            borderRadius: "4px",
            marginTop: "4px",
            zIndex: 10,
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
          }}
        >
          {options.map((option, index) => (
            <div 
              key={index}
              onClick={() => handleSelect(option)}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px",
                height: "36px",
                boxSizing: "border-box",
                cursor: "pointer",
                backgroundColor: option.value === value ? "#f0f0f0" : "white",
                borderBottom: index < options.length - 1 ? "1px solid #eee" : "none",
                transition: "background-color 0.2s"
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f5f5f5"}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = option.value === value ? "#f0f0f0" : "white"}
            >
              {option.icon && 
                <span style={{ marginRight: "8px", display: "flex", alignItems: "center" }}>{option.icon}</span>
              }
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ApiLogs = () => {
  const [logs, setLogs] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [logsPerPage, setLogsPerPage] = useState(2); // Default value
  const [loading, setLoading] = useState(true);

  // Fetch logs from API
  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://mocki.io/v1/b0ecaa35-d872-47a3-8dc4-1fc946a4fe1b"
        );
        setLogs(response.data);
      } catch (error) {
        console.error("Error fetching logs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  // Filter logs
  const filteredLogs = logs.filter((log) => {
    const matchesStatus =
      statusFilter === "All" ||
      log.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesSearch =
      searchTerm === "" ||
      log.userName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div style={{ padding: "20px"}}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>API Logs</h2>
      </div>

      {/* Filters */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "stretch", /* Changed to stretch to align heights */
          gap: "15px",
          marginBottom: "20px",
          flexWrap: "wrap",
          maxWidth: "800px",
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
            placeholder="Search by User Name..."
            style={{
              width: "100%",
              padding: "8px 8px 8px 32px", /* Added left padding for the icon */
              border: "1px solid #ccc",
              borderRadius: "4px",
              height: "36px", /* Fixed height to match dropdowns */
              boxSizing: "border-box",
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div style={{ width: "150px" }}>
          <CustomDropdown
            value={statusFilter}
            onChange={(value) => setStatusFilter(value)}
            width="100%"
            options={[
              { value: "All", label: "All Status", icon: <LuRefreshCcw style={{color: "blue", fontSize: "18px"}}/> },
              { value: "Success", label: "Success", icon: <IoMdCheckmark style={{ color: "green", fontSize: "18px" }} /> },
              { value: "Failed", label: "Failed", icon: <MdOutlineClose style={{ color: "red", fontSize: "18px" }} /> }
            ]}
          />
        </div>
        {/* Logs per page selector */}
        <div style={{ width: "150px" }}>
          <CustomDropdown
            value={logsPerPage.toString()}
            onChange={(value) => {
              setLogsPerPage(Number(value));
              setCurrentPage(1); // Reset to first page when changing items per page
            }}
            width="100%"
            options={[
              { value: "2", label: "per page 2" },
              { value: "5", label: "per page 5" },
              { value: "10", label: "per page 10" },
              { value: "20", label: "per page 20" }
            ]}
          />
        </div>
      </div>

      {/* Logs Table */}
      <div style={{ overflowX: "auto" }}>
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
        ) : filteredLogs.length === 0 ? (
          <div style={{ 
            textAlign: "center", 
            padding: "30px", 
            backgroundColor: "#f8f8f8", 
            borderRadius: "8px",
            border: "1px solid #ddd",
            marginBottom: "20px"
          }}>
            <p style={{ fontSize: "18px", color: "#666" }}>
              No logs found matching your filters.
            </p>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr
                style={{
                  backgroundColor: "#FF6B00",
                  color: "white",
                  textAlign: "left",
                }}
              >
                <th style={cellStyle}>User Name</th>
                <th style={cellStyle}>API Name</th>
                <th style={cellStyle}>Status</th>
                <th style={cellStyle}>Request Time</th>
                <th style={cellStyle}>Response Time</th>
                <th style={cellStyle}>Device Details</th>
              </tr>
            </thead>
            <tbody>
              {currentLogs.map((log, index) => (
                <tr key={index} style={{ borderBottom: "1px solid #ccc" }}>
                  <td style={cellStyle}>{log.userName}</td>
                  <td style={cellStyle}>{log.apiName}</td>
                  <td
                    style={{
                      ...cellStyle,
                      color: log.status === "Success" ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {log.status === "Success" ? (
                      <span style={{ display: "flex", alignItems: "center" }}>
                        <IoMdCheckmark style={{ marginRight: "4px" }} />
                        Success
                      </span>
                    ) : (
                      <span style={{ display: "flex", alignItems: "center" }}>
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <MdOutlineClose style={{ marginRight: "4px" }} />
                          Failed
                        </span>
                      </span>
                    )}
                  </td>
                  <td style={cellStyle}>{log.requestTime}</td>
                  <td style={cellStyle}>{log.responseTime}</td>
                  <td style={cellStyle}>
                    <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
                      {JSON.stringify(log.deviceDetails, null, 2)}
                    </pre>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination - only show when there are logs and not loading */}
      {!loading && filteredLogs.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "30px",
            marginBottom: "20px",
            gap: "20px",
          }}
        >
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            style={{
              backgroundColor: "#FF6B00",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
              fontWeight: "bold",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              opacity: currentPage === 1 ? 0.7 : 1,
            }}
          >
            ← Prev
          </button>
          <span style={{ fontWeight: "bold", fontSize: "18px" }}>
            Page {currentPage} of {totalPages || 1}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages || totalPages === 0}
            style={{
              backgroundColor: "#FF6B00",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: currentPage === totalPages || totalPages === 0 ? "not-allowed" : "pointer",
              fontWeight: "bold",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              opacity: currentPage === totalPages || totalPages === 0 ? 0.7 : 1,
            }}
          >
            Next →
          </button>
        </div>
      )}
      
      {/* These components are now separate routes */}
    </div>
  );
};

const cellStyle = {
  padding: "10px",
  border: "1px solid #ddd",
  verticalAlign: "top",
};

export default ApiLogs;
