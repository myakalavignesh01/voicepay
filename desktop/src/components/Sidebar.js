import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const navigate = useNavigate();
  const [activeRoute, setActiveRoute] = React.useState('/');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  const menuItems = [
    { label: 'Dashboard', path: '/', icon: '📊' },
    { label: 'Payments', path: '/payments', icon: '💳' },
    { label: 'Analytics', path: '/analytics', icon: '📈' },
    { label: 'Settings', path: '/settings', icon: '⚙️' }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1>🗣️ VoicePay</h1>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.path}
            className={`nav-item ${activeRoute === item.path ? 'active' : ''}`}
            onClick={() => {
              setActiveRoute(item.path);
              navigate(item.path);
            }}
          >
            <span className="icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <button className="logout-btn" onClick={handleLogout}>
        🚪 Logout
      </button>
    </aside>
  );
}

export default Sidebar;
