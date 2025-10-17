import React from 'react';
import './DrugUsage.css';

export default function DrugUsage({ data }) {
  const getStatusColor = (status) => {
    switch(status) {
      case 'alert': return '#EF4444';
      case 'warning': return '#F59E0B';
      default: return '#8FA31E';
    }
  };

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h4 className="chart-title">
          <span className="material-symbols-outlined chart-icon">medication</span>
          Top Antimicrobial Drugs Used
        </h4>
        <span className="chart-subtitle">Current month usage statistics</span>
      </div>
      <div className="drug-list">
        {data.map((drug, index) => (
          <div key={index} className="drug-item" style={{ borderLeftColor: getStatusColor(drug.status) }}>
            <div className="drug-content">
              <div className="drug-info">
                <span className="drug-name">{drug.drug}</span>
                <span className="drug-usage">{drug.usage}</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${(drug.usage / 250) * 100}%`, background: getStatusColor(drug.status) }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}