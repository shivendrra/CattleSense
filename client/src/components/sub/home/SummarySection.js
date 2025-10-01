import React from 'react';
import './SummarySection.css';

export default function SummarySection({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handleDownload = () => {
    console.log('Download summary');
  };

  const handleShare = () => {
    console.log('Share summary');
  };

  const handleReload = () => {
    console.log('Reload summary');
  };

  const handleQuery = () => {
    console.log('Query summary');
  };

  return (
    <div className="summary-overlay" onClick={onClose}>
      <div className="summary-modal" onClick={(e) => e.stopPropagation()}>
        <div className="summary-header">
          <h3>AI Summary Report</h3>
          <div className="summary-actions">
            <button className="action-btn" onClick={handleDownload} title="Download">
              <span className="material-symbols-outlined">download</span>
            </button>
            <button className="action-btn" onClick={handleShare} title="Share">
              <span className="material-symbols-outlined">share</span>
            </button>
            <button className="action-btn" onClick={handleReload} title="Reload">
              <span className="material-symbols-outlined">refresh</span>
            </button>
            <button className="action-btn" onClick={handleQuery} title="Query">
              <span className="material-symbols-outlined">help</span>
            </button>
            <button className="action-btn close-btn" onClick={onClose} title="Close">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>
        
        <div className="summary-content">
          <div className="summary-section">
            <h4>Livestock Health Overview</h4>
            <p>Current livestock count shows 45 animals with 94% MRL compliance rate. Recent health assessments indicate good overall condition with minor attention needed for 3 animals.</p>
            
            <div className="summary-stats">
              <div className="stat-box">
                <span className="stat-value">45</span>
                <span className="stat-label">Total Animals</span>
              </div>
              <div className="stat-box">
                <span className="stat-value">94%</span>
                <span className="stat-label">MRL Compliance</span>
              </div>
              <div className="stat-box">
                <span className="stat-value">3</span>
                <span className="stat-label">Need Attention</span>
              </div>
            </div>
          </div>

          <div className="summary-section">
            <h4>Regional Compliance Analysis</h4>
            <p>Your farm's compliance rate of 94% is above the regional average. Nearby farms show varying compliance rates:</p>
            <ul>
              <li>Ambala: 98% compliance (Excellent)</li>
              <li>Panipat: 96% compliance (Very Good)</li>
              <li>Karnal: 92% compliance (Good)</li>
              <li>Faridabad: 91% compliance (Good)</li>
              <li>Rewari: 87% compliance (Needs Improvement)</li>
            </ul>
          </div>

          <div className="summary-section">
            <h4>Recommendations</h4>
            <div className="recommendations-list">
              <div className="recommendation-item">
                <span className="material-symbols-outlined">check_circle</span>
                <div>
                  <strong>Continue Current Practices:</strong> Your MRL compliance is above average. Maintain current antimicrobial usage protocols.
                </div>
              </div>
              <div className="recommendation-item">
                <span className="material-symbols-outlined">warning</span>
                <div>
                  <strong>Monitor 3 Animals:</strong> Schedule veterinary checkups for animals showing minor health concerns.
                </div>
              </div>
              <div className="recommendation-item">
                <span className="material-symbols-outlined">trending_up</span>
                <div>
                  <strong>Improvement Opportunity:</strong> Consider implementing preventive measures to reach 96%+ compliance rate.
                </div>
              </div>
            </div>
          </div>

          <div className="summary-section">
            <h4>Recent Activity</h4>
            <div className="activity-timeline">
              <div className="activity-item">
                <span className="activity-date">Today</span>
                <span className="activity-desc">Health checkup completed for 5 animals</span>
              </div>
              <div className="activity-item">
                <span className="activity-date">Yesterday</span>
                <span className="activity-desc">Antimicrobial dosage recorded for animal F-2024-018</span>
              </div>
              <div className="activity-item">
                <span className="activity-date">2 days ago</span>
                <span className="activity-desc">Veterinary consultation scheduled</span>
              </div>
            </div>
          </div>

          <div className="summary-section">
            <h4>Upcoming Tasks</h4>
            <div className="task-list">
              <div className="task-item pending">
                <span className="task-status"></span>
                <div>
                  <strong>Vaccination Schedule:</strong> 8 animals due for routine vaccination by next week
                </div>
              </div>
              <div className="task-item upcoming">
                <span className="task-status"></span>
                <div>
                  <strong>Health Assessment:</strong> Quarterly health review scheduled for next month
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}