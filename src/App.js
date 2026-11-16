import React, { useState } from 'react';
import DashboardLayout from './components/layout/DashboardLayout';
import TrafficWidget from './components/widgets/TrafficWidget';
import CampaignWidget from './components/widgets/CampaignWidget';
import RevenueWidget from './components/widgets/RevenueWidget';
import SupportWidget from './components/widgets/SupportWidget';
import PerformanceWidget from './components/widgets/PerformanceWidget';
import AddTrafficForm from './components/forms/AddTrafficForm';
import AddRevenueForm from './components/forms/AddRevenueForm';
import AddCampaignForm from './components/forms/AddCampaignForm';
import AddSupportForm from './components/forms/AddSupportForm';
import './styles/globals.css';
import './styles/widgets.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleDataAdded = () => {
    // Refresh all widgets by changing the key
    setRefreshKey(prev => prev + 1);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <>
            {/* Welcome Header */}
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '30px',
              borderRadius: '16px',
              marginBottom: '24px',
              textAlign: 'center'
            }}>
              <h1 style={{ fontSize: '2rem', marginBottom: '10px', fontWeight: '700' }}>
                📊 Visual Analytics Dashboard
              </h1>
              <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
                Interactive charts and real-time performance metrics
              </p>
            </div>

            {/* Top Row - Key Metrics */}
            <div className="grid grid-4" style={{ gap: '24px', marginBottom: '24px' }}>
              <div className="widget" style={{ textAlign: 'center', padding: '20px', background: 'linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%)', color: 'white' }}>
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>👥</div>
                <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>12.5k</div>
                <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Total Visitors</div>
              </div>
              
              <div className="widget" style={{ textAlign: 'center', padding: '20px', background: 'linear-gradient(135deg, #4cc9f0 0%, #4895ef 100%)', color: 'white' }}>
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>💰</div>
                <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>$8.2k</div>
                <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Revenue</div>
              </div>
              
              <div className="widget" style={{ textAlign: 'center', padding: '20px', background: 'linear-gradient(135deg, #f8961e 0%, #f3722c 100%)', color: 'white' }}>
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🎯</div>
                <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>35.4%</div>
                <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Conversion Rate</div>
              </div>
              
              <div className="widget" style={{ textAlign: 'center', padding: '20px', background: 'linear-gradient(135deg, #7209b7 0%, #560bad 100%)', color: 'white' }}>
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📈</div>
                <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>87%</div>
                <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Growth</div>
              </div>
            </div>

            {/* Middle Row - Main Charts */}
            <div className="grid grid-2" style={{ gap: '24px', marginBottom: '24px' }}>
              <TrafficWidget key={`traffic-${refreshKey}`} />
              <RevenueWidget key={`revenue-${refreshKey}`} />
            </div>

            {/* Bottom Row - Additional Charts */}
            <div className="grid grid-2" style={{ gap: '24px' }}>
              <CampaignWidget key={`campaign-${refreshKey}`} />
              <PerformanceWidget />
            </div>

            {/* Support & Monthly Stats Row */}
            <div className="grid grid-2" style={{ gap: '24px', marginTop: '24px' }}>
              <SupportWidget key={`support-${refreshKey}`} />
              <div className="widget">
                <div className="widget-header">
                  <h3 className="widget-title">Monthly Campaign Stats</h3>
                  <span className="widget-subtitle">8.34% Growth</span>
                </div>
                <div style={{ padding: '20px 0' }}>
                  {[
                    { label: 'Emails Sent', value: '12,346', change: '+0.3%', icon: '📧' },
                    { label: 'Emails Opened', value: '8,734', change: '+2.1%', icon: '👁️' },
                    { label: 'Links Clicked', value: '967', change: '+1.4%', icon: '🖱️' },
                    { label: 'New Subscribers', value: '345', change: '+0.5%', icon: '⭐' },
                    { label: 'Complaints', value: '10', change: '-15%', icon: '⚠️' },
                    { label: 'Unsubscribes', value: '66', change: '+0.9%', icon: '🚫' }
                  ].map((item, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '12px 0',
                      borderBottom: index < 5 ? '1px solid #f1f3f4' : 'none'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
                        <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{item.label}</span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>{item.value}</div>
                        <div style={{ 
                          fontSize: '0.75rem', 
                          color: item.change.startsWith('+') ? '#28a745' : '#dc3545',
                          fontWeight: '500'
                        }}>
                          {item.change}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        );

      case 'add-traffic':
        return (
          <div className="grid grid-2" style={{ gap: '24px' }}>
            <AddTrafficForm onDataAdded={handleDataAdded} />
            <TrafficWidget key={`traffic-${refreshKey}`} />
          </div>
        );

      case 'add-revenue':
        return (
          <div className="grid grid-2" style={{ gap: '24px' }}>
            <AddRevenueForm onDataAdded={handleDataAdded} />
            <RevenueWidget key={`revenue-${refreshKey}`} />
          </div>
        );

      case 'add-campaign':
        return (
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <AddCampaignForm onDataAdded={handleDataAdded} />
            <div style={{ marginTop: '24px' }}>
              <CampaignWidget key={`campaign-${refreshKey}`} />
            </div>
          </div>
        );

      case 'add-support':
        return (
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <AddSupportForm onDataAdded={handleDataAdded} />
            <div style={{ marginTop: '24px' }}>
              <SupportWidget key={`support-${refreshKey}`} />
            </div>
          </div>
        );

      default:
        return (
          <div className="widget">
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <h2>Welcome to Analytics Dashboard</h2>
              <p>Select an option from the sidebar to get started.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="App">
      <DashboardLayout 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
      >
        {renderContent()}
      </DashboardLayout>
    </div>
  );
}

export default App;