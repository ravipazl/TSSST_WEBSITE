import React, { useState, useEffect } from "react";

const ConfigSettingModal = ({ isOpen, onClose, initialData = null, isEditing = false }) => {
  const [configKey, setConfigKey] = useState(initialData?.configKey || "");
  const [configValue, setConfigValue] = useState(initialData?.configValue || "");
  const [isJsonValue, setIsJsonValue] = useState(false);
  const [jsonError, setJsonError] = useState("");
  
  // Update form when initialData changes (for editing)
  useEffect(() => {
    if (initialData) {
      setConfigKey(initialData.configKey || "");
      
      // Check if the value is JSON
      try {
        const parsedValue = JSON.parse(initialData.configValue || "{}");
        if (typeof parsedValue === 'object' && parsedValue !== null) {
          setConfigValue(JSON.stringify(parsedValue, null, 2));
          setIsJsonValue(true);
        } else {
          setConfigValue(initialData.configValue || "");
          setIsJsonValue(false);
        }
      } catch (e) {
        // Not JSON, treat as text
        setConfigValue(initialData.configValue || "");
        setIsJsonValue(false);
      }
    }
  }, [initialData]);

  // Validate JSON
  const validateJson = (value) => {
    if (!isJsonValue) return true;
    
    try {
      JSON.parse(value);
      setJsonError("");
      return true;
    } catch (e) {
      setJsonError("Invalid JSON format");
      return false;
    }
  };
  
  // Handle value change
  const handleValueChange = (value) => {
    setConfigValue(value);
    if (isJsonValue) {
      validateJson(value);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate JSON if needed
    if (isJsonValue && !validateJson(configValue)) {
      return; // Don't submit if JSON is invalid
    }

    // Here you can send the form data to your backend
    const formData = {
      configKey,
      configValue: isJsonValue ? JSON.stringify(JSON.parse(configValue)) : configValue
    };
    
    if (isEditing) {
      // For editing, you might want to include the ID
      if (initialData && initialData.id) {
        formData.id = initialData.id;
      }
      console.log("Updating config setting", formData);
    } else {
      console.log("Creating new config setting", formData);
    }
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={overlayStyles}>
      <div style={modalStyles}>
        <button onClick={onClose} style={closeButtonStyle}>
          &times;
        </button>
        <h2 style={{ textAlign: "center" }}>{isEditing ? "Edit Configuration" : "Add New Configuration"}</h2>
        <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
          <label>Key:</label>
          <input
            type="text"
            placeholder="e.g., APP_VERSION"
            value={configKey}
            onChange={(e) => setConfigKey(e.target.value)}
            style={inputStyle}
            required
          />

          <div style={{ marginBottom: "10px" }}>
            <label style={{ display: "block", marginBottom: "8px" }}>Value Type:</label>
            <p style={{ fontSize: "13px", color: "#666", margin: "0 0 10px 0" }}>
              Select the type of data you want to store in this configuration.
            </p>
            <div style={{ display: "flex", gap: "20px", marginBottom: "10px" }}>
              <div>
                <label style={{ 
                  fontSize: "14px", 
                  display: "flex", 
                  alignItems: "center",
                  cursor: "pointer",
                  marginBottom: "4px"
                }}>
                  <input
                    type="radio"
                    name="valueType"
                    checked={!isJsonValue}
                    onChange={() => {
                      setIsJsonValue(false);
                      setJsonError("");
                    }}
                    style={{ marginRight: "8px" }}
                  />
                  <strong>Text Field</strong>
                </label>
                <p style={{ fontSize: "12px", color: "#666", margin: "0 0 0 24px" }}>
                  Simple text values like version numbers, URLs, or flags.
                </p>
              </div>
              
              <div>
                <label style={{ 
                  fontSize: "14px", 
                  display: "flex", 
                  alignItems: "center",
                  cursor: "pointer",
                  marginBottom: "4px"
                }}>
                  <input
                    type="radio"
                    name="valueType"
                    checked={isJsonValue}
                    onChange={() => {
                      setIsJsonValue(true);
                      // Try to format as JSON if possible
                      try {
                        const parsed = JSON.parse(configValue);
                        setConfigValue(JSON.stringify(parsed, null, 2));
                        setJsonError("");
                      } catch (e) {
                        // If not valid JSON, initialize with empty object
                        setConfigValue("{\n  \n}");
                        setJsonError("");
                      }
                    }}
                    style={{ marginRight: "8px" }}
                  />
                  <strong>JSON Format</strong>
                </label>
                <p style={{ fontSize: "12px", color: "#666", margin: "0 0 0 24px" }}>
                  Complex data structures like objects, arrays, or nested configurations.
                </p>
              </div>
            </div>
            <label>Value:</label>
          </div>
          
          {!isJsonValue ? (
            // Text input for regular text values
            <input
              type="text"
              placeholder="e.g., 1.0.0"
              value={configValue}
              onChange={(e) => handleValueChange(e.target.value)}
              style={inputStyle}
              required
            />
          ) : (
            // Textarea for JSON values with syntax highlighting
            <div style={{ position: "relative" }}>
              <textarea
                placeholder='{\n  "key": "value"\n}'
                value={configValue}
                onChange={(e) => handleValueChange(e.target.value)}
                style={{ 
                  ...inputStyle, 
                  height: "200px",
                  fontFamily: "monospace",
                  border: jsonError ? "1px solid #f44336" : "1px solid #ccc",
                  backgroundColor: "#f8f8f8",
                  padding: "10px",
                  fontSize: "14px",
                  lineHeight: "1.5"
                }}
                required
              />
              {/* JSON format helper button */}
              <button
                type="button"
                onClick={() => {
                  try {
                    const parsed = JSON.parse(configValue);
                    setConfigValue(JSON.stringify(parsed, null, 2));
                    setJsonError("");
                  } catch (e) {
                    setJsonError("Cannot format: Invalid JSON");
                  }
                }}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "10px",
                  background: "#FF6B00",
                  border: "none",
                  borderRadius: "4px",
                  padding: "4px 8px",
                  fontSize: "12px",
                  cursor: "pointer",
                  color: "white"
                }}
              >
                Format JSON
              </button>
              <p style={{ 
                fontSize: "12px", 
                color: "#666", 
                margin: "5px 0 0 0",
                fontFamily: "inherit" 
              }}>
                Enter valid JSON data. Click "Format JSON" to properly format your input.
              </p>
            </div>
          )}
          
          {jsonError && (
            <div style={{ color: "#f44336", fontSize: "14px", marginTop: "-10px", marginBottom: "15px" }}>
              {jsonError}
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
            <button type="button" onClick={onClose} style={cancelButtonStyle}>
              Cancel
            </button>
            <button type="submit" style={submitButtonStyle}>
              {isEditing ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Styles
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

const inputStyle = {
  width: "100%",
  padding: "8px",
  margin: "5px 0 15px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const closeButtonStyle = {
  position: "absolute",
  top: "10px",
  right: "15px",
  background: "transparent",
  border: "none",
  fontSize: "24px",
  cursor: "pointer",
};

const cancelButtonStyle = {
  padding: "8px 16px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  background: "#f9f9f9",
  cursor: "pointer",
};

const submitButtonStyle = {
  padding: "8px 16px",
  borderRadius: "4px",
  border: "none",
  backgroundColor: "#FF6B00",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer",
};

export default ConfigSettingModal;