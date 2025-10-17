import React from 'react';
import './StatsCards.css';

export default function StatsCards() {
  const stats = [
    { icon: 'agriculture', label: 'Total Farms', value: '1,247', description: 'Active in monitoring system', color: '#8B3A3B' },
    { icon: 'pets', label: 'Total Livestock', value: '45,670', description: 'Across all categories', color: '#1A3A52' },
    { icon: 'verified', label: 'Avg Compliance', value: '94.2%', description: 'MRL compliance rate', color: '#6F8015' },
    { icon: 'warning', label: 'Risk Farms', value: '23', description: 'Require immediate attention', color: '#DC2626' }
  ];

  const hexToRgba = (hex, alpha) => {
    const bigint = parseInt(hex.replace('#', ''), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <>
      <div className="dashboard-stats-card">
        <div className="row g-3 mb-3">
          {stats.map((stat, index) => {
            const borderColor = stat.color;
            const bgAccent = hexToRgba(borderColor, 0.08);
            return (
              <div key={index} className="col-md-3 col-sm-6">
                <div
                  className="stat-card shadow-sm"
                  style={{
                    border: `2px solid ${borderColor}`,
                    backgroundColor: bgAccent
                  }}
                >
                  <div className="stat-card-header">
                    <span
                      className="material-symbols-outlined stat-icon"
                      style={{ color: borderColor }}
                    >
                      {stat.icon}
                    </span>
                    <span className="stat-label" style={{ color: borderColor }}>
                      {stat.label}
                    </span>
                  </div>
                  <div>
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-description">{stat.description}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
