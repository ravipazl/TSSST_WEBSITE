import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
 
const AddAppReleaseModal = ({ isOpen,setIsModalOpen, onClose, initialData = null, isEditing = false }) => {
  const [osType, setOsType] = useState(initialData?.osType || "Android");
  const [version, setVersion] = useState(initialData?.version || "");
  const [releaseNotes, setReleaseNotes] = useState(initialData?.releaseNotes || "");
  const [apkFile, setApkFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [currentFileName, setCurrentFileName] = useState("");
  const [currentFileUrl, setCurrentFileUrl] = useState("");
 
  // Update form when initialData changes (for editing)
  useEffect(() => {
    if (initialData) {
      console.log("Initial data for modal:", initialData);
     
      // Set form fields from initialData
      setOsType(initialData.osType || "Android");
      setVersion(initialData.version || "");
      setReleaseNotes(initialData.releaseNotes || "");
     
      // Set the current file URL if available
      if (initialData.apkFileUrl) {
        setCurrentFileUrl(initialData.apkFileUrl);
        const fileName = initialData.apkFileUrl.split('/').pop() || "app-release.apk";
        setCurrentFileName(fileName);
      }
     
      // We don't set the file input as it can't be pre-filled for security reasons
    }
  }, [initialData]);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
 
    // Validate file type for new uploads
    if (apkFile && !apkFile.name.toLowerCase().endsWith('.apk')) {
      setError("Please upload a valid APK file (.apk extension)");
      setIsSubmitting(false);
      return;
    }
 
    // Create form data for the API request
    const formData = new FormData();
    
    // Debug: Log the osType before sending
    console.log("Selected OS Type:", osType);
    console.log("Form data being sent:");
    console.log("- osType:", osType);
    console.log("- version:", version);
    console.log("- releaseNotes:", releaseNotes);
    
    formData.append("osType", osType);
    formData.append("version", version);
    formData.append("releaseNotes", releaseNotes);
   
    // Only append file if it's provided (might not be for editing)
    if (apkFile) {
      formData.append("apkFile", apkFile);
    }
   
    try {
      let response;
     
      if (isEditing && initialData && initialData.id) {
        // For editing, use PUT request with the ID
        formData.append("id", initialData.id);
       
        // If no new file is provided and we're editing, we need to tell the server to keep the existing file
        if (!apkFile && initialData.apkFileUrl) {
          formData.append("keepExistingFile", "true");
        }
       
        // For editing, we need to include the ID in the URL
        response = await axios.put(
          `https://buzz.pazl.info/buzz-api/app-releases/${initialData.id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
      } else {
        // For creating, use POST request
        response = await axios.post(
          "https://buzz.pazl.info/buzz-api/app-releases",
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
      }
     
      if (response.data && response.data.status) {
        // Close the modal and refresh the parent component
        onClose(true); // Pass true to indicate successful operation
        toast.success(isEditing ? "App release updated successfully!" : "New app release added!");
      } else {
        setError(response.data?.message || "Failed to save. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError(error.response?.data?.message ||
               (error.response?.status === 413 ? "File is too large. Maximum size is 10MB." :
               "An error occurred. Please try again."));
      toast.error(`Error: ${error.response?.data?.message || "An error occurred. Please try again."}`);
    } finally {
      setIsSubmitting(false);
    }
  };
 
  if (!isOpen) return null;
 
  return (
    <div style={overlayStyles}>
      <div style={modalStyles}>
        <button
          onClick={() => {
            if (onClose) onClose(false);
            if (setIsModalOpen) setIsModalOpen(false);
          }}
          style={closeButtonStyle}
          disabled={isSubmitting}
        >
          &times;
        </button>
        <h2 style={{ textAlign: "center" }}>{isEditing ? "Edit App Release" : "Add New App Release"}</h2>
       
        {error && (
          <div style={{
            backgroundColor: "#ffebee",
            color: "#c62828",
            padding: "10px",
            borderRadius: "4px",
            marginBottom: "15px",
            fontSize: "14px"
          }}>
            {error}
          </div>
        )}
       
        <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
          <label>OS Type: <span style={{color: '#007bff', fontWeight: 'bold'}}>({osType})</span></label>
          <select
            value={osType}
            onChange={(e) => {
              console.log("OS Type changed from:", osType, "to:", e.target.value);
              setOsType(e.target.value);
            }}
            style={inputStyle}
            disabled={isSubmitting}
          >
            <option value="Android">Android</option>
            <option value="Ios">Ios</option>
          </select>
 
          <label>Version:</label>
          <input
            type="text"
            placeholder="e.g., 1.0.0"
            value={version}
            onChange={(e) => setVersion(e.target.value)}
            style={inputStyle}
            required
            disabled={isSubmitting}
          />
 
          <label>Release Notes:</label>
          <textarea
            value={releaseNotes}
            onChange={(e) => setReleaseNotes(e.target.value)}
            style={{ ...inputStyle, height: "100px" }}
            required
            disabled={isSubmitting}
          />
 
          <label style={{
            fontWeight: "bold",
            fontSize: "15px",
            display: "block",
            marginBottom: "5px"
          }}>
            APK File{isEditing ? " (Upload new file )" : ""}
          </label>
          <div style={{ position: "relative" }}>
            {/* Show file input for new uploads or when editing */}
            <input
              type="file"
              onChange={(e) => setApkFile(e.target.files[0])}
              style={{
                ...inputStyle,
              }}
              required={!isEditing} // Only required for new releases
              disabled={isSubmitting}
              accept=".apk"
              id="apkFileInput"
            />
           
            {/* Show selected file name if a new file is selected */}
            {apkFile && (
              <div style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "#f0f0f0",
                padding: "2px 8px",
                borderRadius: "4px",
                fontSize: "12px",
                maxWidth: "100px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
              }}>
                {apkFile.name}
              </div>
            )}
           
            {/* Show current file name when editing */}
            {isEditing && currentFileUrl && !apkFile && (
              <div style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "#f0f0f0",
                padding: "2px 8px",
                borderRadius: "4px",
                fontSize: "12px",
                maxWidth: "150px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
              }}>
                {currentFileName}
              </div>
            )}
          </div>
         
 
 
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" }}>
            <button
              type="button"
              onClick={() => {
                if (onClose) onClose(false);
                if (setIsModalOpen) setIsModalOpen(false);
              }}
              style={{
                ...cancelButtonStyle,
                opacity: isSubmitting ? 0.7 : 1,
                cursor: isSubmitting ? "not-allowed" : "pointer"
              }}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                ...submitButtonStyle,
                opacity: isSubmitting ? 0.7 : 1,
                cursor: isSubmitting ? "not-allowed" : "pointer"
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span>
                  <span style={{ display: "inline-block", marginRight: "8px" }}>
                    {isEditing ? "Updating..." : "Submitting..."}
                  </span>
                </span>
              ) : (
                isEditing ? "Update" : "Submit"
              )}
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
 
 
 