import React from 'react';
import './ActivityLog.css';

export default function ActivityLog({ activities }) {
  const getActivityIcon = (type) => {
    switch(type) {
      case 'prescription': return 'medication';
      case 'update': return 'edit';
      case 'inspection': return 'fact_check';
      case 'alert': return 'warning';
      default: return 'circle';
    }
  };

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h4 className="chart-title">
          <span className="material-symbols-outlined chart-icon">history</span>
          Recent Activities
        </h4>
        <span className="chart-subtitle">System activity log</span>
      </div>
      <div className="activities-list">
        {activities.map((activity) => (
          <div key={activity.id} className="activity-item">
            <span className="material-symbols-outlined activity-icon">{getActivityIcon(activity.type)}</span>
            <div className="activity-content">
              <div className="activity-action">{activity.action}</div>
              <div className="activity-details">by {activity.user} • {activity.farm}</div>
              <div className="activity-time">{activity.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}