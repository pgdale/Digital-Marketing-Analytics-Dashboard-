import React, { useState, useEffect } from 'react';
import { revenueAPI } from '../../services/api';
import RevenueChart from '../charts/RevenueChart';
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

      {/* Visual Chart */}
      <RevenueChart data={revenueData} />

      {/* Quick Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '10px',
        marginTop: '15px'
      }}>
        {revenueData.map((item, index) => (
          <div key={index} style={{
            textAlign: 'center',
            padding: '10px',
            background: '#f8f9fa',
            borderRadius: '8px'
          }}>
            <div style={{ fontSize: '0.75rem', color: '#6c757d' }}>{item.source}</div>
            <div style={{ fontSize: '1rem', fontWeight: '600' }}>${item.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenueWidget; // ✅ MAKE SURE THIS EXISTS