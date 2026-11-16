import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const TrafficChart = ({ data }) => {
  const colors = ['#4361ee', '#4cc9f0', '#f72585', '#f8961e', '#7209b7', '#38b000', '#6c757d'];

  const chartData = data.map((item, index) => ({
    name: item.source,
    value: item.percentage,
    visitors: item.visitors,
    color: colors[index]
  }));

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value, name, props) => [
              `${value}% (${props.payload.visitors} visitors)`, 
              name
            ]}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrafficChart;