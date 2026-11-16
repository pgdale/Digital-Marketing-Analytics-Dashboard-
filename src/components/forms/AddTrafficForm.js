import React, { useState } from 'react';
import { trafficAPI } from '../../services/api';
import '../../styles/widgets.css';

const AddTrafficForm = ({ onDataAdded }) => {
  const [formData, setFormData] = useState({
    source: 'Direct',
    visitors: '',
    percentage: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const sources = [
    { value: 'Direct', label: 'Direct Source' },
    { value: 'Organic', label: 'Organic Search' },
    { value: 'Social', label: 'Social Network' },
    { value: 'Email', label: 'Email Newsletter' },
    { value: 'Referral', label: 'Referrals' },
    { value: 'ADVT', label: 'Google ADVT' },
    { value: 'Other', label: 'Other Sources' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await trafficAPI.add({
        ...formData,
        visitors: parseInt(formData.visitors),
        percentage: parseFloat(formData.percentage)
      });
      
      setMessage('✅ Traffic data added successfully!');
      setFormData({ source: 'Direct', visitors: '', percentage: '' });
      
      // Refresh dashboard data
      if (onDataAdded) {
        onDataAdded();
      }
    } catch (error) {
      setMessage('❌ Error adding traffic data');
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
        <h3 className="widget-title">Add Traffic Data</h3>
        <span className="widget-subtitle">Add new source visit information</span>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Traffic Source</label>
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
          <label className="form-label">Number of Visitors</label>
          <input
            type="number"
            name="visitors"
            value={formData.visitors}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter number of visitors"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Percentage (%)</label>
          <input
            type="number"
            step="0.1"
            name="percentage"
            value={formData.percentage}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter percentage"
            required
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading}
          style={{ width: '100%' }}
        >
          {loading ? 'Adding...' : 'Add Traffic Data'}
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

      <div style={{
        marginTop: '20px',
        padding: '16px',
        background: '#f8f9fa',
        borderRadius: '8px'
      }}>
        <h4 style={{ marginBottom: '12px', fontSize: '0.9rem' }}>💡 Quick Tips</h4>
        <ul style={{ fontSize: '0.8rem', color: '#6c757d', lineHeight: '1.5' }}>
          <li>Total percentage should ideally sum to 100%</li>
          <li>Visitor count should match your analytics</li>
          <li>Data updates in real-time on dashboard</li>
        </ul>
      </div>
    </div>
  );
};

export default AddTrafficForm;