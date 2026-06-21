import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const API = process.env.REACT_APP_API_URL || 'http://localhost:8000';

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        // Get user data
        const userRes = await axios.get(`${API}/api/auth/me`, { headers });
        setUserData(userRes.data.user);

        // Get recent transactions
        const transRes = await axios.get(`${API}/api/transactions`, { headers });
        setTransactions(transRes.data.transactions.slice(0, 5));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Wallet Balance</h3>
          <p className="amount">₹{userData?.walletBalance || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Total Transactions</h3>
          <p className="amount">{userData?.totalTransactions || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Monthly Limit</h3>
          <p className="amount">₹{userData?.monthlyTransactionLimit || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Account Status</h3>
          <p className="status active">{userData?.accountStatus || 'Active'}</p>
        </div>
      </div>

      <div className="transactions-section">
        <h2>Recent Transactions</h2>
        <table className="transactions-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t._id}>
                <td>{t.transactionId}</td>
                <td>₹{t.amount}</td>
                <td><span className={`status ${t.status}`}>{t.status}</span></td>
                <td>{new Date(t.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
