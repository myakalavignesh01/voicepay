import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || 'http://localhost:8000';

function Settings() {
  const [user, setUser] = useState(null);
  const [securitySettings, setSecuritySettings] = useState(null);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      
      const userRes = await axios.get(`${API}/api/auth/me`, { headers });
      setUser(userRes.data.user);
      
      const securityRes = await axios.get(`${API}/api/security/status`, { headers });
      setSecuritySettings(securityRes.data);
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div className="settings-page">
      <h1>Settings</h1>
      
      <div className="settings-section">
        <h2>Profile</h2>
        {user && (
          <div className="setting-item">
            <label>Email</label>
            <p>{user.email}</p>
          </div>
        )}
      </div>

      <div className="settings-section">
        <h2>Security</h2>
        {securitySettings && (
          <>
            <div className="setting-item">
              <label>2FA Enabled</label>
              <p>{securitySettings.twoFactorEnabled ? 'Yes' : 'No'}</p>
            </div>
            <div className="setting-item">
              <label>Biometric Enabled</label>
              <p>{securitySettings.biometricEnabled ? 'Yes' : 'No'}</p>
            </div>
            <div className="setting-item">
              <label>KYC Verified</label>
              <p>{securitySettings.kycVerified ? 'Yes' : 'No'}</p>
            </div>
          </>
        )}
      </div>

      <div className="settings-section">
        <h2>Preferences</h2>
        <div className="setting-item">
          <label>Theme</label>
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>

      <div className="settings-section">
        <button className="btn-danger" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>
    </div>
  );
}

export default Settings;
