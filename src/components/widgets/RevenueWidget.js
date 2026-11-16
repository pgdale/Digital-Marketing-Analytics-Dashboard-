import React, { useState, useEffect } from 'react';
import { revenueAPI } from '../../services/api';
import '../../styles/widgets.css';

const RevenueWidget = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    fetchRevenueData();
  }, []);

  const fetchRevenueData = async () => {
    try {
      setLoading(true);
      const response = await revenueAPI.get();
      setRevenueData(response.data.data);
      setTotalRevenue(response.data.totalRevenue);
    } catch (error) {
      console.error('Error fetching revenue data:', error);
      // Use sample data if API fails
      setRevenueData([
        { source: 'Direct', amount: 266 },
        { source: 'Organic', amount: 890 },
        { source: 'Referral', amount: 62 },
        { source: 'Cancelled', amount: 1200 }
      ]);
      setTotalRevenue(2418);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="widget">
        <div className="widget-header">
          <h3 className="widget-title">Revenue Analytics</h3>
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
        <h3 className="widget-title">Revenue Analytics</h3>
        <span className="widget-subtitle">Total: ${totalRevenue.toLocaleString()}</span>
      </div>

      {/* Simple Bar Chart */}
      <div style={{ padding: '20px 0', height: '200px', display: 'flex', alignItems: 'end', gap: '15px', justifyContent: 'center' }}>
        {revenueData.map((item, index) => {
          const maxAmount = Math.max(...revenueData.map(r => r.amount));
          const height = (item.amount / maxAmount) * 150;
          const colors = ['#4361ee', '#4cc9f0', '#7209b7', '#f72585'];
          
          return (
            <div key={index} style={{ textAlign: 'center' }}>
              <div
                style={{
                  height: `${height}px`,
                  width: '40px',
                  background: colors[index],
                  borderRadius: '4px 4px 0 0',
                  marginBottom: '8px'
                }}
              ></div>
              <div style={{ fontSize: '0.75rem', fontWeight: '600' }}>${item.amount}</div>
              <div style={{ fontSize: '0.7rem', color: '#6c757d' }}>{item.source}</div>
            </div>
          );
        })}
      </div>

      {/* Revenue Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '10px',
        marginTop: '15px'
      }}>
        {revenueData.map((item, index) => (
          <div key={index} style={{
            textAlign: 'center',
            padding: '12px',
            background: '#f8f9fa',
            borderRadius: '8px',
            border: '2px solid #e9ecef'
          }}>
            <div style={{ fontSize: '0.8rem', color: '#6c757d', marginBottom: '5px' }}>{item.source}</div>
            <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#4361ee' }}>${item.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenueWidget;