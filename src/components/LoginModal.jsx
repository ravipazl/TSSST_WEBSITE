import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BaseUrl } from "./Constant";
import axios from "axios";
import ReactSelect from "react-select";
import toast, { Toaster } from 'react-hot-toast';

function LoginModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("form");
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);
  const modalRef = useRef(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(BaseUrl + "/countries");
        setCountries(response.data.data);
        setSelectedCountry(response?.data?.data[0]);
      } catch (error) {
        console.error("Error fetching countries", error);
        toast.error(`${error.response?.data?.message || "Failed to load countries."}`);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    if (isOpen) {
      setPhone("");
      setOtp("");
      setStep("form");
    }
  }, [isOpen]);

  useEffect(() => {
    let countdown;
    if (step === "otp" && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            setCanResend(true);
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(countdown);
  }, [step, timer]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        step !== "otp"
      ) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose, step]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedCountry || !selectedCountry.countryCode) {
      toast.error("Please select a country");
      return;
    }
    if (phone.length !== 10 || !/^\d+$/.test(phone)) {
      toast.error("Enter valid 10-digit phone number");
      return;
    }
    
    try {
      const payload = {
        countryCode: selectedCountry.countryCode,
        phoneNumber: phone,
      };
      const response = await axios.put(`${BaseUrl}/send-otp`, payload);
      console.log("OTP sent:", response.data);
      
      toast.success("OTP sent successfully!");
      setOtp("");
      setStep("otp");
      setTimer(60);
      setCanResend(false);
    } catch (err) {
      console.error(err);
      toast.error(`${err.response?.data?.message || "Failed to send OTP."}`);
    }
  };

  const handleResendOtp = async (e) => {
    e.preventDefault();
    
    try {
      const payload = {
        countryCode: selectedCountry.countryCode,
        phoneNumber: phone,
      };
      const response = await axios.post(`${BaseUrl}/send-otp`, payload);
      console.log("OTP resent:", response.data);
      
      toast.success("OTP resent successfully!");
      setOtp("");
      setTimer(60);
      setCanResend(false);
    } catch (err) {
      console.error("Resend error:", err);
      toast.error("Failed to resend OTP. Please try again.");
    }
  };

  const handleOtpInput = (e, index) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;
    const otpArray = otp.padEnd(6, " ").split("");
    otpArray[index] = value;
    setOtp(otpArray.join("").trim());
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    
    const payload = {
      phoneNumber: phone,
      otp: otp,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    
    try {
      const response = await axios.post(`${BaseUrl}/verify-otp`, payload, config);
      console.log("OTP verified:", response.data);
      
      if (response?.data?.status === true) {
        toast.success("Login successful!");
        setTimeout(() => {
          onClose();
          navigate("/admin");
        }, 1500);
      } else {
        toast.error("Invalid OTP");
      }
    } catch (error) {
      console.error("OTP verification error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to verify OTP.");
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: '',
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
            style: {
              background: '#10B981',
              color: '#fff',
            },
          },
          error: {
            duration: 4000,
            style: {
              background: '#EF4444',
              color: '#fff',
            },
          },
        }}
      />
      <div style={styles.modalOverlay}>
        <div style={styles.container} ref={modalRef}>
          <div style={styles.closeButton} onClick={onClose}>×</div>
          <h3 style={styles.heading}>Login</h3>

          {step === "form" && (
            <form onSubmit={handleFormSubmit} style={styles.form}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                <ReactSelect
                  value={selectedCountry}
                  onChange={(val) => setSelectedCountry(val)}
                  options={countries}
                  getOptionLabel={(e) => `${e.countryCode}`}
                  styles={{
                    control: (base) => ({ ...base, minHeight: "45px", borderRadius: "8px", flex: 1 }),
                    option: (base) => ({ ...base, display: "flex", alignItems: "center", gap: "8px", fontSize: "14px" }),
                  }}
                  formatOptionLabel={(country) => (
                    <div style={styles.countryOption}>
                      <img src={country.countryFlag} alt="" style={styles.countryFlag} />
                      <span>{country.countryCode}</span>
                    </div>
                  )}
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  style={styles.input}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <button type="submit" style={styles.button}>Get OTP</button>
            </form>
          )}

          {step === "otp" && (
            <div style={styles.otpContainer}>
              <h2 style={styles.otpHeading}>OTP verification</h2>
              <p style={styles.otpSubtext}>Please enter the OTP sent to your phone number.</p>
              <form onSubmit={handleVerifyOtp} style={styles.otpForm}>
                <div style={styles.otpInputWrapper}>
                  {Array(6).fill(0).map((_, i) => (
                  <input
                  key={i}
                  type="text"
                  maxLength="1"
                  style={styles.otpBox}
                  value={otp[i] || ""}
                  onChange={(e) => handleOtpInput(e, i)}
                  onKeyDown={(e) => {
                      if (e.key === "Backspace") {
                      if (otp[i]) {
                          // Clear current input
                          const otpArray = otp.split("");
                          otpArray[i] = "";
                          setOtp(otpArray.join(""));
                      } else if (i > 0) {
                          // Move focus back and clear previous
                          inputRefs.current[i - 1].focus();
                          const otpArray = otp.split("");
                          otpArray[i - 1] = "";
                          setOtp(otpArray.join(""));
                      }
                      }
                  }}
                  ref={(el) => (inputRefs.current[i] = el)}
                  />

                  ))}
                </div>
                <div style={styles.timerRow}>
                  <span>
                    Remaining time: <span style={{ color: "#ff3e00" }}>
                      {`00:${timer < 10 ? `0${timer}` : timer}`}
                    </span>
                  </span>
                  <span style={styles.resendText}>
                    Didn't get the code?{" "}
                    {canResend ? (
                      <a href="#" onClick={handleResendOtp} style={{ color: "#ff3e00", fontWeight: "bold" }}>Resend</a>
                    ) : (
                      <span style={{ color: "#aaa" }}>Resend</span>
                    )}
                  </span>
                </div>
                <button type="submit" style={styles.verifyBtn}>Verify</button>
                <button type="button" style={styles.cancelBtn} onClick={() => setStep("form")}>Cancel</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const styles = {
  modalOverlay: {
    position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.6)", display: "flex",
    alignItems: "center", justifyContent: "center", zIndex: 1000,
  },
  container: {
    width: "95%", maxWidth: "500px", padding: "40px", borderRadius: "16px",
    backgroundColor: "#fff", boxShadow: "0 5px 20px rgba(0,0,0,0.2)", position: "relative",
  },
  closeButton: {
    position: "absolute", top: "15px", right: "20px", fontSize: "24px",
    fontWeight: "bold", color: "#F73531", cursor: "pointer", zIndex: 1,
  },
  heading: {
    textAlign: "center", background: "linear-gradient(135deg, #ff3e00, #ff6a00)",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
    marginBottom: "20px", fontSize: "24px",
  },
  form: { display: "flex", flexDirection: "column" },
  input: {
    padding: "12px", borderRadius: "8px", border: "1px solid #ccc",
    fontSize: "16px", outline: "none", flexGrow: 1, minWidth: "0",
  },
  button: {
    marginTop: "20px", padding: "12px", fontSize: "16px",
    background: "linear-gradient(135deg, #ff3e00, #ff6a00)",
    color: "#fff", border: "none", borderRadius: "8px",
    cursor: "pointer", fontWeight: "600", transition: "background 0.3s ease",
  },
  otpContainer: { textAlign: "center" },
  otpHeading: {
    background: "linear-gradient(135deg, #ff3e00, #ff6a00)", WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent", fontWeight: 700, marginBottom: "10px", fontSize: "22px",
  },
  otpSubtext: { fontSize: "14px", color: "#6b7280", marginBottom: "20px" },
  otpForm: { display: "flex", flexDirection: "column", alignItems: "center" },
  otpInputWrapper: { display: "flex", justifyContent: "center", gap: "10px", marginBottom: "10px" },
  otpBox: {
    width: "45px", height: "55px", textAlign: "center", fontSize: "20px",
    borderRadius: "8px", border: "1px solid #ff3e00", outline: "none",
    transition: "border 0.2s ease-in-out",
  },
  timerRow: {
    fontSize: "13px", margin: "10px 0", display: "flex", justifyContent: "space-between",
    width: "100%", padding: "0 20px", color: "#4b5563",
  },
  resendText: { fontSize: "13px" },
  verifyBtn: {
    width: "80%", padding: "12px", background: "linear-gradient(135deg, #ff3e00, #ff6a00)",
    color: "#fff", border: "none", borderRadius: "30px", marginTop: "15px",
    fontWeight: "600", fontSize: "16px", cursor: "pointer", transition: "background 0.3s ease",
  },
  cancelBtn: {
    width: "80%", padding: "12px", backgroundColor: "#fff",
    border: "2px solid #F73531", borderRadius: "30px", marginTop: "10px",
    color: "#F73531", fontWeight: "600", fontSize: "16px", cursor: "pointer",
  },
  countryFlag: {
    width: "24px", height: "18px", marginRight: "8px",
    objectFit: "cover", borderRadius: "3px",
  },
  countryOption: {
    display: "flex", alignItems: "center", fontSize: "16px", gap: "8px",
  },
};

export default LoginModal;