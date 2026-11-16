import React, { useState, useEffect } from 'react';
import { supportAPI } from '../../services/api';
import '../../styles/widgets.css';

const SupportWidget = () => {
  const [supportData, setSupportData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSupportData();
  }, []);

  const fetchSupportData = async () => {
    try {
      setLoading(true);
      const response = await supportAPI.get();
      setSupportData(response.data.data);
    } catch (error) {
      console.error('Error fetching support data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !supportData) {
    return (
      <div className="widget">
        <div className="widget-header">
          <h3 className="widget-title">Support Tracker</h3>
          <span className="widget-subtitle">Last 7 Days</span>
        </div>
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="widget">
      <div className="widget-header">
        <h3 className="widget-title">Support Tracker</h3>
        <span className="widget-subtitle">Last 7 Days</span>
      </div>

      <div className="support-metrics">
        <div className="metric-card" style={{ background: 'linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%)' }}>
          <div className="metric-label">Total Tickets</div>
          <div className="metric-value">{supportData.totalTickets}</div>
          <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>All Time</div>
        </div>
        
        <div className="metric-card" style={{ background: 'linear-gradient(135deg, #f8961e 0%, #f3722c 100%)' }}>
          <div className="metric-label">Open Tickets</div>
          <div className="metric-value">{supportData.openTickets}</div>
          <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>Need Attention</div>
        </div>
        
        <div className="metric-card" style={{ background: 'linear-gradient(135deg, #4cc9f0 0%, #4895ef 100%)' }}>
          <div className="metric-label">Response Time</div>
          <div className="metric-value" style={{ fontSize: '1.5rem' }}>{supportData.responseTime}</div>
          <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>Average</div>
        </div>
      </div>

      <div style={{ 
        marginTop: '20px',
        padding: '16px',
        background: '#f8f9fa',
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '0.875rem', color: '#6c757d', marginBottom: '8px' }}>
          Customer Satisfaction
        </div>
        <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#28a745' }}>
          94%
        </div>
        <div style={{ fontSize: '0.75rem', color: '#6c757d' }}>
          Very Good
        </div>
      </div>
    </div>
  );
};

export default SupportWidget;