import React from 'react';
import '../../styles/widgets.css';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { icon: '📊', label: 'Dashboard', id: 'dashboard' },
    { icon: '➕', label: 'Add Traffic Data', id: 'add-traffic' },
    { icon: '💰', label: 'Add Revenue Data', id: 'add-revenue' },
    { icon: '🚀', label: 'Add Campaign', id: 'add-campaign' },
    { icon: '🛟', label: 'Add Support Data', id: 'add-support' },
  ];

  return (
    <aside style={{
      width: '250px',
      background: 'linear-gradient(180deg, #2c3e50 0%, #3498db 100%)',
      color: 'white',
      padding: '24px 0',
      minHeight: '100vh',
      boxShadow: 'var(--shadow-lg)'
    }}>
      {/* Logo */}
      <div style={{
        padding: '0 24px 24px',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        marginBottom: '24px'
      }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          fontWeight: '700',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <span style={{
            background: 'var(--gradient-primary)',
            padding: '8px',
            borderRadius: '10px',
            fontSize: '1.25rem'
          }}>🎯</span>
          Analytics Pro
        </h2>
      </div>

      {/* Menu Items */}
      <nav>
        {menuItems.map((item, index) => (
          <div
            key={index}
            onClick={() => setActiveTab(item.id)}
            style={{
              padding: '16px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              background: activeTab === item.id ? 'rgba(255,255,255,0.1)' : 'transparent',
              borderRight: activeTab === item.id ? '4px solid #4361ee' : 'none',
              marginBottom: '4px'
            }}
            onMouseEnter={(e) => {
              if (activeTab !== item.id) {
                e.target.style.background = 'rgba(255,255,255,0.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== item.id) {
                e.target.style.background = 'transparent';
              }
            }}
          >
            <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
            <span style={{ 
              fontWeight: activeTab === item.id ? '600' : '400',
              fontSize: '0.95rem'
            }}>
              {item.label}
            </span>
          </div>
        ))}
      </nav>

      {/* Stats Summary */}
      <div style={{
        marginTop: '32px',
        padding: '24px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '12px',
        margin: '24px'
      }}>
        <h4 style={{ 
          fontSize: '0.9rem', 
          fontWeight: '600',
          marginBottom: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span>📈</span> Quick Stats
        </h4>
        <div style={{ fontSize: '0.8rem', opacity: 0.8, lineHeight: '1.6' }}>
          <div>• Real-time Analytics</div>
          <div>• Live Data Updates</div>
          <div>• Interactive Dashboard</div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;