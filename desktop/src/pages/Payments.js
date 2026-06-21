import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || 'http://localhost:8000';

function Payments() {
  const [payments, setPayments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API}/api/transactions`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPayments(response.data.transactions);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${API}/api/payments/initiate`,
        { amount: parseFloat(amount), description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAmount('');
      setDescription('');
      setShowForm(false);
      fetchPayments();
    } catch (error) {
      console.error('Error initiating payment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payments-page">
      <h1>Payments</h1>
      <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : '+ New Payment'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="payment-form">
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Processing...' : 'Initiate Payment'}
          </button>
        </form>
      )}

      <div className="payments-list">
        {payments.map((p) => (
          <div key={p._id} className="payment-item">
            <div>
              <h3>₹{p.amount}</h3>
              <p>{p.description}</p>
            </div>
            <span className={`status ${p.status}`}>{p.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Payments;
