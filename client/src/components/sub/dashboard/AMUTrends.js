import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import './AMUTrends.css';

export default function AMUTrends({ data }) {
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
        <div>
          <h4 className="chart-title">
            <span className="material-symbols-outlined chart-icon">trending_up</span>
            Antimicrobial Usage Trends
          </h4>
          <span className="chart-subtitle">Monthly usage vs recommended limits</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E8E8E8" />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#666' }} />
          <YAxis tick={{ fontSize: 12, fill: '#666' }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: '13px' }} />
          <Line type="monotone" dataKey="usage" stroke="#B45253" strokeWidth={3} dot={{ fill: '#B45253', r: 5 }} name="Actual Usage" />
          <Line type="monotone" dataKey="limit" stroke="#8FA31E" strokeWidth={2} strokeDasharray="5 5" dot={{ fill: '#8FA31E', r: 4 }} name="Recommended Limit" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}