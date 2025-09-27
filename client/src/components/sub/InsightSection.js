import React from 'react';
import '../styles/InsightSection.css';

export default function InsightSection({ onExpandClick }) {
  return (
    <div className="ai-summary-section">
      <div className="summary-header-card">
        <div className="summary-title">
          <span className="material-symbols-outlined">psychology</span>
          <h4>AI Insights</h4>
        </div>
        <button className="expand-summary-btn" onClick={onExpandClick}>
          <span className="material-symbols-outlined">open_in_full</span>
        </button>
      </div>

      <div className="summary-preview">
        <div className="preview-section">
          <h5 className="section-heading">YOUR FARM STATUS</h5>
          <p>Your livestock shows excellent health metrics with 94% MRL compliance. Recent AMU trends indicate responsible usage patterns. Consider optimizing feed additives for better growth rates.</p>
        </div>

        <div className="preview-section">
          <h5 className="section-heading">REGIONAL ANALYSIS</h5>
          <p>Haryana region maintains strong compliance at 94.2% average. 23 farms require immediate attention. Seasonal patterns suggest increased AMU during monsoon periods.</p>
        </div>

        <div className="preview-section">
          <h5 className="section-heading">RECOMMENDATIONS</h5>
          <ul className="recommendations-list">
            <li>Schedule veterinary check-up for Cattle #CH-001</li>
            <li>Update vaccination records before next month</li>
            <li>Consider organic feed supplements</li>
          </ul>
        </div>

        <div className="stats-summary">
          <div className="stat-row">
            <span className="stat-label">Total Farms:</span>
            <span className="stat-value">1,247</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Total Livestock:</span>
            <span className="stat-value">45,670</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Avg Compliance:</span>
            <span className="stat-value">94.2%</span>
          </div>
          <div className="stat-row risk-row">
            <span className="stat-label">Risk Farms:</span>
            <span className="stat-value risk-value">23</span>
          </div>
        </div>
      </div>
    </div>
  );
}