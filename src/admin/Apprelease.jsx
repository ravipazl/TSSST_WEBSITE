import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { MdOutlineClose } from "react-icons/md";
import { IoMdCheckmark, IoMdArrowDropdown } from "react-icons/io";
import { LuRefreshCcw } from "react-icons/lu";
import { FcSearch } from "react-icons/fc";
import AddAppReleaseModal from "./Appreleasemodal";
import toast from "react-hot-toast";
import { AppReleaseUrl, BaseUrl } from "../components/Constant";
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
 
const Apprelease = () => {
  const [logs, setLogs] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [logsPerPage, setLogsPerPage] = useState(25); // Default value
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Edit functionality removed
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRelease, setSelectedRelease] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
 
  // Clear success message after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);
 
  // Fetch logs from API
  const fetchLogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${AppReleaseUrl}?page=${currentPage}&limit=${logsPerPage}&search=${searchTerm}`
      );
     
      // Check if the response has the expected structure
      if (response.data && response.data.status && response.data.data && response.data.data.releases) {
        setLogs(response.data.data.releases);
       
        // Update pagination data
        setTotalPages(response.data.data.totalPages || 1);
        setTotalCount(response.data.data.totalCount || 0);
      } else {
        console.error("Unexpected API response structure:", response.data);
        setLogs([]);
        setTotalPages(1);
        setTotalCount(0);
      }
    } catch (error) {
      console.error("Error fetching logs:", error);
      setLogs([]);
      setTotalPages(1);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };
 
  useEffect(() => {
    fetchLogs();
  }, [currentPage, logsPerPage, searchTerm]);
 
  // We're using server-side filtering and pagination now
  const filteredLogs = logs;
 
  // We'll store total pages from API response
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
 
  // For display purposes
  const indexOfFirstLog = (currentPage - 1) * logsPerPage + 1;
  const currentLogs = filteredLogs;
 
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };
 
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };
 
  // Edit functionality removed
 
  // Handle delete action
  const handleDelete = (release) => {
    setSelectedRelease(release);
    setIsDeleteModalOpen(true);
  };
 
  // Handle confirm delete
  const handleConfirmDelete = async () => {
    if (!selectedRelease || !selectedRelease.id) {
      console.error("No release selected or missing ID");
      return;
    }
   
    try {
      // Make the DELETE API call
      const response = await axios.delete(`https://buzz.pazl.info/buzz-api/app-releases/${selectedRelease.id}`);
     
      if (response.data && response.data.status) {
        console.log("Delete successful:", response.data.message);
       
        // Show success message
        setSuccessMessage(`App release ${selectedRelease.version || 'selected'} deleted successfully`);
        toast.success('App  deleted successfully');
       
        // Refresh the data after successful deletion
        fetchLogs();
      } else {
        console.error("Delete failed:", response.data);
      }
    } catch (error) {
      console.error("Error deleting release:", error);
      toast.error(`Failed to delete app release ${selectedRelease.version || 'selected'}`);
    } finally {
      // Close the modal
      setIsDeleteModalOpen(false);
      setSelectedRelease(null);
    }
  };
 
  return (
    <div>
      {/* Success Message */}
      {successMessage && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "12px 20px",
            borderRadius: "4px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
            zIndex: 1000,
            animation: "fadeIn 0.3s, fadeOut 0.3s 2.7s",
            maxWidth: "300px"
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <IoMdCheckmark style={{ marginRight: "8px", fontSize: "20px" }} />
            {successMessage}
          </div>
          <style>
            {`
              @keyframes fadeIn {
                from { opacity: 0; transform: translateY(-20px); }
                to { opacity: 1; transform: translateY(0); }
              }
              @keyframes fadeOut {
                from { opacity: 1; transform: translateY(0); }
                to { opacity: 0; transform: translateY(-20px); }
              }
            `}
          </style>
        </div>
      )}
     
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          
        }}
      >
        <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>
          App Release Details
        </h2>
      </div>
 
      {/* Filters */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          width: "100%",
          marginBottom: "20px",
          gap: "20px",
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
              placeholder="Search by Version..."
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
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
 
        </div>
 
        {/* Right side - Refresh and Add buttons */}
        <div style={{ display: "flex", gap: "10px" }}>
         
         
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
      <div style={{ overflowx: "auto" ,height:"400px",overflowY: "auto"}}>
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
              No application logs found matching your filters.
            </p>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{position: "sticky", top: 0, zIndex: 1}}>
              <tr
                style={{
                  backgroundColor: "#FF6B00",
                  color: "white",
                  textAlign: "left",
                }}
              >
                <th style={cellStyle}>#</th>
                <th style={cellStyle}>OS Type</th>
                <th style={cellStyle}>Version</th>
                <th style={cellStyle}>Release Notes</th>
                <th style={cellStyle}>APK File</th>
                <th style={cellStyle}>Release Date</th>
                <th style={cellStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentLogs.map((log, index) => (
                <tr key={index} style={{ borderBottom: "1px solid #ccc" }}>
                  <td style={cellStyle}>{index + 1}</td>
                  <td style={cellStyle}>{log.osType || log.userName}</td>
                  <td style={cellStyle}>{log.version || log.apiName}</td>
                  <td style={cellStyle}>
                    <div
                      style={{
                        maxWidth: "200px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {log.releaseNotes || log.requestTime}
                    </div>
                  </td>
                  <td style={cellStyle}>
                    {log.apkFileUrl ? (
                      <a
                        href={log.apkFileUrl}
                        download={log.apkFileUrl.split('/').pop() || "app-release.apk"}
                        style={{
                          color: "#FF6B00",
                          textDecoration: "underline",
                          cursor: "pointer"
                        }}
                      >
                        download
                      </a>
                    ) : (
                      <span style={{ color: "#999", fontStyle: "italic" }}>
                        No file available
                      </span>
                    )}
                  </td>
                  <td style={cellStyle}>
                    {log.createdAt ? new Date(log.createdAt).toLocaleDateString() : (log.responseTime || "N/A")}
                  </td>
                  <td style={cellStyle}>
                    <div style={{ display: "flex", gap: "10px" }}>
                      {/* Edit button removed */}
                      <button
                        onClick={() => handleDelete(log)}
                        style={{
                          backgroundColor: "#f44336",
                          color: "white",
                          border: "none",
                          padding: "5px 15px",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "12px",
                          marginLeft: "30px"
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
 
      {/* Pagination and Items Per Page - only show when there are logs and not loading */}
      {!loading && filteredLogs.length > 0 && (
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
                setCurrentPage(1);
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
              {currentPage} of {totalPages || 1}
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
 
      {/* Add App Release Modal */}
      <AddAppReleaseModal
        isOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onClose={(success) => {
          setIsModalOpen(false);
          if (success) {
            setSuccessMessage("App release added successfully");
            toast.success('App release added successfully');
            fetchLogs(); // Refresh data if operation was successful
          }
        }}
      />
 
      {/* Edit functionality removed */}
 
      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedRelease && (
        <div style={overlayStyles}>
          <div style={{ ...modalStyles, maxWidth: "400px" }}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
              Confirm Delete
            </h2>
            <p style={{ marginBottom: "20px", textAlign: "center" }}>
              Are you sure you want to delete the app release version{" "}
              <strong>
                {selectedRelease.version || selectedRelease.apiName}
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
 
export default Apprelease;