import React, { useState } from 'react';
import { revenueAPI } from '../../services/api';
import '../../styles/widgets.css';

const AddRevenueForm = ({ onDataAdded }) => {
  const [formData, setFormData] = useState({
    source: 'Direct',
    amount: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const sources = [
    { value: 'Direct', label: 'Direct Revenue' },
    { value: 'Organic', label: 'Organic Revenue' },
    { value: 'Referral', label: 'Referral Revenue' },
    { value: 'Cancelled', label: 'Cancelled Revenue' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await revenueAPI.add({
        ...formData,
        amount: parseInt(formData.amount)
      });
      
      setMessage('✅ Revenue data added successfully!');
      setFormData({ source: 'Direct', amount: '' });
      
      if (onDataAdded) {
        onDataAdded();
      }
    } catch (error) {
      setMessage('❌ Error adding revenue data');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="widget">
      <div className="widget-header">
        <h3 className="widget-title">Add Revenue Data</h3>
        <span className="widget-subtitle">Add new revenue source information</span>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Revenue Source</label>
          <select 
            name="source"
            value={formData.source}
            onChange={handleChange}
            className="form-input"
          >
            {sources.map(source => (
              <option key={source.value} value={source.value}>
                {source.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Amount ($)</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter amount in dollars"
            required
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading}
          style={{ width: '100%' }}
        >
          {loading ? 'Adding...' : 'Add Revenue Data'}
        </button>

        {message && (
          <div style={{
            marginTop: '16px',
            padding: '12px',
            background: message.includes('✅') ? '#d4edda' : '#f8d7da',
            color: message.includes('✅') ? '#155724' : '#721c24',
            borderRadius: '8px',
            textAlign: 'center',
            fontWeight: '500'
          }}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default AddRevenueForm;