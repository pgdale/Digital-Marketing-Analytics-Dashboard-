import React, { useState, useEffect } from 'react';
import { trafficAPI } from '../../services/api';
import '../../styles/widgets.css';

const TrafficWidget = () => {
  const [trafficData, setTrafficData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalVisitors, setTotalVisitors] = useState(0);

  useEffect(() => {
    fetchTrafficData();
  }, []);

  const fetchTrafficData = async () => {
    try {
      setLoading(true);
      const response = await trafficAPI.get();
      setTrafficData(response.data.data);
      setTotalVisitors(response.data.totalVisitors);
    } catch (error) {
      console.error('Error fetching traffic data:', error);
      // Use sample data if API fails
      setTrafficData([
        { source: 'Direct', visitors: 1254, percentage: 35.4 },
        { source: 'Organic', visitors: 890, percentage: 25.8 },
        { source: 'Social', visitors: 567, percentage: 16.2 },
        { source: 'Email', visitors: 423, percentage: 11.9 }
      ]);
      setTotalVisitors(3134);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="widget">
        <div className="widget-header">
          <h3 className="widget-title">Traffic Sources</h3>
          <span className="widget-subtitle">Loading...</span>
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
        <h3 className="widget-title">Traffic Sources</h3>
        <span className="widget-subtitle">Total: {totalVisitors.toLocaleString()} visitors</span>
      </div>
      
      {/* Simple Visual Representation */}
      <div style={{ padding: '20px 0' }}>
        {trafficData.map((item, index) => (
          <div key={index} style={{ marginBottom: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span style={{ fontWeight: '600' }}>{item.source}</span>
              <span style={{ fontWeight: '600', color: '#4361ee' }}>{item.percentage}%</span>
            </div>
            <div style={{
              height: '8px',
              background: '#e9ecef',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div 
                style={{
                  height: '100%',
                  background: '#4361ee',
                  width: `${item.percentage}%`,
                  borderRadius: '4px',
                  transition: 'width 0.3s ease'
                }}
              ></div>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#6c757d', marginTop: '4px' }}>
              {item.visitors.toLocaleString()} visitors
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrafficWidget;