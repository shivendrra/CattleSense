import React from 'react';
import './StatsSection.css';

export default function StatsSection() {
  const stats = [
    { icon: 'pets', number: '34', label: 'Total Livestock' },
    { icon: 'check_circle', number: '28', label: 'Healthy Animals' },
    { icon: 'medical_services', number: '6', label: 'Under Treatment' },
    { icon: 'water_drop', number: '45L', label: 'Daily Milk Production' }
  ];

  return (
    <div className="stats-grid">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className="stat-icon">
            <span className="material-symbols-outlined">{stat.icon}</span>
          </div>
          <div className="stat-number">{stat.number}</div>
          <div className="text-muted">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}