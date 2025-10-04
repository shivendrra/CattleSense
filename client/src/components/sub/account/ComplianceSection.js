import React from 'react';
import './ComplianceSection.css';

const ComplianceSection = ({ formData, onChange }) => (
  <div className="compliance-section">
    <div className="section-header">
      <h2>Compliance & Monitoring</h2>
      <p>AMU tracking and MRL compliance settings</p>
    </div>
    <div className="form-grid">
      <div className="form-field">
        <label>License Number</label>
        <input type="text" name="licenseNumber" value={formData.licenseNumber} onChange={onChange} />
      </div>
      <div className="form-field">
        <label>License Expiry Date</label>
        <input type="date" name="licenseExpiry" value={formData.licenseExpiry} onChange={onChange} />
      </div>
      <div className="form-field full">
        <label>Certified Training Programs</label>
        <input type="text" name="certifications" value={formData.certifications} onChange={onChange} placeholder="e.g., AMU Management, MRL Compliance" />
      </div>
    </div>
    <div className="toggle-section">
      <div className="toggle-item">
        <div className="toggle-info">
          <span className="material-symbols-outlined">inventory</span>
          <div>
            <h4>Antimicrobial Usage Tracking</h4>
            <p>Enable automated tracking of antimicrobial drug usage</p>
          </div>
        </div>
        <label className="switch">
          <input type="checkbox" name="amuTracking" checked={formData.amuTracking} onChange={onChange} />
          <span className="slider"></span>
        </label>
      </div>
      <div className="toggle-item">
        <div className="toggle-info">
          <span className="material-symbols-outlined">water_drop</span>
          <div>
            <h4>Milk Production Monitoring</h4>
            <p>Track daily milk production and quality metrics</p>
          </div>
        </div>
        <label className="switch">
          <input type="checkbox" name="milkMonitoring" checked={formData.milkMonitoring} onChange={onChange} />
          <span className="slider"></span>
        </label>
      </div>
      <div className="toggle-item">
        <div className="toggle-info">
          <span className="material-symbols-outlined">medical_services</span>
          <div>
            <h4>Withdrawal Period Alerts</h4>
            <p>Get notified before withdrawal periods end</p>
          </div>
        </div>
        <label className="switch">
          <input type="checkbox" name="withdrawalAlerts" checked={formData.withdrawalAlerts} onChange={onChange} />
          <span className="slider"></span>
        </label>
      </div>
    </div>
  </div>
);

export default ComplianceSection;