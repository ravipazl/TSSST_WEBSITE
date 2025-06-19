// Configsettingmodal.jsx
import React, { useState, useEffect } from "react";
import { MdOutlineClose } from "react-icons/md";

const ConfigSettingModal = ({
  isOpen,
  onClose,
  initialData = null,
  isEditing = false,
  onSubmit, // async function expecting payload { config_text, config_value }
}) => {
  const [configKey, setConfigKey] = useState("");
  const [configValue, setConfigValue] = useState("");
  const [isJsonValue, setIsJsonValue] = useState(false);
  const [jsonError, setJsonError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // When modal opens or initialData changes, populate fields
  useEffect(() => {
    if (initialData) {
      setConfigKey(initialData.configKey || "");
      const val = initialData.configValue || "";
      // Detect if JSON
      try {
        const parsed = JSON.parse(val);
        if (parsed !== null && typeof parsed === "object") {
          setIsJsonValue(true);
          setConfigValue(JSON.stringify(parsed, null, 2));
        } else {
          setIsJsonValue(false);
          setConfigValue(val);
        }
        setJsonError("");
      } catch {
        setIsJsonValue(false);
        setConfigValue(val);
        setJsonError("");
      }
    } else {
      // Reset for create
      setConfigKey("");
      setConfigValue("");
      setIsJsonValue(false);
      setJsonError("");
    }
  }, [initialData, isOpen]);

  const validateJson = (value) => {
    try {
      JSON.parse(value);
      setJsonError("");
      return true;
    } catch {
      setJsonError("Invalid JSON format");
      return false;
    }
  };

  const handleValueChange = (value) => {
    setConfigValue(value);
    if (isJsonValue) validateJson(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!configKey.trim()) {
      alert("Configuration key is required");
      return;
    }
    if (!configValue.trim()) {
      alert("Configuration value is required");
      return;
    }
    if (isJsonValue && !validateJson(configValue)) {
      return;
    }
    setIsSubmitting(true);
    try {
      let processedValue;
      if (isJsonValue) {
        // Parse to validate JSON, then stringify for backend storage
        const parsed = JSON.parse(configValue);
        processedValue = JSON.stringify(parsed);
      } else {
        // For non-JSON, send as string. Adjust if your API expects numbers/booleans.
        processedValue = configValue;
      }
      const payload = {
        config_text: configKey,
        config_value: processedValue,
      };
      
      console.log("=== MODAL PAYLOAD ===");
      console.log("isJsonValue:", isJsonValue);
      console.log("Raw configValue:", configValue);
      if (isJsonValue) {
        console.log("JSON parsed object:", JSON.parse(configValue));
        console.log("JSON stringified for backend:", processedValue);
      }
      console.log("processedValue type:", typeof processedValue);
      console.log("processedValue content:", processedValue);
      console.log("Final payload:", payload);
      
      if (onSubmit) {
        await onSubmit(payload);
      }
      // After successful submit, reset
      setConfigKey("");
      setConfigValue("");
      setIsJsonValue(false);
      setJsonError("");
      onClose();
    } catch (error) {
      console.error("Submit error:", error);
      // onSubmit already alerts if needed
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setConfigKey("");
      setConfigValue("");
      setIsJsonValue(false);
      setJsonError("");
      onClose();
    }
  };

  if (!isOpen) return null;

  // Updated styles to match other components
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
    zIndex: 9999,
  };
  
  const modalStyles = {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "8px",
    width: "500px",
    maxHeight: "80vh",
    overflowY: "auto",
    position: "relative",
    boxShadow: "0 4px 12px rgba(255,107,0,0.15)",

  };
  
  const inputStyle = {
    width: "100%",
    padding: "8px 12px",
    borderRadius: "6px",
    border: "1px solid #FF6B00",
    marginBottom: "10px",
    boxSizing: "border-box",
    fontSize: "14px",
    color: "#333",
    outline: "none",
  };
  
  const closeButtonStyle = {
    position: "absolute",
    top: "8px",
    right: "8px",
    background: "none",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    color: "#666",
  };
  
  const cancelButtonStyle = {
    padding: "8px 16px",
    borderRadius: "4px",
    border: "1px solid #FF6B00",
    backgroundColor: "transparent",
    color: "#FF6B00",
    cursor: "pointer",
    fontWeight: "500",
    fontSize: "14px",
    transition: "all 0.2s ease",
  };
  
  const submitButtonStyle = {
    padding: "8px 16px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#FF6B00",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "14px",
    minWidth: "100px",
    transition: "all 0.2s ease",
    boxShadow: "0 2px 4px rgba(255,107,0,0.2)",
  };
  
  const formatButtonStyle = {
    position: "absolute",
    right: "10px",
    top: "10px",
    background: "#FF6B00",
    border: "none",
    borderRadius: "4px",
    padding: "4px 8px",
    fontSize: "12px",
    cursor: "pointer",
    color: "white",
    fontWeight: "500",
    transition: "all 0.2s ease",
  };
  
  const radioLabelStyle = {
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    color: "#333",
    fontWeight: "500",
    marginRight: "15px",
  };

  const labelStyle = {
    display: "block", 
    marginBottom: "6px", 
    fontSize: "14px", 
    fontWeight: "500", 
    color: "#333"
  };

  return (
    <div style={overlayStyles} onClick={(e) => {
      // Only close if clicking on the overlay itself, not the modal content
      if (e.target === e.currentTarget) {
        handleClose();
      }
    }}>
      <div style={modalStyles} onClick={(e) => e.stopPropagation()}>
        <button onClick={handleClose} style={closeButtonStyle} disabled={isSubmitting}>
          <MdOutlineClose />
        </button>
        <h2 style={{ 
          textAlign: "center", 
          marginBottom: "20px", 
          color: "#333", 
          fontSize: "22px",
          fontWeight: "bold" 
        }}>
          {isEditing ? "Edit Configuration" : "Add New Configuration"}
        </h2>
        <form onSubmit={handleSubmit}>
          <label style={labelStyle}>Key:</label>
          <input
            type="text"
            placeholder="e.g., APP_VERSION"
            value={configKey}
            onChange={(e) => setConfigKey(e.target.value)}
            style={inputStyle}
            required
            disabled={isSubmitting}
          />

          <div style={{ marginBottom: "15px" }}>
            <label style={labelStyle}>Value Type:</label>
            <div style={{ display: "flex", gap: "20px", marginBottom: "15px" }}>
              <label style={radioLabelStyle}>
                <input
                  type="radio"
                  name="valueType"
                  checked={!isJsonValue}
                  onChange={() => {
                    setIsJsonValue(false);
                    setJsonError("");
                  }}
                  disabled={isSubmitting}
                  style={{ marginRight: "6px" }}
                />
                <span>Text Field</span>
              </label>
              <label style={radioLabelStyle}>
                <input
                  type="radio"
                  name="valueType"
                  checked={isJsonValue}
                  onChange={() => {
                    setIsJsonValue(true);
                    // Try retain existing JSON if valid, else init
                    try {
                      const parsed = JSON.parse(configValue || "");
                      setConfigValue(JSON.stringify(parsed, null, 2));
                      setJsonError("");
                    } catch {
                      setConfigValue("{\n  \n}");
                      setJsonError("");
                    }
                  }}
                  disabled={isSubmitting}
                  style={{ marginRight: "6px" }}
                />
                <span>JSON Format</span>
              </label>
            </div>
            <label style={labelStyle}>Value:</label>
            {!isJsonValue ? (
              <input
                type="text"
                placeholder="e.g., 1.0.0"
                value={configValue}
                onChange={(e) => handleValueChange(e.target.value)}
                style={inputStyle}
                required
                disabled={isSubmitting}
              />
            ) : (
              <div style={{ position: "relative" }}>
                <textarea
                  placeholder='{ "key": "value" }'
                  value={configValue}
                  onChange={(e) => handleValueChange(e.target.value)}
                  style={{
                    ...inputStyle,
                    height: "200px",
                    fontFamily: "monospace",
                    border: jsonError ? "1px solid #f44336" : "1px solid #FF6B00",
                    backgroundColor: "#f8f8f8",
                    resize: "vertical",
                  }}
                  required
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => {
                    try {
                      const parsed = JSON.parse(configValue);
                      setConfigValue(JSON.stringify(parsed, null, 2));
                      setJsonError("");
                    } catch {
                      setJsonError("Cannot format: Invalid JSON");
                    }
                  }}
                  style={formatButtonStyle}
                  disabled={isSubmitting}
                >
                  Format JSON
                </button>
                <p style={{ fontSize: "12px", color: "#666", marginTop: "5px" }}>
                  Enter valid JSON data.
                </p>
              </div>
            )}
            {jsonError && (
              <div style={{ color: "#f44336", fontSize: "14px", marginBottom: "10px", fontWeight: "500" }}>
                {jsonError}
              </div>
            )}
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "15px", marginTop: "20px" }}>
            <button
              type="button"
              onClick={handleClose}
              style={cancelButtonStyle}
              disabled={isSubmitting}
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
              type="submit" 
              style={submitButtonStyle} 
              disabled={isSubmitting}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#e66000";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "#FF6B00";
              }}
            >
              {isSubmitting
                ? isEditing
                  ? "Updating..."
                  : "Creating..."
                : isEditing
                ? "Update"
                : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfigSettingModal;