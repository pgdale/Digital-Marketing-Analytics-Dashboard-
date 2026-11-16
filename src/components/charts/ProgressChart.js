import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ProgressChart = ({ campaigns }) => {
  const chartData = campaigns.map(campaign => ({
    name: campaign.name.length > 10 ? campaign.name.substring(0, 10) + '...' : campaign.name,
    progress: campaign.status,
    fullName: campaign.name
  }));

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" domain={[0, 100]} />
          <YAxis type="category" dataKey="name" width={80} />
          <Tooltip 
            formatter={(value) => [`${value}%`, 'Progress']}
            labelFormatter={(value, payload) => payload[0]?.payload.fullName}
          />
          <Bar 
            dataKey="progress" 
            name="Completion %" 
            fill="#4361ee"
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressChart; // ✅ ADD THIS LINE