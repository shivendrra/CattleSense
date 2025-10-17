import React from 'react';
import './AlertsPanel.css';

export default function AlertsPanel({ alerts }) {
  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'critical': return '#EF4444';
      case 'warning': return '#F59E0B';
      case 'info': return '#3B82F6';
      default: return '#666';
    }
  };

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h4 className="chart-title">
          <span className="material-symbols-outlined" style={{ color: '#EF4444', fontSize: '22px' }}>notifications_active</span>
          Recent Alerts & Notifications
        </h4>
        <span className="chart-subtitle">Requires immediate action</span>
      </div>
      <div className="alerts-list">
        {alerts.map((alert) => (
          <div key={alert.id} className="alert-item" style={{ borderLeftColor: getSeverityColor(alert.severity) }}>
            <span className="material-symbols-outlined alert-icon" style={{ color: getSeverityColor(alert.severity) }}>warning</span>
            <div className="alert-content">
              <div className="alert-issue">{alert.issue}</div>
              <div className="alert-farm">{alert.farm}</div>
              <div className="alert-time">{alert.time}</div>
            </div>
            <button className="alert-button" style={{ background: getSeverityColor(alert.severity) }}>View</button>
          </div>
        ))}
      </div>
    </div>
  );
}