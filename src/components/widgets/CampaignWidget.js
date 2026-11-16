import React, { useState, useEffect } from 'react';
import { campaignAPI } from '../../services/api';
import ProgressChart from '../charts/ProgressChart';
import '../../styles/widgets.css';

const CampaignWidget = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const response = await campaignAPI.get(1, 10);
      setCampaigns(response.data.data);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="widget">
        <div className="widget-header">
          <h3 className="widget-title">Campaign Progress</h3>
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
        <h3 className="widget-title">Campaign Progress</h3>
        <span className="widget-subtitle">Project Completion Status</span>
      </div>

      {/* Visual Progress Chart */}
      <ProgressChart campaigns={campaigns} />

      {/* Average Progress */}
      <div style={{
        marginTop: '15px',
        textAlign: 'center',
        padding: '15px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '12px',
        color: 'white'
      }}>
        <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Average Completion</div>
        <div style={{ fontSize: '2rem', fontWeight: '700' }}>
          {Math.round(campaigns.reduce((sum, camp) => sum + camp.status, 0) / campaigns.length)}%
        </div>
      </div>
    </div>
  );
};

export default CampaignWidget;