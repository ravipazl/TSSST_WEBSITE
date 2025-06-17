import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginModal({ isOpen, onClose }) {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [step, setStep] = useState('form'); // 'form' | 'otp'
    const [timer, setTimer] = useState(60);
    const [success, setSuccess] = useState('');
    const inputRefs = useRef([]);
    const modalRef = useRef(null);

    // Reset form when modal is opened
    useEffect(() => {
        if (isOpen) {
            setUsername('');
            setPhone('');
            setOtp('');
            setError('');
            setStep('form');
            setSuccess('');
        }
    }, [isOpen]);

    // Handle OTP timer
    useEffect(() => {
        let countdown;
        if (step === 'otp' && timer > 0) {
            countdown = setInterval(() => setTimer(t => t - 1), 1000);
        }
        return () => clearInterval(countdown);
    }, [step, timer]);

    // Close modal when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target) && step !== 'otp') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose, step]);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setSuccess('');
        if (!username.trim() || phone.length !== 10 || !/^\d+$/.test(phone)) {
            setError('Enter valid username and 10-digit phone number');
            return;
        }
        setError('');
        setOtp('');
        setStep('otp');
        setTimer(60);
    };

    const handleOtpInput = (e, index) => {
        const value = e.target.value;
        if (!/^\d*$/.test(value)) return;

        const otpArray = otp.padEnd(6, ' ').split('');
        otpArray[index] = value;
        setOtp(otpArray.join('').trim());

        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleVerifyOtp = (e) => {
        e.preventDefault();
        if (otp === '123456') {
            setStep('form');
            setUsername('');
            setPhone('');
            setOtp('');
            setError('');
            setSuccess('Login successful!');
            setTimeout(() => {
                onClose();
                navigate('/admin');
            }, 1500);
        } else {
            setError('Invalid OTP');
        }
    };

    if (!isOpen) return null;

    return (
        <div style={styles.modalOverlay}>
            <div style={styles.container} ref={modalRef}>
                <div style={styles.closeButton} onClick={onClose}>×</div>
                <h3 style={styles.heading}>Login</h3>
                
                {success && <p style={styles.success}>{success}</p>}
                
                {step === 'form' && (
                    <form onSubmit={handleFormSubmit} style={styles.form}>
                        <input
                            type="text"
                            placeholder="Username"
                            style={styles.input}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Phone Number"
                            style={styles.input}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                        {error && step === 'form' && <p style={styles.error}>{error}</p>}
                        <button type="submit" style={styles.button}>Get OTP</button>
                    </form>
                )}

                {step === 'otp' && (
                    <div style={styles.otpContainer}>
                        <h2 style={styles.otpHeading}>OTP verification</h2>
                        <p style={styles.otpSubtext}>
                            Please enter the OTP (One-Time Password) sent to your registered email/phone number to complete your verification.
                        </p>
                        <form onSubmit={handleVerifyOtp} style={styles.otpForm}>
                            <div style={styles.otpInputWrapper}>
                                {Array(6).fill(0).map((_, i) => (
                                    <input
                                        key={i}
                                        type="text"
                                        maxLength="1"
                                        style={styles.otpBox}
                                        value={otp[i] || ''}
                                        onChange={(e) => handleOtpInput(e, i)}
                                        ref={el => inputRefs.current[i] = el}
                                    />
                                ))}
                            </div>
                            <div style={styles.timerRow}>
                                <span>Remaining time: <span style={{ color: ' #ff3e00' }}>{`00:${timer < 10 ? `0${timer}` : timer}`}</span></span>
                                <span style={styles.resendText}>Didn't get the code? <a href="#" onClick={(e) => {e.preventDefault(); setTimer(60);}}>Resend</a></span>
                            </div>
                            {error && step === 'otp' && <p style={styles.error}>{error}</p>}
                            <button type="submit" style={styles.verifyBtn}>Verify</button>
                            <button type="button" style={styles.cancelBtn} onClick={() => setStep('form')}>Cancel</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

const styles = {
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
    },
    container: {
        width: '95%',
        maxWidth: '400px',
        padding: '40px',
        borderRadius: '16px',
        backgroundColor: '#fff',
        boxShadow: '0 5px 20px rgba(0,0,0,0.2)',
        position: 'relative',
    },
    closeButton: {
        position: 'absolute',
        top: '15px',
        right: '20px',
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#F73531',
        cursor: 'pointer',
        zIndex: 1,
    },
    heading: {
        textAlign: 'center',
        background: 'linear-gradient(135deg, #ff3e00, #ff6a00)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '20px',
        fontSize: '24px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        marginTop: '10px',
        padding: '12px',
        marginBottom: '15px',
        borderRadius: '8px',
        border: '1px solid #ccc',
        fontSize: '16px',
        outline: 'none',
    },
    button: {
        marginTop: '20px',
        padding: '12px',
        fontSize: '16px',
        background: 'linear-gradient(135deg, #ff3e00, #ff6a00)',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: '600',
    },
    success: {
        color: 'green',
        textAlign: 'center',
        fontWeight: '500',
        marginBottom: '15px',
    },
    error: {
        color: 'red',
        marginBottom: '10px',
        textAlign: 'center',
    },
    otpContainer: {
        textAlign: 'center',
    },
    otpHeading: {
        background: 'linear-gradient(135deg, #ff3e00, #ff6a00)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: 700,
        marginBottom: '10px',
        fontSize: '22px',
    },
    otpSubtext: {
        fontSize: '14px',
        color: '#6b7280',
        marginBottom: '20px',
    },
    otpForm: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    otpInputWrapper: {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        marginBottom: '10px',
    },
    otpBox: {
        width: '40px',
        height: '50px',
        textAlign: 'center',
        fontSize: '20px',
        borderRadius: '8px',
        border: '1px solid  #ff3e00',
        outline: 'none',
    },
    timerRow: {
        fontSize: '13px',
        margin: '10px 0',
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        padding: '0 20px',
        color: '#4b5563',
    },
    resendText: {
        fontSize: '13px',
    },
    verifyBtn: {
        width: '80%',
        padding: '12px',
        background: 'linear-gradient(135deg, #ff3e00, #ff6a00)',
        color: '#fff',
        border: 'none',
        borderRadius: '30px',
        marginTop: '15px',
        fontWeight: '600',
        fontSize: '16px',
        cursor: 'pointer',
    },
    cancelBtn: {
        width: '80%',
        padding: '12px',
        backgroundColor: '#fff',
        border: '2px solid #F73531',
        borderRadius: '30px',
        marginTop: '10px',
        color: '#F73531',
        fontWeight: '600',
        fontSize: '16px',
        cursor: 'pointer',
    },
};

export default LoginModal;