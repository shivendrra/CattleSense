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
    <div className="stats-section">
      {stats.map((stat, index) => {
        const uniqueClass = stat.icon.replace(/_/g, '-'); 
        return (
          <div key={index} className={`stats-card ${uniqueClass}-card`}>
            <div className={`stat-icon ${uniqueClass}-icon`}>
              <span className="material-symbols-outlined">{stat.icon}</span>
            </div>
            <div className={`stat-number ${uniqueClass}-number`}>{stat.number}</div>
            <div className={`stat-label ${uniqueClass}-label text-muted`}>
              {stat.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}