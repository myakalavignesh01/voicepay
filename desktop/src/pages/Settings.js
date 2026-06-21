import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || 'http://localhost:8000';

function Settings() {
  const [user, setUser] = useState(null);
  const [security, setSecurity] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        const userRes = await axios.get(`${API}/api/auth/me`, { headers });
        setUser(userRes.data.user);
        const secRes = await axios.get(`${API}/api/security/status`, { headers });
        setSecurity(secRes.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchSettings();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div className="settings-page">
      <h1>Settings</h1>
      <div className="settings-section">
        <h2>Profile</h2>
        {user && <div className="setting-item"><label>Email</label><p>{user.email}</p></div>}
      </div>
      <div className="settings-section">
        <h2>Security</h2>
        {security && (
          <>
            <div className="setting-item"><label>2FA</label><p>{security.twoFactorEnabled ? 'Enabled' : 'Disabled'}</p></div>
            <div className="setting-item"><label>Biometric</label><p>{security.biometricEnabled ? 'Enabled' : 'Disabled'}</p></div>
            <div className="setting-item"><label>KYC</label><p>{security.kycVerified ? 'Verified' : 'Pending'}</p></div>
          </>
        )}
      </div>
      <button className="btn-danger" onClick={handleLogout}>🚪 Logout</button>
    </div>
  );
}

export default Settings;
