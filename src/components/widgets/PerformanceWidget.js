import React from 'react';
import MetricsChart from '../charts/MetricsChart';
import '../../styles/widgets.css';

const PerformanceWidget = () => {
  return (
    <div className="widget">
      <div className="widget-header">
        <h3 className="widget-title">Performance Trends</h3>
        <span className="widget-subtitle">Monthly Overview</span>
      </div>
      
      <MetricsChart />
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '10px',
        marginTop: '15px',
        textAlign: 'center'
      }}>
        <div>
          <div style={{ fontSize: '0.75rem', color: '#6c757d' }}>Visitors</div>
          <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#4361ee' }}>+12.4%</div>
        </div>
        <div>
          <div style={{ fontSize: '0.75rem', color: '#6c757d' }}>Revenue</div>
          <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#4cc9f0' }}>+8.2%</div>
        </div>
        <div>
          <div style={{ fontSize: '0.75rem', color: '#6c757d' }}>Conversions</div>
          <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#f8961e' }}>+5.7%</div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceWidget;