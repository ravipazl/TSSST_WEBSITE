import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { MdOutlineClose } from "react-icons/md";
import { IoMdCheckmark, IoMdArrowDropdown } from "react-icons/io";
import { LuRefreshCcw } from "react-icons/lu";
import { FcSearch } from "react-icons/fc";
import ConfigSettingModal from "./Configsettingmodal";

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

const Configsettings = () => {
  const [logs, setLogs] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [logsPerPage, setLogsPerPage] = useState(2); // Default value
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState(null);

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
    const matchesStatus = statusFilter === "All" || 
      (log.status && log.status.toLowerCase() === statusFilter.toLowerCase());
    const matchesSearch =
      searchTerm === "" ||
      (log.configKey && log.configKey.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (log.configValue && log.configValue.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (log.userName && log.userName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (log.apiName && log.apiName.toLowerCase().includes(searchTerm.toLowerCase()));
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
  
  // Handle edit action
  const handleEdit = (config) => {
    setSelectedConfig(config);
    setIsEditModalOpen(true);
  };
  
  // Handle delete action
  const handleDelete = (config) => {
    setSelectedConfig(config);
    setIsDeleteModalOpen(true);
  };
  
  // Handle confirm delete
  const handleConfirmDelete = () => {
    // Here you would make an API call to delete the config
    console.log("Deleting config:", selectedConfig);
    
    // For now, we'll just filter it out from the local state
    setLogs(logs.filter(log => log !== selectedConfig));
    
    // Close the modal
    setIsDeleteModalOpen(false);
    setSelectedConfig(null);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>
          Configuration Settings
        </h2>
      </div>

      {/* Filters */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          marginBottom: "20px",
        }}
      >
        {/* Left side - Search and filter */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "15px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ width: "300px", position: "relative" }}>
            <div
              style={{
                position: "absolute",
                left: "8px",
                top: "50%",
                transform: "translateY(-50%)",
                display: "flex",
                alignItems: "center",
                pointerEvents: "none",
              }}
            >
              <FcSearch />
            </div>
            <input
              type="text"
              placeholder="Search by Key or Value..."
              style={{
                width: "100%",
                padding:
                  "8px 8px 8px 32px" /* Added left padding for the icon */,
                border: "1px solid #ccc",
                borderRadius: "4px",
                height: "36px" /* Fixed height to match dropdowns */,
                boxSizing: "border-box",
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
                { value: "20", label: "per page 20" },
              ]}
            />
          </div>
        </div>

        {/* Right side - Add button */}
        <div>
          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              backgroundColor: "#FF6B00",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
              height: "36px",
              display: "flex",
              alignItems: "center",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            +Add New
          </button>
        </div>
      </div>

      {/* Logs Table */}
      <div style={{ overflowX: "auto" }}>
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
            <p style={{ fontSize: "18px", color: "#666" }}>Loading configuration settings...</p>
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
            <p style={{ fontSize: "18px", color: "#666" }}>
              No configuration settings found matching your filters.
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
                <th style={cellStyle}>Key</th>
                <th style={cellStyle}>Value</th>
                <th style={cellStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentLogs.map((log, index) => (
                <tr key={index} style={{ borderBottom: "1px solid #ccc" }}>
                  <td style={cellStyle}>{log.configKey || log.userName || "APP_VERSION"}</td>
                  <td style={cellStyle}>
                    {(() => {
                      const value = log.configValue || log.apiName || "1.0.0";
                      try {
                        // Try to parse as JSON
                        const parsed = JSON.parse(value);
                        if (typeof parsed === 'object' && parsed !== null) {
                          // It's JSON, display with a badge and truncated
                          return (
                            <div>
                              <div style={{ 
                                display: "inline-block", 
                                backgroundColor: "#e0f7fa", 
                                color: "#0277bd", 
                                padding: "2px 6px", 
                                borderRadius: "4px", 
                                fontSize: "11px",
                                marginBottom: "5px"
                              }}>
                                JSON
                              </div>
                              <div style={{ 
                                maxWidth: "300px", 
                                maxHeight: "80px", 
                                overflow: "hidden", 
                                textOverflow: "ellipsis", 
                                whiteSpace: "nowrap",
                                fontFamily: "monospace",
                                fontSize: "12px",
                                backgroundColor: "#f5f5f5",
                                padding: "4px",
                                borderRadius: "4px"
                              }}>
                                {JSON.stringify(parsed).substring(0, 100)}
                                {JSON.stringify(parsed).length > 100 ? "..." : ""}
                              </div>
                            </div>
                          );
                        }
                      } catch (e) {
                        // Not JSON, display as is
                      }
                      return value;
                    })()}
                  </td>
                  <td style={cellStyle}>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <button
                        onClick={() => handleEdit(log)}
                        style={{
                          backgroundColor: "#FF6B00",
                          color: "white",
                          border: "none",
                          padding: "5px 10px",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "12px",
                          opacity: "0.7",
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(log)}
                        style={{
                          backgroundColor: "#f44336",
                          color: "white",
                          border: "none",
                          padding: "5px 10px",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "12px",
                        }}
                      >
                        Delete
                      </button>
                    </div>
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
              cursor:
                currentPage === totalPages || totalPages === 0
                  ? "not-allowed"
                  : "pointer",
              fontWeight: "bold",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              opacity: currentPage === totalPages || totalPages === 0 ? 0.7 : 1,
            }}
          >
            Next →
          </button>
        </div>
      )}

      {/* Add Config Setting Modal */}
      <ConfigSettingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Edit Config Setting Modal */}
      {selectedConfig && (
        <ConfigSettingModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedConfig(null);
          }}
          initialData={selectedConfig}
          isEditing={true}
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedConfig && (
        <div style={overlayStyles}>
          <div style={{ ...modalStyles, maxWidth: "400px" }}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
              Confirm Delete
            </h2>
            <p style={{ marginBottom: "20px", textAlign: "center" }}>
              Are you sure you want to delete the configuration key{" "}
              <strong>
                {selectedConfig.configKey || selectedConfig.apiName}
              </strong>
              ?
            </p>
            <div
              style={{ display: "flex", justifyContent: "center", gap: "15px" }}
            >
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setSelectedRelease(null);
                }}
                style={{
                  padding: "8px 16px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  background: "#f9f9f9",
                  cursor: "pointer",
                  minWidth: "100px",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                style={{
                  padding: "8px 16px",
                  borderRadius: "4px",
                  border: "none",
                  backgroundColor: "#f44336",
                  color: "#fff",
                  fontWeight: "bold",
                  cursor: "pointer",
                  minWidth: "100px",
                }}
              >
                Delete
              </button>
            </div>
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

// Modal styles
const overlayStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyles = {
  backgroundColor: "#fff",
  padding: "30px",
  borderRadius: "8px",
  width: "500px",
  position: "relative",
  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
};

export default Configsettings;