import React, { useState } from 'react';
import { campaignAPI } from '../../services/api';
import '../../styles/widgets.css';

const AddCampaignForm = ({ onDataAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    leader: '',
    team: '',
    status: '',
    startDate: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await campaignAPI.add({
        ...formData,
        status: parseInt(formData.status)
      });
      
      setMessage('✅ Campaign added successfully!');
      setFormData({ name: '', leader: '', team: '', status: '', startDate: '' });
      
      if (onDataAdded) {
        onDataAdded();
      }
    } catch (error) {
      setMessage('❌ Error adding campaign: ' + (error.response?.data?.message || error.message));
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
        <h3 className="widget-title">Add New Campaign</h3>
        <span className="widget-subtitle">Create a new marketing campaign</span>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Campaign Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter campaign name"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Leader</label>
          <input
            type="text"
            name="leader"
            value={formData.leader}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter leader name"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Team</label>
          <input
            type="text"
            name="team"
            value={formData.team}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter team name"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Status (%)</label>
          <input
            type="number"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter completion percentage (0-100)"
            min="0"
            max="100"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading}
          style={{ width: '100%' }}
        >
          {loading ? 'Adding Campaign...' : 'Add Campaign'}
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

export default AddCampaignForm;