import React from 'react';
import '../styles/MapSection.css';

export default function MapSection() {
  return (
    <div className="map-card">
      <div className="map-header">
        <h4><span className="material-symbols-outlined">map</span> Regional Overview - Haryana State</h4>
        <div className="map-controls">
          <button className="btn-primary" onclick="homeComponent.toggleMapView('compliance')">
            <span className="material-symbols-outlined">security</span> MRL View
          </button>
          <button className="btn-secondary" onclick="homeComponent.toggleMapView('usage')">
            <span className="material-symbols-outlined">medication</span> AMU View
          </button>
        </div>
      </div>
      <div id="regionMap" className="map-container">
        <div className="map-placeholder">
          <div className="region-marker high-compliance" style={{ top: "20%", left: "30%" }} data-region="Ambala">
            <span className="marker-dot"></span>
            <span className="region-label">Ambala<br />98% Compliance</span>
          </div>

          <div className="region-marker medium-compliance" style={{ top: "40%", left: "50%" }} data-region="Karnal">
            <span className="marker-dot"></span>
            <span className="region-label">Karnal<br />92% Compliance</span>
          </div>

          <div className="region-marker low-compliance" style={{ top: "65%", left: "25%" }} data-region="Rewari">
            <span className="marker-dot"></span>
            <span className="region-label">Rewari<br />87% Compliance</span>
          </div>

          <div className="region-marker high-compliance" style={{ top: "30%", left: "70%" }} data-region="Panipat">
            <span className="marker-dot"></span>
            <span className="region-label">Panipat<br />96% Compliance</span>
          </div>

          <div className="region-marker medium-compliance" style={{ top: "55%", left: "60%" }} data-region="Faridabad">
            <span className="marker-dot"></span>
            <span className="region-label">Faridabad<br />91% Compliance</span>
          </div>

          <div className="current-location" style={{ top: "45%", left: "40%" }}>
            <span className="material-symbols-outlined">my_location</span>
            <span className="location-label">Your Farm</span>
          </div>
        </div>
      </div>

      <div className="map-legend">
        <div className="legend-item">
          <span className="legend-dot high-compliance"></span>
          <span>High Compliance (95%+)</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot medium-compliance"></span>
          <span>Medium Compliance (90-94%)</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot low-compliance"></span>
          <span>Needs Attention (90%)</span>
        </div>
      </div>
    </div>
  );
}