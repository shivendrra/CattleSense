import React from 'react';
import './ExportSection.css';

export default function ExportSection() {
  return (
    <div className="row g-3">
      <div className="col-12">
        <div className="export-section">
          <div className="export-content">
            <h4 className="export-title">Need detailed reports or analytics?</h4>
            <p className="export-description">Export comprehensive data or schedule automated reports for your region</p>
          </div>
          <div className="export-buttons">
            <button className="export-button primary">
              <span className="material-symbols-outlined button-icon">download</span>
              Export Data
            </button>
            <button className="export-button secondary">
              <span className="material-symbols-outlined button-icon">schedule</span>
              Schedule Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}