import React, { useState, useEffect } from "react";

const AddAppReleaseModal = ({ isOpen, onClose, initialData = null, isEditing = false }) => {
  const [osType, setOsType] = useState(initialData?.osType || "Android");
  const [version, setVersion] = useState(initialData?.version || "");
  const [releaseNotes, setReleaseNotes] = useState(initialData?.releaseNotes || "");
  const [apkFile, setApkFile] = useState(null);
  
  // Update form when initialData changes (for editing)
  useEffect(() => {
    if (initialData) {
      setOsType(initialData.osType || initialData.userName || "Android");
      setVersion(initialData.version || initialData.apiName || "");
      setReleaseNotes(initialData.releaseNotes || initialData.requestTime || "");
      // We don't set the file as it can't be pre-filled
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Here you can send the form data to your backend
    const formData = new FormData();
    formData.append("osType", osType);
    formData.append("version", version);
    formData.append("releaseNotes", releaseNotes);
    
    // Only append file if it's provided (might not be for editing)
    if (apkFile) {
      formData.append("apkFile", apkFile);
    }
    
    if (isEditing) {
      // For editing, you might want to include the ID
      if (initialData.id) {
        formData.append("id", initialData.id);
      }
      console.log("Updating release", formData);
    } else {
      console.log("Creating new release", formData);
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
        <h2 style={{ textAlign: "center" }}>{isEditing ? "Edit App Release" : "Add New App Release"}</h2>
        <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
          <label>OS Type:</label>
          <select
            value={osType}
            onChange={(e) => setOsType(e.target.value)}
            style={inputStyle}
          >
            <option value="Android">Android</option>
            <option value="iOS">iOS</option>
          </select>

          <label>Version:</label>
          <input
            type="text"
            placeholder="e.g., 1.0.0"
            value={version}
            onChange={(e) => setVersion(e.target.value)}
            style={inputStyle}
            required
          />

          <label>Release Notes:</label>
          <textarea
            value={releaseNotes}
            onChange={(e) => setReleaseNotes(e.target.value)}
            style={{ ...inputStyle, height: "100px" }}
            required
          />

          <label>APK File:{isEditing && " (Leave empty to keep current file)"}</label>
          <input
            type="file"
            onChange={(e) => setApkFile(e.target.files[0])}
            style={inputStyle}
            required={!isEditing} // Only required for new releases
          />
          
          {isEditing && initialData && (
            <div style={{ marginBottom: "15px", fontSize: "14px", color: "#666" }}>
              Current file: {initialData.apkFile || "app-release.apk"}
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

export default AddAppReleaseModal;
