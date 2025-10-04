import React from 'react';
import './NotificationSection.css';

const NotificationSection = ({ formData, onChange }) => (
  <div className="notification-section">
    <div className="section-header">
      <h2>Alert & Notification Settings</h2>
      <p>Configure how you receive important updates</p>
    </div>
    <div className="toggle-section">
      <div className="toggle-item">
        <div className="toggle-info">
          <span className="material-symbols-outlined">warning</span>
          <div>
            <h4>MRL Threshold Alerts</h4>
            <p>Immediate alerts when MRL levels approach limits</p>
          </div>
        </div>
        <label className="switch">
          <input type="checkbox" name="notifications.mrlAlerts" checked={formData.notifications.mrlAlerts} onChange={onChange} />
          <span className="slider"></span>
        </label>
      </div>
      <div className="toggle-item">
        <div className="toggle-info">
          <span className="material-symbols-outlined">vaccines</span>
          <div>
            <h4>Vaccination Reminders</h4>
            <p>Scheduled reminders for livestock vaccinations</p>
          </div>
        </div>
        <label className="switch">
          <input type="checkbox" name="notifications.vaccination" checked={formData.notifications.vaccination} onChange={onChange} />
          <span className="slider"></span>
        </label>
      </div>
      <div className="toggle-item">
        <div className="toggle-info">
          <span className="material-symbols-outlined">health_and_safety</span>
          <div>
            <h4>Health Status Updates</h4>
            <p>Daily health report summaries for your livestock</p>
          </div>
        </div>
        <label className="switch">
          <input type="checkbox" name="notifications.healthUpdates" checked={formData.notifications.healthUpdates} onChange={onChange} />
          <span className="slider"></span>
        </label>
      </div>
      <div className="toggle-item">
        <div className="toggle-info">
          <span className="material-symbols-outlined">gavel</span>
          <div>
            <h4>Compliance Notifications</h4>
            <p>Updates on regulatory changes and compliance requirements</p>
          </div>
        </div>
        <label className="switch">
          <input type="checkbox" name="notifications.compliance" checked={formData.notifications.compliance} onChange={onChange} />
          <span className="slider"></span>
        </label>
      </div>
      <div className="toggle-item">
        <div className="toggle-info">
          <span className="material-symbols-outlined">email</span>
          <div>
            <h4>Email Notifications</h4>
            <p>Receive notifications via email</p>
          </div>
        </div>
        <label className="switch">
          <input type="checkbox" name="notifications.email" checked={formData.notifications.email} onChange={onChange} />
          <span className="slider"></span>
        </label>
      </div>
      <div className="toggle-item">
        <div className="toggle-info">
          <span className="material-symbols-outlined">sms</span>
          <div>
            <h4>SMS Alerts</h4>
            <p>Critical alerts via SMS</p>
          </div>
        </div>
        <label className="switch">
          <input type="checkbox" name="notifications.sms" checked={formData.notifications.sms} onChange={onChange} />
          <span className="slider"></span>
        </label>
      </div>
    </div>
  </div>
);

export default NotificationSection;