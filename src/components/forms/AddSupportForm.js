import React, { useState } from 'react';
import { supportAPI } from '../../services/api';
import '../../styles/widgets.css';

const AddSupportForm = ({ onDataAdded }) => {
  const [formData, setFormData] = useState({
    totalTickets: '',
    openTickets: '',
    responseTime: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await supportAPI.add({
        ...formData,
        totalTickets: parseInt(formData.totalTickets),
        openTickets: parseInt(formData.openTickets)
      });
      
      setMessage('✅ Support data added successfully!');
      setFormData({ totalTickets: '', openTickets: '', responseTime: '' });
      
      if (onDataAdded) {
        onDataAdded();
      }
    } catch (error) {
      setMessage('❌ Error adding support data: ' + (error.response?.data?.message || error.message));
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
        <h3 className="widget-title">Add Support Metrics</h3>
        <span className="widget-subtitle">Update support ticket information</span>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Total Tickets</label>
          <input
            type="number"
            name="totalTickets"
            value={formData.totalTickets}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter total number of tickets"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Open Tickets</label>
          <input
            type="number"
            name="openTickets"
            value={formData.openTickets}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter number of open tickets"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Response Time</label>
          <input
            type="text"
            name="responseTime"
            value={formData.responseTime}
            onChange={handleChange}
            className="form-input"
            placeholder="e.g., 1 Day, 2 Hours, 30 Minutes"
            required
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading}
          style={{ width: '100%' }}
        >
          {loading ? 'Adding Support Data...' : 'Add Support Data'}
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

export default AddSupportForm;