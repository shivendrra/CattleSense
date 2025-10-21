import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import './LivestockDistribution.css';

export default function LivestockDistribution({ data }) {
  return (
    <div className="chart-card">
      <div className="chart-header">
        <h4 className="chart-title">
          <span className="material-symbols-outlined chart-icon">pie_chart</span>
          Livestock Distribution
        </h4>
        <span className="chart-subtitle">By category</span>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value" label={(entry) => `${entry.name}: ${entry.value}`} labelStyle={{ fontSize: '11px', fontWeight: '600' }}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}