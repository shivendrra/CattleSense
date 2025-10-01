import React from 'react';
import './QuickActions.css';

export default function QuickActions() {
  const actions = [
    { icon: 'add', label: 'Add New Animal', variant: 'btn-custom' },
    { icon: 'medication', label: 'Update Medication', variant: 'btn-custom' },
    { icon: 'thermostat', label: 'Record Health Data', variant: 'btn-custom' },
    { icon: 'description', label: 'Generate Report', variant: 'btn-outline-custom' },
  ];

  return (
    <div className="quick-actions">
      <h5 className="mb-3">Quick Actions</h5>
      <div className="action-buttons">
        {actions.map((action, index) => (
          <button key={index} className={`btn ${action.variant}`}>
            <span className="material-symbols-outlined">{action.icon}</span> {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}