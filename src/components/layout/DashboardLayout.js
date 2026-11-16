import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import '../../styles/globals.css';

const DashboardLayout = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="dashboard-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="main-content">
        <Header />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;