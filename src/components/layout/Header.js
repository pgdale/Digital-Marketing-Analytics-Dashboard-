import React from 'react';
import '../../styles/widgets.css';

const Header = () => {
  return (
    <header className="card" style={{ 
      marginBottom: '24px', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white'
    }}>
      <div className="card-header" style={{ borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
        <h1 className="card-title" style={{ color: 'white', fontSize: '1.75rem' }}>
          📊 Digital Marketing Analytics Dashboard
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '0.875rem', opacity: 0.9 }}>
            Real-time Analytics & Insights
          </span>
          <div style={{
            padding: '8px 16px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '20px',
            fontSize: '0.875rem',
            fontWeight: '600'
          }}>
            Live
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;