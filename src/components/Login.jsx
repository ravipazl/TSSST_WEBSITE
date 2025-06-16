import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
 
function LoginPage() {
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [step, setStep] = useState('form'); // form | otp
    const [timer, setTimer] = useState(60);
 
    useEffect(() => {
        let countdown;
        if (step === 'otp' && timer > 0) {
            countdown = setInterval(() => setTimer(t => t - 1), 1000);
        }
        return () => clearInterval(countdown);
    }, [step, timer]);
 
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!username.trim() || phone.length !== 10 || !/^\d+$/.test(phone)) {
            setError('Enter valid username and 10-digit phone number');
            return;
        }
        setError('');
        setStep('otp');
        setTimer(60);
        alert(`OTP sent to ${phone}`); // Simulated
    };
 
    const handleVerifyOtp = (e) => {
        e.preventDefault();
        if (otp === '123456') {
            alert('Login successful!');
            setStep('form');
            setUsername('');
            setPhone('');
            setOtp('');
        } else {
            setError('Invalid OTP');
        }
    };
 
    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <Link to="/" style={styles.backButton}>
                    ← Back to Home
                </Link>
                <h2 style={styles.heading}>Login</h2>
            </div>
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
                {error && <p style={styles.error}>{error}</p>}
                <button type="submit" style={styles.button}>Get OTP</button>
            </form>
 
            {/* OTP Popup */}
            {step === 'otp' && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <h3>Enter OTP</h3>
                        <form onSubmit={handleVerifyOtp}>
                            <input
                                type="text"
                                placeholder="OTP"
                                style={styles.input}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                            />
                            <p style={{ textAlign: 'center' }}>Time left: {timer}s</p>
                            {error && <p style={styles.error}>{error}</p>}
                            <button type="submit" style={styles.button}>Verify OTP</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
 
// ✅ Styles
const styles = {
    container: {
        maxWidth: '400px',
        margin: '100px auto',
        padding: '40px',
        borderRadius: '8px',
        backgroundColor: '#fff',
        boxShadow: '0 5px 20px rgba(247, 53, 49, 0.3)',
    },
    header: {
        marginBottom: '20px',
    },
    backButton: {
        display: 'inline-block',
        marginBottom: '15px',
        color: '#F73531',
        textDecoration: 'none',
        fontWeight: '500',
        transition: 'all 0.3s ease',
    },
    heading: {
        textAlign: 'center',
        background: 'linear-gradient(135deg, #ff3e00, #ff6a00)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '10px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        padding: '12px',
        marginBottom: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '16px',
    },
    button: {
        padding: '12px',
        fontSize: '16px',
        background: 'linear-gradient(135deg, #ff3e00, #ff6a00)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
        marginBottom: '10px',
    },
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
        zIndex: 999,
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '400px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        textAlign: 'center',
    },
};
 
export default LoginPage;