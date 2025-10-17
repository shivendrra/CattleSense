import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import './RegionalCompliance.css';

export default function RegionalCompliance({ data }) {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="tooltip-item" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h4 className="chart-title">
          <span className="material-symbols-outlined chart-icon">bar_chart</span>
          Regional MRL Compliance
        </h4>
        <span className="chart-subtitle">Compliance vs non-compliance rates</span>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E8E8E8" />
          <XAxis dataKey="region" tick={{ fontSize: 12, fill: '#666' }} />
          <YAxis tick={{ fontSize: 12, fill: '#666' }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: '13px' }} />
          <Bar dataKey="compliant" fill="#8FA31E" name="Compliant (%)" />
          <Bar dataKey="nonCompliant" fill="#EF4444" name="Non-Compliant (%)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}