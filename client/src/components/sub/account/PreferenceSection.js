import React from 'react';
import './PreferencesSection.css';

const PreferencesSection = ({ formData, onChange }) => (
  <div className="preferences-section">
    <div className="section-header">
      <h2>System Preferences</h2>
      <p>Customize your CattleSense experience</p>
    </div>
    <div className="form-grid">
      <div className="form-field">
        <label>Language</label>
        <select name="language" value={formData.language} onChange={onChange}>
          <option>English</option>
          <option>Hindi</option>
          <option>Marathi</option>
          <option>Telugu</option>
        </select>
      </div>
      <div className="form-field">
        <label>Timezone</label>
        <select name="timezone" value={formData.timezone} onChange={onChange}>
          <option>IST (UTC+05:30)</option>
          <option>PST (UTC-08:00)</option>
          <option>EST (UTC-05:00)</option>
        </select>
      </div>
      <div className="form-field">
        <label>Date Format</label>
        <select name="dateFormat" value={formData.dateFormat} onChange={onChange}>
          <option>DD/MM/YYYY</option>
          <option>MM/DD/YYYY</option>
          <option>YYYY-MM-DD</option>
        </select>
      </div>
      <div className="form-field">
        <label>Measurement Units</label>
        <select name="units" value={formData.units} onChange={onChange}>
          <option>Metric</option>
          <option>Imperial</option>
        </select>
      </div>
    </div>
  </div>
);

export default PreferencesSection;