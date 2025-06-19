import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { MdOutlineClose } from "react-icons/md";
import { IoMdCheckmark, IoMdArrowDropdown } from "react-icons/io";
import { LuRefreshCcw } from "react-icons/lu";
import { FcSearch } from "react-icons/fc";
import ConfigSettingModal from "./Configsettingmodal";

import { BaseUrl } from "../components/Constant";

const Configsettings = () => {
  const [configs, setConfigs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [selectedConfig, setSelectedConfig] = useState(null);

  // Search & filters
  const [searchTerm, setSearchTerm] = useState("");
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  // Sorting
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc"); // or 'desc'

  // Refs for click-outside on dropdowns
  const dropdownRef = useRef(null);

  // Fetch all configs
  const fetchConfigs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BaseUrl}/config?search=${searchTerm}`
      );
      console.log("Fetched configs:", response.data);
      // Adapt if nested: assume array or { data: [...] }
      const arr = Array.isArray(response.data)
        ? response.data
        : response.data.data || [];
      setConfigs(arr);
    } catch (error) {
      console.error("Error fetching configs:", error);
      setConfigs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfigs();
  }, [searchTerm]);

  // --- MODAL SCROLL LOCK ---
  // This effect prevents the page body from scrolling when a modal is open.
  useEffect(() => {
    const isModalOpen =
      isCreateModalOpen || isEditModalOpen || isDeleteModalOpen;
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    // Cleanup function to reset the style when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isCreateModalOpen, isEditModalOpen, isDeleteModalOpen]);

  // Create
  const handleCreateConfig = async (configData) => {
    try {
      console.log("=== CREATING CONFIG ===");
      console.log("Data being sent to server:", configData);
      console.log("config_text:", configData.config_text);
      console.log("config_value type:", typeof configData.config_value);
      console.log("config_value content:", configData.config_value);
      
      const response = await axios.post(`${BaseUrl}/config`, configData);
      console.log("Create response:", response.data);
      console.log("Response config_value type:", typeof response.data.config_value);
      console.log("Response config_value content:", response.data.config_value);
      
      // Prepend new object
      setConfigs((prev) => [response.data, ...prev]);
      fetchConfigs();
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error("Error creating config:", error.response || error);
      const msg =
        error.response?.data?.message || "Failed to create configuration";
      alert(msg);
      throw error;
    }
  };

  // Update
  const handleUpdateConfig = async (configData) => {
    if (!selectedConfig) return;
    // Derive ID field: try id then config_id
    const configId = selectedConfig.id ?? selectedConfig.config_id;
    if (!configId) {
      alert("Cannot update: invalid config ID.");
      return;
    }
    try {
      console.log("=== UPDATING CONFIG ===");
      console.log("Config ID:", configId);
      console.log("Data being sent to server:", configData);
      console.log("config_text:", configData.config_text);
      console.log("config_value type:", typeof configData.config_value);
      console.log("config_value content:", configData.config_value);
      
      const response = await axios.put(
        `${BaseUrl}/config/${configId}`,
        configData
      );
      console.log("Update response:", response.data);
      console.log("Response config_value type:", typeof response.data.config_value);
      console.log("Response config_value content:", response.data.config_value);

      setIsEditModalOpen(false);
      fetchConfigs();
      setSelectedConfig(null);
    } catch (error) {
      console.error("Error updating config:", error.response || error);
      const msg =
        error.response?.data?.message || "Failed to update configuration";
      alert(msg);
      throw error;
    }
  };

  // Delete
  const handleConfirmDelete = async () => {
    if (!selectedConfig) return;
    const configId = selectedConfig.id ?? selectedConfig.config_id;
    if (!configId) {
      alert("Cannot delete: invalid config ID.");
      return;
    }
    try {
      await axios.delete(`${BaseUrl}/config/${configId}`);
      setConfigs((prev) =>
        prev.filter((item) => {
          const itemId = item.id ?? item.config_id;
          return itemId !== configId;
        })
      );
      setIsDeleteModalOpen(false);
      setSelectedConfig(null);
    } catch (error) {
      console.error("Error deleting config:", error.response || error);
      const msg =
        error.response?.data?.message || "Failed to delete configuration";
      alert(msg);
    }
  };

  // Handlers for opening modals
  const openEditModal = (config) => {
    setSelectedConfig(config);
    setIsEditModalOpen(true);
  };
  const openDeleteModal = (config) => {
    setSelectedConfig(config);
    setIsDeleteModalOpen(true);
  };

  // // Search/filter logic
  // const filteredConfigs = configs.filter((item) => {
  //   if (!searchTerm.trim()) return true;
  //   const key = item.config_text ?? "";
  //   // For value, convert to string
  //   let valStr = "";
  //   if (item.config_value !== undefined && item.config_value !== null) {
  //     if (typeof item.config_value === "object") {
  //       valStr = JSON.stringify(item.config_value);
  //     } else {
  //       valStr = String(item.config_value);
  //     }
  //   }
  //   const term = searchTerm.toLowerCase();
  //   return (
  //     key.toLowerCase().includes(term) ||
  //     valStr.toLowerCase().includes(term)
  //   );
  // });

  // Sorting logic
  // const sortedConfigs = React.useMemo(() => {
  //   if (!sortField) return filteredConfigs;
  //   const sorted = [...filteredConfigs].sort((a, b) => {
  //     let aVal, bVal;
  //     if (sortField === "config_text") {
  //       aVal = a.config_text ?? "";
  //       bVal = b.config_text ?? "";
  //     } else if (sortField === "config_value") {
  //       // Compare stringified
  //       const aStr = a.config_value;
  //       const bStr = b.config_value;
  //       aVal = typeof aStr === "object" ? JSON.stringify(aStr) : String(aStr);
  //       bVal = typeof bStr === "object" ? JSON.stringify(bStr) : String(bStr);
  //     } else {
  //       return 0;
  //     }
  //     if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
  //     if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
  //     return 0;
  //   });
  //   return sorted;
  // }, [filteredConfigs, sortField, sortDirection]);

  // Pagination logic
  // const totalPages = Math.max(1, Math.ceil(sortedConfigs.length / pageSize));
  // const paginatedConfigs = sortedConfigs.slice(
  //   (currentPage - 1) * pageSize,
  //   currentPage * pageSize
  // );
  // Ensure currentPage in range
  // useEffect(() => {
  //   if (currentPage > totalPages) {
  //     setCurrentPage(totalPages);
  //   }
  // }, [totalPages, currentPage]);

  // CustomDropdown for page size or sorting
  const CustomDropdown = ({ options, value, onChange, width = "120px" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
      const handleClickOutside = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedOption = options.find((opt) => opt.value === value);

    return (
      <div
        ref={ref}
        style={{
          position: "relative",
          width,
          userSelect: "none",
        }}
      >
        <div
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            border: "1px solid #FF6B00",
            borderRadius: "6px",
            padding: "8px 12px",
            cursor: "pointer",
            backgroundColor: "#fff",
            height: "30px",
            boxSizing: "border-box",
            fontSize: "14px",
            fontWeight: "500",
            color: "#FF6B00",
            transition: "all 0.2s ease",
          }}
        >
          <span>{selectedOption ? selectedOption.label : "Select"}</span>
          <IoMdArrowDropdown
            style={{
              fontSize: "20px",
              color: "#FF6B00",
              marginLeft: "5px",
              flexShrink: 0,
            }}
          />
        </div>
        {isOpen && (
          <ul
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              backgroundColor: "#fff",
              border: "1px solid #FF6B00",
              borderRadius: "8px",
              maxHeight: "150px",
              overflowY: "auto",
              zIndex: 100,
              marginTop: "4px",
              listStyle: "none",
              padding: 0,
            }}
          >
            {options.map((opt) => (
              <li
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                style={{
                  padding: "8px 12px",
                  cursor: "pointer",
                  backgroundColor: value === opt.value ? "#fff4ee" : "#fff",
                  borderBottom: "1px solid #eee",
                  transition: "all 0.2s ease",
                  fontSize: "14px",
                  fontWeight: opt.value === value ? "500" : "400",
                  color: "#FF6B00",
                  borderLeft:
                    opt.value === value
                      ? "3px solid #FF6B00"
                      : "3px solid transparent",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#fff4ee";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor =
                    value === opt.value ? "#fff4ee" : "#fff";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {opt.label}
                  {opt.value === value && (
                    <IoMdCheckmark
                      style={{
                        color: "#FF6B00",
                        fontSize: "18px",
                        marginLeft: "auto",
                      }}
                    />
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  // Styles for table, buttons, modals, etc.
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
  };

  const headerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "20px",
    flexShrink: 0, // Prevent header from shrinking
  };

  const buttonStyle = {
    padding: "8px 16px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#FF6B00",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "14px",
    minWidth: "100px",
    transition: "all 0.2s ease",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
  };

  const cellStyle = {
    padding: "10px",
    border: "1px solid #ddd",
    verticalAlign: "top",
  };

  const actionButton = {
    padding: "6px 12px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "500",
    transition: "all 0.2s ease",
  };

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
    backgroundColor: "white", // Changed for better visibility
    padding: "30px",
    borderRadius: "8px",
    width: "400px",
    position: "relative",
    border: "1px solid #FF6B00",
  };

  return (
    <div style={containerStyle}>
      {/* Header: title, search, refresh, Add New */}
      <div style={headerStyle}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>
            Config Settings
          </h2>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            width: "100%",
            marginBottom: "10px",
            gap: "20px",
          }}
        >
          <div style={{ position: "relative", maxWidth: "300px" }}>
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
              placeholder="Search configurations..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              style={{
                width: "100%",
                padding:
                  "8px 8px 8px 32px" /* Added left padding for the icon */,
                border: "1px solid #FF6B00",
                borderRadius: "6px",
                height: "30px" /* Match height with dropdowns */,
                boxSizing: "border-box",
                fontSize: "14px",
                color: "#FF6B00",
                outline: "none",
              }}
            />
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            style={{
              ...buttonStyle,
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
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#e66000";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#FF6B00";
            }}
          >
            Add New
          </button>
        </div>
      </div>

      {/* Table Area: This div will grow and maintain fixed height */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
          maxHeight: "100vh",
        }}
      >
        <div style={{ overflowx: "auto", height: "400px", overflowY: "auto" }}>
          {loading ? (
            <div
              style={{
                textAlign: "center",
                padding: "30px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
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
              <p style={{ fontSize: "18px", color: "#666" }}>
                Loading configurations...
              </p>
              <style>
                {`@keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                  }`}
              </style>
            </div>
          ) : (
            <table style={tableStyle}>
              <thead
                style={{
                  backgroundColor: "#FF6B00",
                  color: "white",
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                }}
              >
                <tr
                  style={{
                    backgroundColor: "#FF6B00",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  <th
                    style={cellStyle}
                    onClick={() => {
                      if (sortField === "config_text") {
                        setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
                      } else {
                        setSortField("config_text");
                        setSortDirection("asc");
                      }
                    }}
                  >
                    Key{" "}
                    {sortField === "config_text"
                      ? sortDirection === "asc"
                        ? "▲"
                        : "▼"
                      : ""}
                  </th>
                  <th
                    style={cellStyle}
                    onClick={() => {
                      if (sortField === "config_value") {
                        setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
                      } else {
                        setSortField("config_value");
                        setSortDirection("asc");
                      }
                    }}
                  >
                    Value{" "}
                    {sortField === "config_value"
                      ? sortDirection === "asc"
                        ? "▲"
                        : "▼"
                      : ""}
                  </th>
                  <th style={cellStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {configs.length === 0 ? (
                  <tr>
                    <td
                      colSpan={3}
                      style={{
                        ...cellStyle,
                        textAlign: "center",
                        padding: "20px",
                      }}
                    >
                      No configurations found.
                    </td>
                  </tr>
                ) : (
                  configs.map((item) => {
                    const itemId = item.id ?? item.config_id;
                    // Display value: if object, JSON-stringify in one line (or truncated)
                    let displayValue = "";
                    if (
                      item.config_value !== undefined &&
                      item.config_value !== null
                    ) {
                      if (typeof item.config_value === "object") {
                        displayValue = JSON.stringify(item.config_value);
                      } else {
                        displayValue = String(item.config_value);
                      }
                    }
                    return (
                      <tr
                        key={itemId}
                        style={{ borderBottom: "1px solid #eee" }}
                      >
                        <td style={cellStyle}>{item.config_text}</td>
                        <td style={cellStyle}>
                          <div
                            style={{
                              maxHeight: "60px",
                              overflow: "auto",
                              whiteSpace: "pre-wrap",
                              wordBreak: "break-all",
                            }}
                          >
                            {displayValue}
                          </div>
                        </td>
                        <td style={{ ...cellStyle, textAlign: "center" }}>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              gap: "8px",
                              justifyContent: "center",
                            }}
                          >
                            <button
                              onClick={() => openEditModal(item)}
                              style={{
                                ...actionButton,
                                backgroundColor: "#FF6B00",
                                color: "#fff",
                              }}
                              onMouseOver={(e) => {
                                e.currentTarget.style.opacity = "0.9";
                              }}
                              onMouseOut={(e) => {
                                e.currentTarget.style.opacity = "1";
                              }}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => openDeleteModal(item)}
                              style={{
                                ...actionButton,
                                backgroundColor: "#f44336",
                                color: "#fff",
                              }}
                              onMouseOver={(e) => {
                                e.currentTarget.style.opacity = "0.9";
                              }}
                              onMouseOut={(e) => {
                                e.currentTarget.style.opacity = "1";
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination controls - Fixed at bottom */}
        {!loading && configs.length > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              marginTop: "20px",
              gap: "20px",
              flexShrink: 0, // Prevent pagination from shrinking
              height: "50px", // Fixed height for pagination area
            }}
          >
            {/* Page size selector */}
            <div
              style={{
                width: "auto",
                height: "40px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                backgroundColor: "transparent",
                color: "#FF6B00",
                padding: "6px 12px",
                borderRadius: "8px",
              }}
            >
              <label
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#FF6B00",
                  whiteSpace: "nowrap",
                  marginRight: "5px",
                }}
              >
                Show:
              </label>
              <CustomDropdown
                options={[
                  { label: "25 items ", value: 25 },
                  { label: "10 items ", value: 10 },
                ]}
                value={pageSize}
                onChange={(val) => {
                  setPageSize(val);
                  setCurrentPage(1);
                }}
                width="120px"
              />
            </div>

            {/* Page navigation */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                backgroundColor: "transparent",
                color: "#FF6B00",
                padding: "6px 12px",
                borderRadius: "8px",
              }}
            >
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
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
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "14px",
                  color: "#FF6B00",
                }}
              >
                Page {currentPage} of {1}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(1, p + 1))}
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
                Next →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Create Modal */}
      <ConfigSettingModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
        }}
        onSubmit={handleCreateConfig}
      />

      {/* Edit Modal */}
      {selectedConfig && (
        <ConfigSettingModal
          isOpen={isEditModalOpen}
          initialData={{
            configKey: selectedConfig.config_text,
            configValue:
              selectedConfig.config_value !== undefined &&
              selectedConfig.config_value !== null
                ? typeof selectedConfig.config_value === "object"
                  ? JSON.stringify(selectedConfig.config_value, null, 2)
                  : String(selectedConfig.config_value)
                : "",
          }}
          isEditing={true}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedConfig(null);
          }}
          onSubmit={handleUpdateConfig}
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedConfig && (
        <div style={overlayStyles}>
          <div style={modalStyles}>
            <button
              onClick={() => {
                setIsDeleteModalOpen(false);
                setSelectedConfig(null);
              }}
              style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                background: "none",
                border: "none",
                fontSize: "20px",
                cursor: "pointer",
                color: "#666",
              }}
            >
              <MdOutlineClose />
            </button>
            <h3
              style={{ fontSize: "20px", marginBottom: "15px", color: "#333" }}
            >
              Confirm Delete
            </h3>
            <p style={{ fontSize: "15px", lineHeight: "1.5", color: "#555" }}>
              Are you sure you want to delete configuration "
              <strong>{selectedConfig.config_text}</strong>"?
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "15px",
                marginTop: "25px",
              }}
            >
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setSelectedConfig(null);
                }}
                style={{
                  padding: "8px 16px",
                  borderRadius: "4px",
                  border: "1px solid #FF6B00",
                  backgroundColor: "transparent",
                  color: "#FF6B00",
                  cursor: "pointer",
                  fontWeight: "500",
                  fontSize: "14px",
                  transition: "all 0.2s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#fff4ee";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
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
                  cursor: "pointer",
                  fontWeight: "500",
                  fontSize: "14px",
                  transition: "all 0.2s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#d32f2f";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "#f44336";
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

export default Configsettings;
